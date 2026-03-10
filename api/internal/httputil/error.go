package httputil

import (
	"encoding/json"
	"net/http"
)

type AppError struct {
	Code       string `json:"code"`
	StatusCode int    `json:"statusCode"`
	Message    string `json:"message"`
	Success    bool   `json:"success"`
}

func (e AppError) Send(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(e.StatusCode)
	json.NewEncoder(w).Encode(e)
}

func NewBadRequestError(message string, data any) AppError {
	return AppError{
		Code:       "BAD_REQUEST",
		StatusCode: 400,
		Message:    message,
		Success:    false,
	}
}

func NewUnauthorizedError(message string) AppError {
	return AppError{
		Code:       "UNAUTHORIZED",
		StatusCode: 401,
		Message:    message,
		Success:    false,
	}
}

func NewForbiddenError(message string) AppError {
	return AppError{
		Code:       "FORBIDDEN",
		StatusCode: 403,
		Message:    message,
		Success:    false,
	}
}

func NewNotFoundError(message string) AppError {
	return AppError{
		Code:       "NOT_FOUND",
		StatusCode: 404,
		Message:    message,
		Success:    false,
	}
}

func NewInternalServerError(message string, data any) AppError {
	return AppError{
		Code:       "INTERNAL_SERVER_ERROR",
		StatusCode: 500,
		Message:    message,
		Success:    false,
	}
}