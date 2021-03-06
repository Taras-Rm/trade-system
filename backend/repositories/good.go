package repositories

import (
	"tradeApp/models"

	"gorm.io/gorm"
)

type GoodRepository interface {
	AddGood(good *models.Good) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	BuyGood(goodID uint, customerID uint) error
	GetGoodByID(goodID uint) (*models.Good, error)
	DeleteGoodByID(goodID uint) error
	UpdateGood(good *models.Good, goodID uint) error
	GetAllUserGoodsForSale(userID uint) ([]models.Good, error)
	GetAllUserBuyedGoods(userID uint) ([]models.Good, error)
	GetAllUserSoldGoods(userID uint) ([]models.Good, error)
}

type goodRepository struct {
	db *gorm.DB
}

func NewGoodRepository(db *gorm.DB) GoodRepository {
	return &goodRepository{db: db}
}

func (r *goodRepository) AddGood(good *models.Good) (*models.Good, error) {
	res := r.db.Create(&good)
	return good, res.Error
}

func (r *goodRepository) GetAllGoods() ([]models.Good, error) {
	var goods []models.Good
	res := r.db.Find(&goods)
	return goods, res.Error
}

func (r *goodRepository) BuyGood(goodID uint, customerID uint) error {
	var good *models.Good
	res := r.db.Model(&good).Where("id", goodID).Update("customer_id", customerID).Update("is_selled", true)
	return res.Error
}

func (r *goodRepository) GetGoodByID(goodID uint) (*models.Good, error) {
	var good models.Good
	err := r.db.First(&good, "id", goodID).Error
	if err != nil {
		return nil, err
	}

	return &good, nil
}

func (r *goodRepository) GetAllUserGoodsForSale(userID uint) ([]models.Good, error) {
	var goods []models.Good

	err := r.db.Where("user_id = ? AND is_selled = ?", userID, false).Find(&goods)
	if err.Error != nil {
		return nil, err.Error
	}

	return goods, nil
}

func (r *goodRepository) GetAllUserBuyedGoods(userID uint) ([]models.Good, error) {
	var goods []models.Good

	err := r.db.Where("customer_id = ? AND is_selled = ?", userID, true).Find(&goods)
	if err.Error != nil {
		return nil, err.Error
	}

	return goods, nil
}

func (r *goodRepository) GetAllUserSoldGoods(userID uint) ([]models.Good, error) {
	var goods []models.Good

	err := r.db.Where("user_id = ? AND is_selled = ?", userID, true).Find(&goods)
	if err.Error != nil {
		return nil, err.Error
	}

	return goods, nil
}

func (r *goodRepository) DeleteGoodByID(goodID uint) error {
	res := r.db.Where(goodID).Delete(&models.Good{})
	return res.Error
}

func (r *goodRepository) UpdateGood(good *models.Good, goodID uint) error {
	err := r.db.Model(&models.Good{}).Where("id = ?", goodID).Updates(&good).Error
	return err
}
