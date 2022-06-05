package repositories

import (
	"tradeApp/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order *models.Order) (*models.Order, error)
	GetBuyedByUserID(userID uint) ([]models.Order, error)
	GetSoldByUserID(userID uint) ([]models.Order, error)
}

type orderRepository struct {
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{db: db}
}

func (r *orderRepository) CreateOrder(order *models.Order) (*models.Order, error) {
	res := r.db.Create(&order)
	return order, res.Error
}

func (r *orderRepository) GetBuyedByUserID(userID uint) ([]models.Order, error) {
	var orders []models.Order

	err := r.db.Where("customer_id = ?", userID, false).Preload("Good").Find(&orders)
	if err.Error != nil {
		return nil, err.Error
	}

	return orders, nil
}

func (r *orderRepository) GetSoldByUserID(userID uint) ([]models.Order, error) {
	var orders []models.Order

	err := r.db.Where("user_id = ?", userID, false).Preload("Good").Find(&orders)
	if err.Error != nil {
		return nil, err.Error
	}

	return orders, nil
}
