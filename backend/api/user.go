package api

import (
	"net/http"
	"tradeApp/middleware"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func InjectUser(gr *gin.RouterGroup, userService services.UserService) {
	handler := gr.Group("user")

	handler.Use(middleware.AuthMiddleware)

	handler.GET("/profile", getProfile(userService))
	handler.PUT("/profile", updateProfile(userService))
	handler.PUT("/amount", updateAmount(userService))
}

func getProfile(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			zap.S().Error("Get profile server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		res, err := userService.GetUserProfile(userID)
		if err != nil {
			zap.S().Error("Get profile server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		zap.S().Info("Get profile success")
		c.JSON(http.StatusOK, gin.H{
			"profile": res,
		})
	}
}

func updateProfile(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			zap.S().Error("Update profile server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		var user services.UserUpdateRequest
		err = c.BindJSON(&user)
		if err != nil {
			zap.S().Error("Update profile server error", zap.Error(err))
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		err = userService.UpdateUserProfile(&user, userID)
		if err != nil {
			zap.S().Error("Update profile server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		zap.S().Info("Update profile success")
		c.JSON(http.StatusOK, gin.H{
			"message": "user profile is updated",
		})
	}
}

func updateAmount(userService services.UserService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req services.AmountRequest
		err := c.BindJSON(&req)
		if err != nil {
			zap.S().Error("Update amount server error", zap.Error(err))
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		userID, err := middleware.GetUserId(c)
		if err != nil {
			zap.S().Error("Update amount server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = userService.UpdateAmount(&req, userID)
		if err != nil {
			zap.S().Error("Update amount server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		zap.S().Info("Update amount success")
		c.JSON(http.StatusOK, gin.H{
			"massage": "amount is updated",
		})
	}
}
