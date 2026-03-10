package handler

import (
	"encoding/json"
	"net/http"

	"github.com/jmoiron/sqlx"
)

type HealthCheckHandler struct {
	db *sqlx.DB
}

func NewHealthCheckHandler(db *sqlx.DB) *HealthCheckHandler {
	return &HealthCheckHandler{db: db}
}

func (h *HealthCheckHandler) Exec(w http.ResponseWriter, r *http.Request) {
	status := "up"
	dbStatus := "up"

	if err := h.db.Ping(); err != nil {
		dbStatus = "down"
		w.WriteHeader(http.StatusServiceUnavailable)
	}

	json.NewEncoder(w).Encode(map[string]any{
		"status": status,
		"database": map[string]string{
			"status": dbStatus,
		},
	})
}