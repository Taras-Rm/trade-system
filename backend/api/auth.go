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
	handler.POST("loginByToken", loginByToken(userService))
	handler.POST("refresh", refreshTokens(userService))
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
			return
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
		c.JSON(http.StatusOK, gin.H{"message": "success authorized", "data": &loginResp})
	}
}

func loginByToken(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var tokens *services.TokensRequest
		err := c.BindJSON(&tokens)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request",
				"error":   err.Error(),
			})
			return
		}

		res, err := userService.LoginByToken(tokens)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "server error", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "success authorized", "data": res})
	}
}

func refreshTokens(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req *services.RefreshRequest
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request",
				"error":   err.Error(),
			})
			return
		}
		res, err := userService.RefreshTokens(req)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "server error",
				"error":   err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Authenticated",
			"data":    res,
		})
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
