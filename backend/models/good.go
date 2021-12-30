package models

import "gorm.io/gorm"

type Good struct {
	gorm.Model
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       int       `json:"price"`
	UserID      uint      `json:"userID"`
	IsSelled    bool      `json:"isSelled"`
	CustomerID  uint      `json:"customerID"`
	Comments    []Comment `json:"comments" gorm:"foreignKey:GoodID"`
}
