package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"tradeApp/repositories"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

const (
	Authorization = "Authorization"
	UserIdKey     = "userId"
)

var AuthMiddleware gin.HandlerFunc

func InitAuthMiddleware(repo repositories.TokenRepository) {
	AuthMiddleware = auth(repo)
}

func auth(r repositories.TokenRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "OPTIONS" {
			c.Next()
		}

		token := getToken(c)
		secret, ok := os.LookupEnv("JWT_ACCESS_SECRET")
		if !ok {
			logrus.Error("Can`t read .env file")
		}
		fmt.Println(token, secret)

		err := services.TokenValidation(token, secret)
		if err != nil {
			fmt.Println(1)
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		uuid, err := services.GetUuidFromToken(token, secret)
		if err != nil {
			fmt.Println(2)

			c.AbortWithStatus(http.StatusUnauthorized)
		}

		userID, err := r.GetTokenInfo(uuid)
		if err != nil {
			fmt.Println(3)

			c.AbortWithStatus(http.StatusUnauthorized)
		}

		c.Set(UserIdKey, userID)
		c.Next()
	}
}

func getToken(c *gin.Context) string {
	accessToken := c.Request.Header[Authorization]
	if len(accessToken) == 0 {
		return ""
	}
	token := strings.TrimPrefix(accessToken[0], "Bearer ")
	if len(accessToken) == 2 {
		return accessToken[1]
	}
	return token
}
