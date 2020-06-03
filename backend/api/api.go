package api

import "github.com/fastleansmart/covid19-district-reports/model"

// MakeHandlers returns a http handler collection
func MakeHandlers(rep model.DataAccessor) *Handlers {
	return &Handlers{repository: rep}
}

// Handlers is the collection of http handlers for this api
type Handlers struct {
	repository model.DataAccessor
}

// HTTPHandler is a collection of handlers for this project
type HTTPHandler interface {
	HandleFederalStateList()
	HandleDistrictList()
}
