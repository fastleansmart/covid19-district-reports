package test

import "github.com/fastleansmart/covid19-district-reports/model"

// SetUpTestStates basic district and federal states
func SetUpTestStates(repository model.DataAccessor) {
	tFederalStates := []model.FederalState{
		{
			Name: "Baden-Würtemberg",
		},
		{
			Name: "Bayern",
		},
	}
	for _, fs := range tFederalStates {
		_, _ = repository.AddFederalState(&fs)
	}
	tDistricts := []model.District{
		{
			Name:           "Biberach",
			FederalStateID: 1,
		},
		{
			Name:           "Ludwigsburg",
			FederalStateID: 1,
		},
		{
			Name:           "Kelheim",
			FederalStateID: 2,
		},
		{
			Name:           "Ingolstadt",
			FederalStateID: 2,
		},
	}
	for _, fs := range tDistricts {
		_ = repository.AddDistrict(&fs)
	}
}
