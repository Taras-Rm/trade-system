package setup

import (
	"fmt"
	"tradeApp/config"
	"tradeApp/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() (*gorm.DB, error) {
	var DB *gorm.DB
	dbHost := config.GetDBHost()
	dbUser := config.GetDBUser()
	dbPass := config.GetDBPass()
	dbName := config.GetDBName()

	DbURL := fmt.Sprintf("host=%s user=%s password=%s dbname=%s   sslmode=disable", dbHost, dbUser, dbPass, dbName)

	DB, err := gorm.Open(postgres.Open(DbURL), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	err = DB.AutoMigrate(&models.User{}, &models.Good{}, &models.Comment{}, &models.Order{})

	if err != nil {
		return nil, err
	}

	return DB, nil
}
