package services

import (
	"os"
	"time"

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
	timeAccessStr, ok := os.LookupEnv("TIME_ACCESS")
	if !ok {
		logrus.Error("Can`t read .env file")
	}
	timeAccess, err := time.ParseDuration(timeAccessStr)
	if err != nil {
		logrus.Error("Can`t parse timeAccess")
	}
	// get time of refresh token
	timeRefreshStr, ok := os.LookupEnv("TIME_REFRESH")
	if !ok {
		logrus.Error("Can`t read .env file")
	}
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
	secretA, ok := os.LookupEnv("JWT_ACCESS_SECRET")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

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
	secretR, ok := os.LookupEnv("JWT_REFRESH_SECRET")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

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
