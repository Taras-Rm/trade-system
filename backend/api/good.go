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
	handler.GET("/goods", getAllUserGoods(goodService))
	handler.POST("/buy/:id", buyGood(goodService))
	handler.DELETE(":id", deleteGood(goodService))
	handler.PUT(":id", updateGood(goodService))
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

		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		res, err := goodService.AddGood(good, userID)
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
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		goods, err := goodService.GetAllUserGoods(userID)
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

func buyGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		goodID := c.Param("id")
		uintGoodID, err := strconv.ParseUint(goodID, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
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

		err = goodService.BuyGood(uint(uintGoodID), userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "success good buying",
		})
	}
}

func deleteGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		goodID := c.Param("id")
		uintGoodID, err := strconv.ParseUint(goodID, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = goodService.DeleteGood(uint(uintGoodID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "good has been deleted",
		})
	}
}

func updateGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var good *services.GoodRequest

		err := c.BindJSON(&good)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		goodID := c.Param("id")
		uintGoodID, err := strconv.ParseUint(goodID, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = goodService.UpdateGood(good, uint(uintGoodID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "good has been updated",
		})
	}
}
