package services

import (
	"errors"
	"net/mail"
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

type UserService interface {
	CreateUser(user *UserRegister) (*models.User, error)
	IsValidCreateUserData(user *UserRegister) error
}

type userService struct {
	userRepository repositories.UserRepository
}

func NewUserService(userRepo repositories.UserRepository) UserService {
	return &userService{userRepository: userRepo}
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
	_, err := mail.ParseAddress(user.Email)
	if err != nil {
		return errors.New("invalid email")
	}

	if (len(user.FirstName) < 4) || (len(user.LastName) < 4) {
		return errors.New(`invalid name`)
	}

	if (len(user.Password) < 4) || (len(user.Password) > 16) {
		return errors.New(`invalid password`)
	}

	return nil
}
