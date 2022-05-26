package main

import (
	"tradeApp/api"
	"tradeApp/config"
	"tradeApp/middleware"
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

	redisClient, err := setup.RedisInit()
	if err != nil {
		panic(err)
	}

	// Server handler
	handler := setup.StartServer()
	gr := handler.Group("api")

	// Initialize logger
	config.InitLogger()

	// Token
	tokenRepository := repositories.NewTokenRepository(redisClient)
	goodRepository := repositories.NewGoodRepository(db)
	userRepository := repositories.NewUserRepository(db)
	orderRepository := repositories.NewOrderRepository(db)

	middleware.InitAuthMiddleware(tokenRepository)

	goodService := services.NewGoodService(goodRepository, userRepository, orderRepository)
	userService := services.NewUserService(userRepository, tokenRepository, goodRepository)

	api.InjectGood(gr, goodService)
	api.InjectAuth(gr, userService)
	api.InjectUser(gr, userService)

	handler.Run()
}
