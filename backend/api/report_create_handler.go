package api

import (
	"encoding/json"
	"net/http"

	"github.com/fastleansmart/covid19-district-reports/model"
)

// ReportCreate returns the list of the districts
func (dep *Handlers) ReportCreate(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var report model.Report
	err := decoder.Decode(&report)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode("failed to decode request body")
		return
	}

	err = dep.repository.AddReport(&report)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("failed to store reports")
		return
	}
	w.WriteHeader(http.StatusCreated)
}
