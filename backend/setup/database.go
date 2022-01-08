package setup

import (
	"fmt"
	"os"
	"tradeApp/models"

	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB() (*gorm.DB, error) {
	var DB *gorm.DB 
	dbHost, isHost := os.LookupEnv("DB_HOST")
	dbUser, isUser := os.LookupEnv("DB_USER")
	dbPass, isPass := os.LookupEnv("DB_PASS")
	dbName, isName := os.LookupEnv("DB_NAME")

	if !isHost || !isName || !isPass || !isUser {
		logrus.Error("Can`t read .env file !")
	}

	DbURL := fmt.Sprintf("host=%s user=%s password=%s dbname=%s   sslmode=disable", dbHost, dbUser, dbPass, dbName)

	fmt.Println(DbURL)
	DB, err := gorm.Open(postgres.Open(DbURL), &gorm.Config{})

	if err != nil {
		fmt.Println("Status:", err.Error())
		return nil, err
	}

	err = DB.AutoMigrate(&models.User{}, &models.Good{}, &models.Comment{})

	if err != nil {
		fmt.Println("Status:", err.Error())
		return nil, err
	}

	return DB, nil
}
