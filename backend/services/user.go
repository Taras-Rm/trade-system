package services

import (
	"errors"
	"net/mail"
	"strconv"
	"tradeApp/config"
	"tradeApp/models"
	"tradeApp/repositories"

	"golang.org/x/crypto/bcrypt"
)

type UserRegister struct {
	FirstName string `json:"firstName" binding:"required"`
	LastName  string `json:"lastName" binding:"required"`
	Email     string `json:"email" binding:"required"`
	Age       string `json:"age" binding:"required"`
	Phone     string `json:"phone" binding:"required"`
	Password  string `json:"password" binding:"required"`
}

type UserLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type TokensRequest struct {
	AccessToken  string `json:"accessToken" binding:"required"`
	RefreshToken string `json:"refreshToken" binding:"required"`
}

type RefreshRequest struct {
	RefreshToken string `json:"RefreshToken" binding:"required"`
}

type AmountRequest struct {
	Amount string `json:"amount" binding:"required"`
}

type LoginResponse struct {
	FirstName    string  `json:"firstName"`
	LastName     string  `json:"lastName"`
	Email        string  `json:"email"`
	Age          string  `json:"age"`
	Phone        string  `json:"phone"`
	Amount       float64 `json:"amount"`
	AccessToken  string  `json:"accessToken"`
	RefreshToken string  `json:"refreshToken"`
}

type UserResponse struct {
	ID           uint    `json:"id"`
	FirstName    string  `json:"firstName"`
	LastName     string  `json:"lastName"`
	Email        string  `json:"email"`
	Age          string  `json:"age"`
	Phone        string  `json:"phone"`
	Amount       float64 `json:"amount"`
	CountForSale int     `json:"countForSale"`
	CountOfBuyed int     `json:"countOfBuyed"`
	PriceForSale int     `json:"priceForSale"`
	PriceOfBuyed int     `json:"priceOfBuyed"`
}

type UserUpdateRequest struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Age       string `json:"age"`
	Phone     string `json:"phone"`
}

type UserService interface {
	CreateUser(user *UserRegister) (*models.User, error)
	IsValidCreateUserData(user *UserRegister) error
	LoginUser(userData *UserLogin) (*LoginResponse, error)
	LoginByToken(req *TokensRequest) (*LoginResponse, error)
	LogoutUser(tokensReq *TokensRequest) error
	GetUserProfile(userID uint) (*UserResponse, error)
	UpdateUserProfile(user *UserUpdateRequest, userID uint) error
	TopUpAmount(req *AmountRequest, userID uint) error
	RefreshTokens(tokens *RefreshRequest) (*TokensRequest, error)
}

type userService struct {
	userRepository  repositories.UserRepository
	tokenRepository repositories.TokenRepository
	goodRepository  repositories.GoodRepository
}

func NewUserService(userRepo repositories.UserRepository, tokenRepo repositories.TokenRepository, goodRepo repositories.GoodRepository) UserService {
	return &userService{userRepository: userRepo, tokenRepository: tokenRepo, goodRepository: goodRepo}
}

func (s *userService) RefreshTokens(tokens *RefreshRequest) (*TokensRequest, error) {
	RefreshToken := tokens.RefreshToken
	refreshSecret := config.GetSecretRefresh()
	if err := TokenValidation(RefreshToken, refreshSecret); err != nil {
		return nil, err
	}
	refreshUuid, err := GetUuidFromToken(RefreshToken, refreshSecret)
	if err != nil {
		return nil, err
	}
	deleted, err := s.tokenRepository.DeleteTokenInfo(refreshUuid)
	if err != nil || deleted == 0 {
		return nil, errors.New("your token is invalid. You have to login by email and password")
	}

	userId, err := GetUserIdFromToken(RefreshToken, refreshSecret)
	if err != nil {
		return nil, err
	}

	token, err := CreateToken(userId)
	if err != nil {
		return nil, errors.New("server error creating token")
	}
	err = s.tokenRepository.SaveTokenInfo(userId, token.AccessTExpires, token.RefreshTExpires, token.AccessTokenUuid, token.RefreshTokenUuid)
	if err != nil {
		return nil, errors.New("can't save to Redis")
	}
	res := &TokensRequest{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
	}
	return res, nil
}

func (s *userService) CreateUser(user *UserRegister) (*models.User, error) {
	// check user email
	_, err := s.userRepository.FindUserByEmail(user.Email)
	if err == nil {
		return nil, errors.New("user with that email elready exist")
	}
	// check user phone number
	_, err = s.userRepository.FindUserByPhone(user.Phone)
	if err == nil {
		return nil, errors.New("user with that phone elready exist")
	}
	// create hashed password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	// new created user
	newUser, err := s.userRepository.CreateUser(&models.User{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Age:       user.Age,
		Phone:     user.Phone,
		Amount:    0,
		Password:  string(hashedPassword),
	})

	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (s *userService) IsValidCreateUserData(user *UserRegister) error {
	// check user email
	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return errors.New("invalid email")
	}
	// check first name length
	if (len(user.FirstName) < 4) || (len(user.LastName) < 4) {
		return errors.New(`invalid name`)
	}
	// check last name length
	if (len(user.Password) < 4) || (len(user.Password) > 16) {
		return errors.New(`invalid password`)
	}

	return nil
}

