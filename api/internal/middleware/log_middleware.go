package middleware

import (
	"net/http"
	"time"

	"github.com/sigwaldostepan/better-prompt/api/internal/logger"
	"go.uber.org/zap"
)

func NewLoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		next.ServeHTTP(w, r)

		logger.Log.Info("HTTP Request",
			zap.String("method", r.Method),
			zap.String("path", r.URL.Path),
			zap.String("ip", r.RemoteAddr),
			zap.Duration("duration", time.Since(start)),
		)
	})
}