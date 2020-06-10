package api_test

import "github.com/fastleansmart/covid19-district-reports/model"

type testRepository struct {
	federalStates []model.FederalState
	districts     []model.District
	reports       []model.Report
}

func (r *testRepository) GetFederalStates() ([]model.FederalState, error) {
	return r.federalStates, nil
}

func (r *testRepository) AddFederalState(d *model.FederalState) (int, error) {
	r.federalStates = append(r.federalStates, *d)
	return 1, nil
}

func (r *testRepository) AddDistrict(d *model.District) error {
	r.districts = append(r.districts, *d)
	return nil
}

func (r *testRepository) GetDistricts(fsID *int) ([]model.District, error) {
	return r.districts, nil
}

func (r *testRepository) AddReport(report *model.Report) error {
	r.reports = append(r.reports, *report)
	return nil
}

func (r *testRepository) GetReports(filter *model.ReportFilter) ([]model.Report, error) {
	return r.reports, nil
}

func (r *testRepository) SetupStructure() error {
	return nil
}

func (r *testRepository) GetFederalStatesSummary() ([]model.SummaryReport, error) {
	return nil, nil
}

func (r *testRepository) GetDistrictSummary(federalStateID int) ([]model.SummaryReport, error) {
	return nil, nil
}
