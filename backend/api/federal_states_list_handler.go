package api

import (
	"encoding/json"
	"net/http"
)

// HandleFederalStateList returns the list of the federal states
func (dep *Handlers) HandleFederalStateList(w http.ResponseWriter, r *http.Request) {
	dl, err := dep.repository.GetFederalStates()
	if err != nil {
		json.NewEncoder(w).Encode(err.Error)
		return
	}

	json.NewEncoder(w).Encode(dl)
}
