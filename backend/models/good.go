package models

import "gorm.io/gorm"

type Good struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	UserID      uint    `json:"userID"`
	IsSelled    bool    `json:"isSelled"`
	CustomerID  uint    `json:"customerID"`
	Category    string  `json:"category"`
	Image       string  `json:"image"`
}
