package services

import (
	"context"
	"fmt"
	"net/http"
)

// APISIXService holds logic for interacting with APISIX
type APISIXService struct {
	client  *http.Client
	baseURL string
}

func NewAPISIXService(baseURL string) *APISIXService {
	return &APISIXService{
		client:  &http.Client{},
		baseURL: baseURL,
	}
}

func (a *APISIXService) CreateRoute(ctx context.Context, route interface{}) error {
	fmt.Println("Creating route in APISIX:", route)
	return nil
}