func (s *userService) LoginUser(userData *UserLogin) (*LoginResponse, error) {
	// find user with that email
	user, err := s.userRepository.FindUserByEmail(userData.Email)
	if err != nil {
		return nil, errors.New("can`t find with that email and password")
	}
	// compare password in DB and request password
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userData.Password))
	if err != nil {
		return nil, errors.New("can`t find with that email and password")
	}

	tokenInfo, err := CreateToken(user.ID)
	if err != nil {
		return nil, err
	}

	//save tokens information in redis
	err = s.tokenRepository.SaveTokenInfo(user.ID, tokenInfo.AccessTExpires, tokenInfo.RefreshTExpires, tokenInfo.AccessTokenUuid, tokenInfo.RefreshTokenUuid)
	if err != nil {
		return nil, err
	}

	res := &LoginResponse{
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Email:        user.Email,
		Age:          user.Age,
		Phone:        user.Phone,
		Amount:       user.Amount,
		AccessToken:  tokenInfo.AccessToken,
		RefreshToken: tokenInfo.RefreshToken,
	}

	return res, nil
}

func (s *userService) LoginByToken(req *TokensRequest) (*LoginResponse, error) {
	accessToken := req.AccessToken
	refreshToken := req.RefreshToken

	accessSecret := config.GetSecretAccess()
	refreshSecret := config.GetSecretRefresh()

	if TokenValidation(accessToken, accessSecret) == nil {
		userID, err := GetUserIdFromToken(accessToken, accessSecret)
		if err != nil {
			return nil, err
		}

		user, err := s.userRepository.GetUserByID(userID)
		if err != nil {
			return nil, err
		}

		resp := &LoginResponse{
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Age:       user.Age,
			Email:     user.Email,
			Phone:     user.Phone,
			Amount:    user.Amount,
		}

		return resp, nil
	}

	if TokenValidation(refreshToken, refreshSecret) == nil {
		uuid, err := GetUuidFromToken(refreshToken, refreshSecret)
		if err != nil {
			return nil, err
		}

		_, err = s.tokenRepository.DeleteTokenInfo(uuid)
		if err != nil {
			return nil, errors.New("invalid token. Login with email and password")
		}

		userID, err := GetUserIdFromToken(refreshToken, refreshSecret)
		if err != nil {
			return nil, err
		}

		user, err := s.userRepository.GetUserByID(userID)
		if err != nil {
			return nil, errors.New("user not found")
		}

		tokens, err := CreateToken(userID)
		if err != nil {
			return nil, err
		}

		err = s.tokenRepository.SaveTokenInfo(userID, tokens.AccessTExpires, tokens.RefreshTExpires, tokens.AccessTokenUuid, tokens.RefreshTokenUuid)
		if err != nil {
			return nil, err
		}

		res := &LoginResponse{
			FirstName:    user.FirstName,
			LastName:     user.LastName,
			Age:          user.Age,
			Email:        user.Email,
			Phone:        user.Phone,
			Amount:       user.Amount,
			AccessToken:  tokens.AccessToken,
			RefreshToken: tokens.RefreshToken,
		}

		return res, nil
	}

	return nil, errors.New("tokens are expired or invalid")
}

func (s *userService) LogoutUser(tokensReq *TokensRequest) error {
	accessSecret := config.GetSecretAccess()

	refreshSecret := config.GetSecretRefresh()

	accessUuid, err := GetUuidFromToken(tokensReq.AccessToken, accessSecret)
	if err != nil {
		return err
	}

	refreshUuid, err := GetUuidFromToken(tokensReq.RefreshToken, refreshSecret)
	if err != nil {
		return err
	}

	_, err = s.tokenRepository.DeleteTokenInfo(accessUuid)
	if err != nil {
		return errors.New("can`t logout user")
	}

	_, err = s.tokenRepository.DeleteTokenInfo(refreshUuid)
	if err != nil {
		return errors.New("can`t logout user")
	}

	return nil
}

func (s *userService) GetUserProfile(userID uint) (*UserResponse, error) {
	user, err := s.userRepository.GetUserByID(userID)
	if err != nil {
		return nil, err
	}

	var countForSale, countOfBuyed, priceForSale, priceOfBuyed int

	goodsForSale, err := s.goodRepository.GetAllUserGoodsForSale(userID)
	if err != nil {
		return nil, err
	}
	countForSale = len(goodsForSale)
	for _, val := range goodsForSale {
		priceForSale += int(val.Price)
	}

	goodsBuyed, err := s.goodRepository.GetAllUserBuyedGoods(userID)
	if err != nil {
		return nil, err
	}
	countOfBuyed = len(goodsBuyed)
	for _, val := range goodsBuyed {
		priceOfBuyed += int(val.Price)
	}

	userResp := &UserResponse{
		ID:           user.ID,
		FirstName:    user.FirstName,
		LastName:     user.LastName,
		Email:        user.Email,
		Age:          user.Age,
		Phone:        user.Phone,
		Amount:       user.Amount,
		CountForSale: countForSale,
		PriceForSale: priceForSale,
		CountOfBuyed: countOfBuyed,
		PriceOfBuyed: priceOfBuyed,
	}

	return userResp, nil
}

func (s *userService) UpdateUserProfile(user *UserUpdateRequest, userID uint) error {

	userForUpdate := &models.User{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Age:       user.Age,
		Phone:     user.Phone,
	}

	err := s.userRepository.UpdateUserProfile(userForUpdate, userID)
	if err != nil {
		return err
	}

	return nil
}

func (s *userService) TopUpAmount(req *AmountRequest, userID uint) error {
	uintAmount, err := strconv.ParseFloat(req.Amount, 64)
	if err != nil {
		return err
	}

	user, err := s.userRepository.GetUserByID(userID)
	if err != nil {
		return err
	}

	newAmount := user.Amount + uintAmount

	err = s.userRepository.UpdateAmount(uint(newAmount), userID)
	if err != nil {
		return err
	}

	return nil
}
