package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

// DistrictList returns the list of the districts
func (dep *Handlers) DistrictList(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	federalStateID, _ := strconv.Atoi(query.Get("federalStateId"))
	fmt.Printf("x%dX", federalStateID)
	dl, err := dep.repository.GetDistricts(&federalStateID)
	if err != nil {
		json.NewEncoder(w).Encode("failed to load districts")
		return
	}

	json.NewEncoder(w).Encode(dl)
}
