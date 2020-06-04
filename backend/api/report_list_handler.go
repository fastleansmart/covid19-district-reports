package api

import (
	"encoding/json"
	"net/http"

	"github.com/fastleansmart/covid19-district-reports/model"
)

// ReportList returns the list of the districts
func (dep *Handlers) ReportList(w http.ResponseWriter, r *http.Request) {
	var reportFilter model.ReportFilter
	dl, err := dep.repository.GetReports(&reportFilter)
	if err != nil {
		json.NewEncoder(w).Encode("failed to load reports")
		return
	}

	json.NewEncoder(w).Encode(dl)
}
