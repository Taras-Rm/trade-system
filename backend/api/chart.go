package api

import (
	"net/http"
	"tradeApp/middleware"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func InjectChart(gr *gin.RouterGroup, chartService services.ChartService) {
	handler := gr.Group("chart")

	handler.Use(middleware.AuthMiddleware)

	handler.GET("", getIncomeExpenses(chartService))
}

func getIncomeExpenses(chartService services.ChartService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, err := middleware.GetUserId(c)
		if err != nil {
			zap.S().Error("Get incomes and expenses server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error(),
			})
			return
		}

		result, err := chartService.GetMonthlyIncomesExpenses(userID)
		if err != nil {
			zap.S().Error("Get incomes and expenses server error", zap.Error(err))
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "server error", "error": err.Error()})
			return
		}

		zap.S().Info("Get incomes and expenses server success")
		c.JSON(http.StatusOK, gin.H{
			"data": result,
		})
	}
}
