package httputil

import (
	"encoding/json"
	"net/http"
)

type AppResponse struct {
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Success    bool   `json:"success"`
	Data       any    `json:"data,omitempty"`
}

func (r AppResponse) Send(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(r.StatusCode)
	json.NewEncoder(w).Encode(r)
}

func NewOKResponse(message string, data any) AppResponse {
	return AppResponse{
		StatusCode: 200,
		Message:    message,
		Success:    true,
		Data:       data,
	}
}

func NewCreatedResponse(message string, data any) AppResponse {
	return AppResponse{
		StatusCode: 201,
		Message:    message,
		Success:    true,
		Data:       data,
	}
}

func NewNoContentResponse() AppResponse {
	return AppResponse{
		StatusCode: 204,
		Message:    "No Content",
		Success:    true,
		Data:       nil,
	}
}