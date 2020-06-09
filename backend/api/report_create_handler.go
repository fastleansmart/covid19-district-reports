package api

import (
	"encoding/json"
	"fmt"
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
		json.NewEncoder(w).Encode(fmt.Sprintf("failed to decode request body%+v", err))
		return
	}
	if report.Date.IsZero() {
		report.Date = dep.timeSource.Now()
	}
	err = dep.repository.AddReport(&report)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode("failed to store reports")
		return
	}
	w.WriteHeader(http.StatusCreated)
}
