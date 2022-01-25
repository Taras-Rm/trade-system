package services

import (
	"errors"
	"net/mail"
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
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type TokensRequest struct {
	AccessToken  string `json:"accessToken" binding:"required"`
	RefreshToken string `json:"refreshToken" binding:"required"`
}

type LoginResponse struct {
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	Email        string `json:"email"`
	Age          string `json:"age"`
	Phone        string `json:"phone"`
	Amount       int    `json:"amount"`
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type UserService interface {
	CreateUser(user *UserRegister) (*models.User, error)
	IsValidCreateUserData(user *UserRegister) error
	LoginUser(userData *UserLogin) (*LoginResponse, error)
	LogoutUser(tokensReq *TokensRequest) error
}

type userService struct {
	userRepository  repositories.UserRepository
	tokenRepository repositories.TokenRepository
}

func NewUserService(userRepo repositories.UserRepository, tokenRepo repositories.TokenRepository) UserService {
	return &userService{userRepository: userRepo, tokenRepository: tokenRepo}
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
