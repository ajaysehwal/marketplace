package routes

import (
	"net/http"

	"github.com/ajaysehwal/apihub/base/internal/handler"
	"github.com/ajaysehwal/apihub/base/internal/middleware"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// RegisterRoutes registers all API routes
func RegisterRoutes(r *mux.Router, h *handler.Handler) {
	// Apply global middlewares
	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.MetricsMiddleware)
	r.Use(corsMiddleware)

	// Create a subrouter for protected routes (health and metrics)
	protected := r.PathPrefix("").Subrouter()
	protected.Use(middleware.BasicAuthMiddleware("admin", "admin")) // Replace with secure credentials

	// Health check endpoint
	protected.HandleFunc("/health", h.HealthCheck).Methods("GET")

	// Metrics endpoint
	protected.Handle("/metrics", promhttp.Handler()).Methods("GET")

	// API routes
	base := r.PathPrefix("/api/v1").Subrouter()
	base.HandleFunc("/products", h.CreateProduct).Methods("POST")
	base.HandleFunc("/products", h.ListProducts).Methods("GET")
	base.HandleFunc("/products/{id}", h.GetProduct).Methods("GET")
	base.HandleFunc("/products/{id}", h.UpdateProduct).Methods("PUT")
	base.HandleFunc("/products/{id}", h.DeleteProduct).Methods("DELETE")
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
