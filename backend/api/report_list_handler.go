package api

import (
	"encoding/json"
	"net/http"
)

// ReportList returns the list of the districts
func (dep *Handlers) ReportList(w http.ResponseWriter, r *http.Request) {
	//var reportFilter model.ReportFilter
	reports, err := dep.repository.GetReports(nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("failed to load reports")
		return
	}

	json.NewEncoder(w).Encode(reports)
}
