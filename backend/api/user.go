package api

import (
	"net/http"
	"tradeApp/middleware"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
)

func InjectUser(gr *gin.RouterGroup, userService services.UserService) {
	handler := gr.Group("user")

	handler.Use(middleware.AuthMiddleware)

	handler.GET("/profile", getProfile(userService))
	handler.PUT("/profile", updateProfile(userService))
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
