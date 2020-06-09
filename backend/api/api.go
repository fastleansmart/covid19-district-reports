package api

import "github.com/fastleansmart/covid19-district-reports/model"

// MakeHandlers returns a http handler collection
func MakeHandlers(rep model.DataAccessor, timeSource model.TimeSource) *Handlers {
	return &Handlers{repository: rep, timeSource: timeSource}
}

// Handlers is the collection of http handlers for this api
type Handlers struct {
	repository model.DataAccessor
	timeSource model.TimeSource
}

// HTTPHandler is a collection of handlers for this project
type HTTPHandler interface {
	FederalStateList()
	DistrictList()
	ReportList()
	ReportCreate(report model.Report)
}
