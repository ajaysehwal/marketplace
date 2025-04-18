package handler

import (
	"encoding/json"
	"net/http"

	"github.com/ajaysehwal/apihub/base/internal/services"
)

type Handler struct {
	services *services.Services
}

func NewHandler(svc *services.Services) *Handler {
	return &Handler{
		services: svc,
	}
}

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

func JSON(w http.ResponseWriter, status int, data interface{}, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	resp := APIResponse{
		Success: status >= 200 && status < 300,
		Message: msg,
		Data:    data,
	}
	json.NewEncoder(w).Encode(resp)
}

func Error(w http.ResponseWriter, status int, err error, msg string) {
	JSON(w, status, nil, msg+" | "+err.Error())
}
