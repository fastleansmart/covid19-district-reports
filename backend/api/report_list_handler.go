package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/fastleansmart/covid19-district-reports/model"
)

// ReportList returns the list of the districts
func (dep *Handlers) ReportList(w http.ResponseWriter, r *http.Request) {
	var err error
	var reports []model.SummaryReport
	query := r.URL.Query()
	federalStateID, err := strconv.Atoi(query.Get("federalStateId"))
	if err != nil {
		reports, err = dep.repository.GetDistrictSummary(federalStateID)
	} else {
		reports, err = dep.repository.GetFederalStatesSummary()
	}

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("failed to load reports")
		return
	}

	json.NewEncoder(w).Encode(reports)
}
