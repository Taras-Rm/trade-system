package services

import (
	"tradeApp/repositories"
)

type MonthData struct {
	Month          string
	AmountOfBuyed  float64
	AmountOfSelled float64
}

type CategoryData struct {
	Category      string
	CountOfBuyed  int64
	CountOfSelled int64
}

type MonthDataAmount []MonthData

type ChartService interface {
	GetMonthlyIncomesExpenses(userID uint) ([]MonthData, error)
	GetGoodsCategories(userID uint) ([]CategoryData, error)
}

type chartService struct {
	orderRepository repositories.OrderRepository
}

func NewChartService(orderRepo repositories.OrderRepository) ChartService {
	return &chartService{orderRepository: orderRepo}
}

func (s *chartService) GetMonthlyIncomesExpenses(userID uint) ([]MonthData, error) {
	buyedData, err := s.orderRepository.GetBuyedByUserID(userID)
	if err != nil {
		return nil, err
	}

	soldData, err := s.orderRepository.GetSoldByUserID(userID)
	if err != nil {
		return nil, err
	}
	var monthDataArr []MonthData
	var dataItem MonthData

	// get all monthes
	for _, d := range buyedData {
		month := d.CreatedAt.Month().String()
		if isMonthInSlice(month, monthDataArr) {
			continue
		}

		dataItem = MonthData{
			Month: month,
		}
		monthDataArr = append(monthDataArr, dataItem)
	}

	// get all monthes
	for _, d := range soldData {
		month := d.CreatedAt.Month().String()
		if isMonthInSlice(month, monthDataArr) {
			continue
		}

		dataItem = MonthData{
			Month: month,
		}
		monthDataArr = append(monthDataArr, dataItem)
	}

	for _, d := range buyedData {
		month := d.CreatedAt.Month().String()
		for i, md := range monthDataArr {
			if md.Month == month {
				monthDataArr[i].AmountOfBuyed = monthDataArr[i].AmountOfBuyed + d.Price
			}
		}
	}

	for _, d := range soldData {
		month := d.CreatedAt.Month().String()
		for i, md := range monthDataArr {
			if md.Month == month {
				monthDataArr[i].AmountOfSelled = monthDataArr[i].AmountOfSelled + d.Price
			}
		}
	}

	return monthDataArr, err
}

func isMonthInSlice(month string, slice []MonthData) bool {
	for _, md := range slice {
		if md.Month == month {
			return true
		}
	}

	return false
}

func (s *chartService) GetGoodsCategories(userID uint) ([]CategoryData, error) {
	buyedData, err := s.orderRepository.GetBuyedByUserID(userID)
	if err != nil {
		return nil, err
	}

	soldData, err := s.orderRepository.GetSoldByUserID(userID)
	if err != nil {
		return nil, err
	}

	var categoryDataArr []CategoryData
	var categoryItem CategoryData

	// get all categories
	for _, d := range buyedData {
		category := d.Good.Category
		if isCategoryInSlice(category, categoryDataArr) {
			continue
		}

		categoryItem = CategoryData{
			Category: category,
		}
		categoryDataArr = append(categoryDataArr, categoryItem)
	}

	// get all categories
	for _, d := range soldData {
		category := d.Good.Category
		if isCategoryInSlice(category, categoryDataArr) {
			continue
		}

		categoryItem = CategoryData{
			Category: category,
		}
		categoryDataArr = append(categoryDataArr, categoryItem)
	}

	for _, d := range buyedData {
		category := d.Good.Category
		for i, md := range categoryDataArr {
			if md.Category == category {
				categoryDataArr[i].CountOfBuyed = categoryDataArr[i].CountOfBuyed + 1
			}
		}
	}

	for _, d := range soldData {
		category := d.Good.Category
		for i, md := range categoryDataArr {
			if md.Category == category {
				categoryDataArr[i].CountOfSelled = categoryDataArr[i].CountOfSelled + 1
			}
		}
	}

	return categoryDataArr, err
}

func isCategoryInSlice(category string, slice []CategoryData) bool {
	for _, md := range slice {
		if md.Category == category {
			return true
		}
	}

	return false
}
