package api

import (
	"encoding/json"
	"net/http"
)

// FederalStateList returns the list of the federal states
func (dep *Handlers) FederalStateList(w http.ResponseWriter, r *http.Request) {
	dl, err := dep.repository.GetFederalStates()
	if err != nil {
		json.NewEncoder(w).Encode(err.Error)
		return
	}

	json.NewEncoder(w).Encode(dl)
}
