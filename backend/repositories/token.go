package repositories

import (
	"strconv"
	"time"

	"github.com/go-redis/redis/v7"
)

type TokenRepository interface {
	SaveTokenInfo(userID uint, AtExp, RtExp int64, AtUuid, RtUuid string) error
	GetTokenInfo(givenUuid string) (string, error)
	DeleteTokenInfo(givenUuid string) (int, error)
}

type tokenRepository struct {
	rc *redis.Client
}

func newTokenRepository(db *redis.Client) TokenRepository {
	return &tokenRepository{rc: db}
}

func (r *tokenRepository) SaveTokenInfo(userID uint, AtExp, RtExp int64, AtUuid, RtUuid string) error {
	at := time.Unix(AtExp, 0)
	rt := time.Unix(RtExp, 0)
	now := time.Now()

	err := r.rc.Set(AtUuid, strconv.Itoa(int(userID)), at.Sub(now)).Err()
	if err != nil {
		return err
	}

	err = r.rc.Set(RtUuid, strconv.Itoa(int(userID)), rt.Sub(now)).Err()
	if err != nil {
		return err
	}

	return nil
}

func (r *tokenRepository) GetTokenInfo(givenUuid string) (string, error) {
	result, err := r.rc.Get(givenUuid).Result()
	if err != nil {
		return "", err
	}
	return result, nil
}

func (r *tokenRepository) DeleteTokenInfo(givenUuid string) (int, error) {
	del, err := r.rc.Del(givenUuid).Result()
	if err != nil {
		return 0, err
	}
	return int(del), nil
}
