package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email"`
	Age       string  `json:"age"`
	Phone     string  `json:"phone"`
	Password  string  `json:"-"`
	Amount    float64 `json:"amount"`
	Goods     []Good  `json:"goods" gorm:"foreignKey:UserID"`
	Orders    []Order `gorm:"foreignKey:UserID"`
}
