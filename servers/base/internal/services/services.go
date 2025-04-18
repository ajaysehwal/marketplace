package services

import (
	"errors"

	"github.com/ajaysehwal/apihub/base/pkg/database"
)

type Services struct {
	Base   *BaseService
	APISIX *APISIXService
}

var (
	ErrNotFound          = errors.New("not found")
	ErrInvalidID         = errors.New("invalid ID")
	ErrInvalidInput      = errors.New("invalid input")
	ErrDuplicateProduct  = errors.New("product already exists")
	ErrDuplicateEndpoint = errors.New("endpoint already exists")
	ErrProductNotFound   = errors.New("product not found")
)

func NewServices(db *database.MongoDB, apisixBaseURL string) *Services {
	return &Services{
		Base:   NewBaseService(db),
		APISIX: NewAPISIXService(apisixBaseURL),
	}
}
