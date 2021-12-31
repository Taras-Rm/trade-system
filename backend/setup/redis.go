package setup

import "github.com/go-redis/redis/v7"

func RedisInit() (*redis.Client, error) {
	var redisClient *redis.Client
	//Initializing redis
	dsn := "localhost:6379"

	redisClient = redis.NewClient(&redis.Options{
		Addr: dsn, //redis port
	})

	_, err := redisClient.Ping().Result()
	if err != nil {
		return nil, err
	}

	return redisClient, nil
}
