package middleware

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"tradeApp/config"
	"tradeApp/repositories"
	"tradeApp/services"

	"github.com/gin-gonic/gin"
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
		secret := config.GetSecretAccess()

		err := services.TokenValidation(token, secret)
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		uuid, err := services.GetUuidFromToken(token, secret)
		if err != nil {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		userID, err := r.GetTokenInfo(uuid)
		if err != nil {
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

func GetUserId(c *gin.Context) (uint, error) {
	userID, ok := c.Get(UserIdKey)
	if !ok {
		return 0, errors.New("can`t get user ID")
	}
	uintUserID, err := strconv.Atoi(userID.(string))
	if err != nil {
		return 0, errors.New("can`t get user ID")
	}
	return uint(uintUserID), nil
}
