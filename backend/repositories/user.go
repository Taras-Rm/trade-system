package repositories

import (
	"tradeApp/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user *models.User) (*models.User, error)
	FindUserByEmail(email string) (*models.User, error)
	FindUserByPhone(phone string) (*models.User, error)
	GetUserByID(userID string) (*models.User, error)
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) CreateUser(user *models.User) (*models.User, error) {
	err := r.db.Create(user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, "email=?", email).Error
	if err != nil {
		return nil, err
	}

	return &user, err
}

func (r *userRepository) FindUserByPhone(phone string) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, "phone=?", phone).Error
	if err != nil {
		return nil, err
	}

	return &user, err
}

func (r *userRepository) GetUserByID(userID string) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, "id=?", userID).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}
