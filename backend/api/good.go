package api

import (
	"net/http"
	"strconv"
	"tradeApp/middleware"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
)

func InjectGood(gr *gin.RouterGroup, goodService services.GoodService) {
	handler := gr.Group("good")

	handler.Use(middleware.AuthMiddleware)

	handler.POST("", addGood(goodService))
	handler.GET("", getAllGoods(goodService))
	handler.GET("/goods/:id", getAllUserGoods(goodService))
}

func addGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var good *services.GoodRequest

		err := c.BindJSON(&good)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		res, err := goodService.AddGood(good)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "good is added",
			"good":    res,
		})
	}
}

func getAllGoods(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {

		goods, err := goodService.GetAllGoods()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"goods": goods,
		})
	}
}

func getAllUserGoods(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		userId, _ := strconv.ParseUint(id, 10, 64)
		userIdUint := uint(userId)

		goods, err := goodService.GetAllUserGoods(userIdUint)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"goods": goods,
		})
	}
}
