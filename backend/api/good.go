package api

import (
	"encoding/json"
	"io/ioutil"
	"log"
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
	handler.POST("/buy", buyGood(goodService))
	handler.GET(":id", getGood(goodService))
	handler.DELETE(":id", deleteGood(goodService))
	handler.PUT(":id", updateGood(goodService))
	handler.GET("/goods/sale", getAllUserGoodsForSale(goodService))
	handler.GET("/goods/buy", getAllUserBuyedGoods(goodService))
	handler.GET("/goods/sold", getAllUserSoldGoods(goodService))
}

func addGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var good *services.GoodRequest

		bytes, err := ioutil.ReadAll(c.Request.Body)
		if err != nil {
			log.Fatal(err)
		}

		err = json.Unmarshal(bytes, &good)
		if err != nil {
			log.Fatal(err)
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

func getGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		goodID := c.Param("id")
		uintGoodID, err := strconv.ParseUint(goodID, 10, 64)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		good, err := goodService.GetGood(uint(uintGoodID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"good": good,
		})
	}
}

func buyGood(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var orderRequest *services.OrderRequest

		err := c.BindJSON(&orderRequest)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "bad request", "error": err.Error(),
			})
			return
		}

		goodID := orderRequest.GoodID
		uintGoodID, _ := strconv.Atoi(goodID)

		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = goodService.BuyGood(uint(uintGoodID), userID, orderRequest)
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

		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		err = goodService.UpdateGood(good, uint(uintGoodID), userID)
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

func getAllUserGoodsForSale(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		goods, err := goodService.GetAllUserGoodsForSale(userID)
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

func getAllUserBuyedGoods(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		goods, err := goodService.GetAllUserBuyedGoods(userID)
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

func getAllUserSoldGoods(goodService services.GoodService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		goods, err := goodService.GetAllUserSoldGoods(userID)
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
