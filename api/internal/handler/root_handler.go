package handler

import (
	"net/http"

	"github.com/sigwaldostepan/better-prompt/api/internal/httputil"
)

type RootHandler struct {}

func NewRootHandler() *RootHandler {
	return &RootHandler{}
}

func (h *RootHandler) Exec(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		httputil.NewNotFoundError("Endpoint not found").Send(w)
		return
	}

	httputil.NewOKResponse("BetterPrompt API", nil).Send(w)
}