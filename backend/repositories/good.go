package repositories

import (
	"tradeApp/models"

	"gorm.io/gorm"
)

type GoodRepository interface {
	AddGood(good *models.Good) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	GetAllUserGoods(id uint) ([]models.Good, error)
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
	res := r.db.Preload("Comments").Find(&goods)
	return goods, res.Error
}

func (r *goodRepository) GetAllUserGoods(id uint) ([]models.Good, error) {
	var goods []models.Good
	res := r.db.Where("user_id = ?", id).Preload("Comments").Find(&goods)
	return goods, res.Error
}
