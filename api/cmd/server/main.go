package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/sigwaldostepan/better-prompt/api/config"
	"github.com/sigwaldostepan/better-prompt/api/internal/database"
	"github.com/sigwaldostepan/better-prompt/api/internal/handler"
	"github.com/sigwaldostepan/better-prompt/api/internal/logger"
	"github.com/sigwaldostepan/better-prompt/api/internal/middleware"
)

func main() {
	// Load env
	env := config.LoadEnv()

	// Init logger
	err := logger.Init(env.AppEnv)
	if err != nil {
		log.Fatal(err)
	}
	defer logger.Log.Sync()

	// Connect DB
	db, err := database.NewDatabase(env.DBUrl)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Database connected")

	// Setup handlers
	rootHandler := handler.NewRootHandler()
	healthCheckHandler := handler.NewHealthCheckHandler(db)

	mux := http.NewServeMux()

	// root (index '/') handler
	mux.HandleFunc("GET /", rootHandler.Exec)
	// API Health check
	mux.HandleFunc("GET /health", healthCheckHandler.Exec)

	server := http.Server{
		Addr: fmt.Sprintf(":%d", env.AppPort),
		Handler: middleware.NewLoggerMiddleware(mux),
	}

	log.Printf("Server running on port %d\n", env.AppPort)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}