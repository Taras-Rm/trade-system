package services

import (
	"strconv"
	"tradeApp/models"
	"tradeApp/repositories"
)

type GoodRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	Price       string `json:"price" binding:"required"`
	Category    string `json:"category" binding:"required"`
}

type GoodService interface {
	AddGood(good *GoodRequest) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	GetAllUserGoods(userId uint) ([]models.Good, error)
}

type goodService struct {
	goodRepository repositories.GoodRepository
}

func NewGoodService(goodRepo repositories.GoodRepository) GoodService {
	return &goodService{goodRepository: goodRepo}
}

func (s *goodService) AddGood(good *GoodRequest) (*models.Good, error) {
	// converting price
	price, err := strconv.Atoi(good.Price)
	if err != nil {
		return nil, err
	}

	newGood := models.Good{
		Name:        good.Name,
		Description: good.Description,
		Price:       price,
		Category:    good.Category,
		UserID:      2, // get current user ID !!!!!!!!!!!!!!!!!!!!!!
	}

	res, err := s.goodRepository.AddGood(&newGood)
	if err != nil {
		return nil, err
	}

	return res, err
}

func (s *goodService) GetAllGoods() ([]models.Good, error) {
	res, err := s.goodRepository.GetAllGoods()
	if err != nil {
		return nil, err
	}

	return res, err
}

func (s *goodService) GetAllUserGoods(userId uint) ([]models.Good, error) {

	res, err := s.goodRepository.GetAllUserGoods(userId)
	if err != nil {
		return nil, err
	}

	return res, err
}
