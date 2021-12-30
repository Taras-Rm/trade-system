package services

import (
	"tradeApp/models"
	"tradeApp/repositories"
)

type GoodService interface {
	AddGood(good *models.Good) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	GetUserGoods(userId uint) ([]models.Good, error)
}

type goodService struct {
	goodRepository repositories.GoodRepository
}

func NewGoodService(goodRepo repositories.GoodRepository) GoodService {
	return &goodService{goodRepository: goodRepo}
}

func (s *goodService) AddGood(good *models.Good) (*models.Good, error) {
	res, err := s.goodRepository.AddGood(good)
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

func (s *goodService) GetUserGoods(userId uint) ([]models.Good, error) {

	res, err := s.goodRepository.GetUserGoods(userId)
	if err != nil {
		return nil, err
	}

	return res, err
}
