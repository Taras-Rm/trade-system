package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	GoodID     uint    `json:"goodID"`
	Good       Good    `gorm:"foreignKey:GoodID"`
	UserID     uint    `json:"userID"`
	CustomerID uint    `json:"customerID"`
	Price      float64 `json:"price"`
	Address    Address `gorm:"foreignKey:OrderID"`
}

type Address struct {
	gorm.Model
	OrderID   uint
	ToCountry string `json:"toCountry"`
	ToCity    string `json:"toCity"`
	ToStreet  string `json:"toStreet"`
	ToPhone   string `json:"toPhone"`
}
