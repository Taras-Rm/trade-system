package services

import (
	"errors"
	"strconv"
	"tradeApp/models"
	"tradeApp/repositories"
)

type GoodRequest struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Category    string  `json:"category"`
	Image       string  `json:"image"`
}

type OrderRequest struct {
	GoodID    string `json:"goodID"`
	ToCountry string `json:"toCountry"`
	ToCity    string `json:"toCity"`
	ToStreet  string `json:"toStreet"`
	ToPhone   string `json:"toPhoneNumber"`
}

type GoodService interface {
	AddGood(good *GoodRequest, userID uint) (*models.Good, error)
	GetAllGoods() ([]models.Good, error)
	GetGood(goodID uint) (*models.Good, error)

	BuyGood(goodID, customerID uint, orderRequest *OrderRequest) error
	DeleteGood(goodID uint) error
	UpdateGood(good *GoodRequest, goodID uint, userID uint) error
	GetAllUserGoodsForSale(userId uint) ([]models.Good, error)
	GetAllUserBuyedGoods(userId uint) ([]models.Good, error)
	GetAllUserSoldGoods(userId uint) ([]models.Good, error)
}

type goodService struct {
	goodRepository  repositories.GoodRepository
	userRepository  repositories.UserRepository
	orderRepository repositories.OrderRepository
}

func NewGoodService(goodRepo repositories.GoodRepository, userRepo repositories.UserRepository, orderRepo repositories.OrderRepository) GoodService {
	return &goodService{goodRepository: goodRepo, userRepository: userRepo, orderRepository: orderRepo}
}

func (s *goodService) AddGood(good *GoodRequest, userID uint) (*models.Good, error) {
	category := good.Category
	if good.Category == "" {
		category = "Without category"
	}

	newGood := models.Good{
		Name:        good.Name,
		Description: good.Description,
		Price:       good.Price,
		Category:    category,
		UserID:      userID,
		Image:       good.Image,
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

func (s *goodService) GetGood(goodID uint) (*models.Good, error) {
	res, err := s.goodRepository.GetGoodByID(goodID)
	if err != nil {
		return nil, err
	}

	return res, err
}

func (s *goodService) BuyGood(goodID, customerID uint, orderRequest *OrderRequest) error {
	// check is it own good
	gd, _ := s.goodRepository.GetGoodByID(goodID)
	if gd.UserID == customerID {
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

	goodRequestID, _ := strconv.Atoi(orderRequest.GoodID)

	newOrder := models.Order{
		GoodID:     uint(goodRequestID),
		UserID:     good.UserID,
		CustomerID: customerID,
		Price:      good.Price,
		Address: models.Address{
			ToCountry: orderRequest.ToCountry,
			ToCity:    orderRequest.ToCity,
			ToStreet:  orderRequest.ToStreet,
			ToPhone:   orderRequest.ToPhone,
		},
	}

	_, err = s.orderRepository.CreateOrder(&newOrder)
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

func (s *goodService) UpdateGood(good *GoodRequest, goodID uint, userID uint) error {
	goodBeforeUpdate, err := s.goodRepository.GetGoodByID(goodID)
	if err != nil {
		return err
	}
	if goodBeforeUpdate.UserID != userID {
		return errors.New("it`s not your good")
	}

	updatedGood := &models.Good{
		Name:        good.Name,
		Description: good.Description,
		Price:       good.Price,
		Category:    good.Category,
	}
	err = s.goodRepository.UpdateGood(updatedGood, goodID)
	if err != nil {
		return err
	}

	return nil
}

func (s *goodService) GetAllUserGoodsForSale(userId uint) ([]models.Good, error) {

	res, err := s.goodRepository.GetAllUserGoodsForSale(userId)
	if err != nil {
		return nil, err
	}

	return res, err
}

func (s *goodService) GetAllUserBuyedGoods(userId uint) ([]models.Good, error) {

	res, err := s.goodRepository.GetAllUserBuyedGoods(userId)
	if err != nil {
		return nil, err
	}

	return res, err
}

func (s *goodService) GetAllUserSoldGoods(userId uint) ([]models.Good, error) {

	res, err := s.goodRepository.GetAllUserSoldGoods(userId)
	if err != nil {
		return nil, err
	}

	return res, err
}
