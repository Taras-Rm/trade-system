package config

import (
	"os"

	"github.com/sirupsen/logrus"
)

func GetPort() string {
	res, ok := os.LookupEnv("SERVER_PORT")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetDBUser() string {
	res, ok := os.LookupEnv("DB_USER")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetDBPass() string {
	res, ok := os.LookupEnv("DB_PASS")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetDBName() string {
	res, ok := os.LookupEnv("DB_NAME")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetDBHost() string {
	res, ok := os.LookupEnv("DB_HOST")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetTimeAccess() string {
	res, ok := os.LookupEnv("TIME_ACCESS")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}

func GetTimeRefresh() string {
	res, ok := os.LookupEnv("TIME_REFRESH")
	if !ok {
		logrus.Error("Can`t read .env file")
	}

	return res
}
