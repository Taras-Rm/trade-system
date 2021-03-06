package api

import (
	"fmt"
	"net/http"
	"strconv"
	"tradeApp/middleware"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
)

func InjectUser(gr *gin.RouterGroup, userService services.UserService) {
	handler := gr.Group("user")

	handler.Use(middleware.AuthMiddleware)

	handler.GET("/profile", getProfile(userService))
	handler.GET("/profile/:id", getUserData(userService))

	handler.PUT("/profile", updateProfile(userService))
	handler.PUT("/amount", topUpAmount(userService))
}

func getProfile(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		res, err := userService.GetUserProfile(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"profile": res,
		})
	}
}

func getUserData(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("id")
		uintUserID, err := strconv.ParseUint(userID, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		res, err := userService.GetUserProfile(uint(uintUserID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"user": res,
		})
	}
}

func updateProfile(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}
		var user services.UserUpdateRequest
		err = c.BindJSON(&user)
		fmt.Println(user)
		fmt.Println(err)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		err = userService.UpdateUserProfile(&user, userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "user profile is updated",
		})
	}
}

func topUpAmount(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req services.AmountRequest
		err := c.BindJSON(&req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = userService.TopUpAmount(&req, userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"massage": "amount is updated",
		})
	}
}
