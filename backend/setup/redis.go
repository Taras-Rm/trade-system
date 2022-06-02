package setup

import (
	"fmt"
	"tradeApp/config"

	"github.com/go-redis/redis/v7"
)

func RedisInit() (*redis.Client, error) {
	var redisClient *redis.Client

	//Initializing redis
	rdHost := config.GetRDHost()

	dsn := fmt.Sprintf("%s:6379", rdHost)

	redisClient = redis.NewClient(&redis.Options{
		Addr: dsn,
	})

	_, err := redisClient.Ping().Result()
	if err != nil {
		return nil, err
	}

	return redisClient, nil
}
