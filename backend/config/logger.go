package config

import (
	"go.uber.org/zap"
)

var Logger *zap.Logger

func InitLogger() {
	Logger = configLogger()
}

func configLogger() *zap.Logger {
	logger := zap.NewExample()

	defer logger.Sync()

	return logger
}
