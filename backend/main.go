package main

import (
	"tradeApp/api"
	"tradeApp/repositories"
	"tradeApp/services"
	"tradeApp/setup"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	// Connection to DB
	db, err := setup.ConnectDB()
	if err != nil {
		panic(err)
	}

	//redisClient, err := setup.RedisInit()
	//if err != nil {
	//	panic(err)
	//}

	// Server handler
	handler := setup.StartServer()

	gr := handler.Group("api")
	// Token
	//tokenRepository := repositories.NewTokenRepository(redisClient)
	// Goods
	goodRepository := repositories.NewGoodRepository(db)
	goodService := services.NewGoodService(goodRepository)
	api.InjectGood(gr, goodService)
	// User
	userRepository := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepository)
	api.InjectAuth(gr, userService)

	handler.Run()
}
