package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	GoodID     uint   `json:"goodID"`
	UserID     uint   `json:"userID"`
	CustomerID uint   `json:"customerID"`
	ToCountry  string `json:"toCountry"`
	ToCity     string `json:"toCity"`
	ToStreet   string `json:"toStreet"`
	ToPhone    string `json:"toPhone"`
}
