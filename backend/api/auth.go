package api

import (
	"net/http"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
)

func InjectAuth(gr *gin.RouterGroup, userService services.UserService) {
	handler := gr.Group("auth")

	handler.POST("register", register(userService))
	handler.POST("login", login(userService))
	handler.POST("logout", logout(userService))
}

func register(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *services.UserRegister

		err := c.BindJSON(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "bad request", "error": err.Error()})
			return
		}

		err = userService.IsValidCreateUserData(request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "invalid request", "error": err.Error()})
		}

		user, err := userService.CreateUser(request)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "bad request", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "user is created", "user": &user})

	}
}

func login(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *services.UserLogin
		err := c.BindJSON(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "bad request", "error": err.Error()})
			return
		}

		loginResp, err := userService.LoginUser(request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "server error", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "success autorized", "data": &loginResp})
	}
}

func logout(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request *services.TokensRequest
		err := c.BindJSON(&request)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request",
				"error":   err.Error(),
			})
			return
		}

		err = userService.LogoutUser(request)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error",
				"error":   err.Error(),
			})
		}

		c.JSON(http.StatusOK, gin.H{"message": "success logout"})

	}
}
