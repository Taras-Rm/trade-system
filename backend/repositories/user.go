package repositories

import (
	"tradeApp/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	CreateUser(user *models.User) (*models.User, error)
	FindUserByEmail(email string) (*models.User, error)
	FindUserByPhone(phone string) (*models.User, error)
	GetUserByID(userID uint) (*models.User, error)
	BuyGood(goodID, customerID uint, userNewAmount, customerNewAmount float64) error
	UpdateUserProfile(user *models.User, userID uint) error
	UpdateAmount(amount uint, userID uint) error
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

func (r *userRepository) GetUserByID(userID uint) (*models.User, error) {
	var user models.User
	err := r.db.First(&user, "id=?", userID).Error
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *userRepository) BuyGood(userID, customerID uint, userNewAmount, customerNewAmount float64) error {
	var owner, customer *models.User

	tx := r.db.Begin()

	err := tx.Model(&customer).Where("id", customerID).Update("amount", customerNewAmount)
	if err.Error != nil {
		tx.Rollback()
		return err.Error
	}

	err = tx.Model(&owner).Where("id", userID).Update("amount", userNewAmount)
	if err.Error != nil {
		tx.Rollback()
		return err.Error
	}

	return tx.Commit().Error
}

func (r *userRepository) UpdateUserProfile(user *models.User, userID uint) error {
	err := r.db.Model(&models.User{}).Where("id = ?", userID).Updates(&user)
	return err.Error
}

func (r *userRepository) UpdateAmount(amount uint, userID uint) error {
	err := r.db.Model(&models.User{}).Where("id = ?", userID).Update("amount", amount)
	return err.Error
}
