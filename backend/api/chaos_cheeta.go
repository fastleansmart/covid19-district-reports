package api

import (
	"math/rand"
	"net/http"
	"time"
)

// ChaosCheeta describes the options for chaos in the system
type ChaosCheeta struct {
	internalServerError float64
}

// MakeChaosCheeta creates a chaos manager middleware
func MakeChaosCheeta(internalSeverError float64) ChaosCheeta {
	return ChaosCheeta{
		internalServerError: internalSeverError,
	}
}

// Chaos introduces itself as middleware
func (opt *ChaosCheeta) Chaos(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rand.Seed(time.Now().UnixNano())
		something := rand.Float64()
		if something > 1.0-opt.internalServerError {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}
