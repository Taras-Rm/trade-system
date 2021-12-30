package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	CommentorFirstName string `json:"commentorFirstName"`
	CommentorLastName  string `json:"commentorLastName"`
	Content            string `json:"content"`
	GoodID             uint   `json:"goodID"`
}
