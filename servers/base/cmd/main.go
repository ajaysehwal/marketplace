package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ajaysehwal/apihub/base/internal/config"
	"github.com/ajaysehwal/apihub/base/internal/handler"
	"github.com/ajaysehwal/apihub/base/internal/routes"
	"github.com/ajaysehwal/apihub/base/internal/services"
	"github.com/ajaysehwal/apihub/base/pkg/database"
	"github.com/ajaysehwal/apihub/base/pkg/logger"
	"github.com/gorilla/mux"
	"go.uber.org/zap"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		panic("Failed to load configuration: " + err.Error())
	}
	if err := logger.Init(cfg.LogLevel); err != nil {
		panic("Failed to initialize logger: " + err.Error())
	}
	db, err := database.NewMongoDB(&cfg.MongoDB)
	if err != nil {
		logger.Fatal("Failed to connect to MongoDB", zap.Error(err))
	}
	defer db.Close()
	svc := services.NewServices(db, cfg.APISIX.BaseURL)
	h := handler.NewHandler(svc)
	r := mux.NewRouter()
	routes.RegisterRoutes(r, h)
	srv := &http.Server{
		Addr:         ":" + cfg.Server.Port,
		Handler:      r,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}
	go func() {
		logger.Info("Starting server on port " + cfg.Server.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", zap.Error(err))
		}
	}()
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logger.Info("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatal("Server forced to shutdown", zap.Error(err))
	}

	logger.Info("Server exiting")
}
