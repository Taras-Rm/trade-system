package services

import (
	"tradeApp/repositories"
)

type MonthData struct {
	Month          string
	AmountOfBuyed  float64
	AmountOfSelled float64
}

type MonthDataAmount []MonthData

type ChartService interface {
	GetMonthlyIncomesExpenses(userID uint) ([]MonthData, error)
}

type chartService struct {
	goodRepository  repositories.GoodRepository
	orderRepository repositories.OrderRepository
}

func NewChartService(goodRepo repositories.GoodRepository, orderRepo repositories.OrderRepository) ChartService {
	return &chartService{goodRepository: goodRepo, orderRepository: orderRepo}
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

	// get all monthes 2
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
