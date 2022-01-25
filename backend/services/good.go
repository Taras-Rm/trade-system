package services

import (
	"errors"
	"tradeApp/models"
	"tradeApp/repositories"
)

type GoodRequest struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Category    string  `json:"category" binding:"required"`
}

type GoodService interface {
	AddGood(good *GoodRequest, userID uint) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	GetAllUserGoods(userId uint) ([]models.Good, error)
	BuyGood(goodID, customerID uint) error
	DeleteGood(goodID uint) error
	UpdateGood(good *GoodRequest, goodID uint) error
}

type goodService struct {
	goodRepository repositories.GoodRepository
	userRepository repositories.UserRepository
}

func NewGoodService(goodRepo repositories.GoodRepository, userRepo repositories.UserRepository) GoodService {
	return &goodService{goodRepository: goodRepo, userRepository: userRepo}
}

func (s *goodService) AddGood(good *GoodRequest, userID uint) (*models.Good, error) {

	newGood := models.Good{
		Name:        good.Name,
		Description: good.Description,
		Price:       good.Price,
		Category:    good.Category,
		UserID:      userID,
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

func (s *goodService) BuyGood(goodID, customerID uint) error {
	// check is it own good
	gd, _ := s.goodRepository.GetGoodByID(goodID)
	if gd != nil {
		return errors.New("it`s your good")
	}
	// get customer
	customer, err := s.userRepository.GetUserByID(customerID)
	if err != nil {
		return err
	}
	// get good
	good, err := s.goodRepository.GetGoodByID(goodID)
	if err != nil {
		return err
	}
	// check is salled or not
	if good.IsSelled {
		return errors.New("this good was already buyed")
	}
	// get owner
	owner, err := s.userRepository.GetUserByID(good.UserID)
	if err != nil {
		return err
	}

	newCustomerAmount := customer.Amount - good.Price

	if newCustomerAmount < 0 {
		return errors.New("not enough money")
	}

	newOwnerAmount := owner.Amount + good.Price

	err = s.goodRepository.BuyGood(goodID, customerID)
	if err != nil {
		return err
	}

	err = s.userRepository.BuyGood(owner.ID, customerID, newOwnerAmount, newCustomerAmount)
	if err != nil {
		return err
	}

	return nil
}

func (s *goodService) DeleteGood(goodID uint) error {
	err := s.goodRepository.DeleteGoodByID(goodID)
	if err != nil {
		return err
	}

	return nil
}

func (s *goodService) UpdateGood(good *GoodRequest, goodID uint) error {

	updatedGood := &models.Good{
		Name:        good.Name,
		Description: good.Description,
		Price:       good.Price,
		Category:    good.Category,
	}
	err := s.goodRepository.UpdateGood(updatedGood, goodID)
	if err != nil {
		return err
	}

	return nil
}
