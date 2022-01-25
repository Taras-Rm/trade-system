package services

import (
	"fmt"
	"time"
	"tradeApp/config"

	"github.com/dgrijalva/jwt-go"
	"github.com/sirupsen/logrus"
	"github.com/twinj/uuid"
)

type TokenDetails struct {
	AccessToken      string
	RefreshToken     string
	AccessTokenUuid  string
	RefreshTokenUuid string
	AccessTExpires   int64
	RefreshTExpires  int64
}

func CreateToken(userID uint) (*TokenDetails, error) {
	td := &TokenDetails{}
	// get time of access token
	timeAccessStr := config.GetTimeAccess()

	timeAccess, err := time.ParseDuration(timeAccessStr)
	if err != nil {
		logrus.Error("Can`t parse timeAccess")
	}
	// get time of refresh token
	timeRefreshStr := config.GetTimeRefresh()

	timeRefresh, err := time.ParseDuration(timeRefreshStr)
	if err != nil {
		logrus.Error("Can`t parse timeRefresh")
	}

	// set expire time
	td.AccessTExpires = time.Now().Add(timeAccess).Unix()
	td.AccessTokenUuid = uuid.NewV4().String()

	td.RefreshTExpires = time.Now().Add(timeRefresh).Unix()
	td.RefreshTokenUuid = uuid.NewV4().String()

	// creating access token
	secretA := config.GetSecretAccess()

	atClaims := jwt.MapClaims{}
	atClaims["user_id"] = userID
	atClaims["uuid"] = td.AccessTokenUuid
	atClaims["exp"] = td.AccessTExpires

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	td.AccessToken, err = at.SignedString([]byte(secretA))
	if err != nil {
		return nil, err
	}

	// creating refresh token
	secretR := config.GetSecretRefresh()

	rtClaims := jwt.MapClaims{}
	rtClaims["user_id"] = userID
	rtClaims["uuid"] = td.RefreshTokenUuid
	rtClaims["exp"] = td.RefreshTExpires

	rt := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	td.RefreshToken, err = rt.SignedString([]byte(secretR))
	if err != nil {
		return nil, err
	}

	return td, nil
}

func TokenValidation(inpToken, secret string) error {
	_, err := VerifyToken(inpToken, secret)
	if err != nil {
		return err
	}
	// if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
	// 	return err
	// }
	return nil
}

func VerifyToken(inpToken, secret string) (*jwt.Token, error) {
	token, err := jwt.Parse(inpToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func GetUuidFromToken(inpToken, secret string) (string, error) {
	claims, err := GetClaimsFromToken(inpToken, secret)
	if err != nil {
		return "", err
	}
	uuid := claims["uuid"]
	return uuid.(string), nil
}

func GetUserIdFromToken(inpToken, secret string) (uint, error) {
	claims, err := GetClaimsFromToken(inpToken, secret)
	if err != nil {
		return 0, err
	}
	uuid := claims["user_id"]
	return uuid.(uint), nil
}

func GetClaimsFromToken(inpToken, secret string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(inpToken, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	return claims, err
}
