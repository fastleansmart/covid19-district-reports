package model_test

import (
	"database/sql"
	"testing"
	"time"

	"github.com/fastleansmart/covid19-district-reports/model"
	"github.com/fastleansmart/covid19-district-reports/test"

	// import the sqlite driver
	_ "github.com/mattn/go-sqlite3"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupDB() *sql.DB {
	db, err := sql.Open("sqlite3", "file:test.db?mode=memory")
	if err != nil {
		panic(err)
	}
	repository := model.MakeRepository(db)
	err = repository.SetupStructure()
	if err != nil {
		panic(err)
	}
	return db
}

func TestFederalStateRepositoryFunc(testing *testing.T) {
	db := setupDB()
	repository := model.MakeRepository(db)
	fs := model.FederalState{Name: "Schleswig-Holstein"}
	number, err := repository.AddFederalState(&fs)
	assert.Equal(testing, 1, number)
	require.NoError(testing, err)

	federalStates, err := repository.GetFederalStates()
	require.NoError(testing, err)

	expectedFederalStates := []model.FederalState{}
	expectedFederalStates = append(expectedFederalStates, model.FederalState{ID: 1, Name: "Schleswig-Holstein"})
	assert.Equal(testing, expectedFederalStates, federalStates)
}

func TestDistrictRepositoryFunc(testing *testing.T) {
	db := setupDB()
	repository := model.MakeRepository(db)
	fs := model.District{Name: "Schleswig-Holstein", FederalStateID: 1}
	err := repository.AddDistrict(&fs)
	require.NoError(testing, err)

	districts, err := repository.GetDistricts(nil)
	require.NoError(testing, err)

	expectedDistricts := []model.District{}
	expectedDistricts = append(expectedDistricts, model.District{ID: 1, Name: "Schleswig-Holstein", FederalStateID: 1})
	assert.Equal(testing, expectedDistricts, districts)
}

func TestDistrictRepositoryFuncWithArgument(testing *testing.T) {
	db := setupDB()
	repository := model.MakeRepository(db)
	fs := model.District{Name: "Plön", FederalStateID: 1}
	err := repository.AddDistrict(&fs)
	require.NoError(testing, err)

	fs = model.District{Name: "Hamburg", FederalStateID: 2}
	err = repository.AddDistrict(&fs)
	require.NoError(testing, err)

	federalStateId := 1
	districts, err := repository.GetDistricts(&federalStateId)
	require.NoError(testing, err)

	expectedDistricts := []model.District{}
	expectedDistricts = append(expectedDistricts, model.District{ID: 1, Name: "Plön", FederalStateID: 1})
	assert.Equal(testing, expectedDistricts, districts)
}

func TestReportRepositoryFunc(t *testing.T) {
	timeSource := test.MustFixedTimeSource("2020-06-03T15:50:45Z")

	db := setupDB()
	repository := model.MakeRepository(db)
	fs := model.Report{DistrictID: 1, Date: timeSource.Now(), Count: 5}
	err := repository.AddReport(&fs)
	require.NoError(t, err)

	districts, err := repository.GetReports(nil)
	require.NoError(t, err)

	expectedReports := []model.Report{}
	expectedTime, _ := time.Parse(time.RFC3339, "2020-06-03T15:50:45Z")
	expectedReports = append(expectedReports, model.Report{ID: 1, Date: expectedTime, DistrictID: 1, Count: 5})
	assert.Equal(t, expectedReports, districts)
}

func TestReportRepositoryFederalStateSummary(t *testing.T) {
	db := setupDB()
	repository := model.MakeRepository(db)
	test.SetUpTestStates(repository)

	testData := []model.Report{
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 1,
		},
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 1,
		},
		{
			Count:      2,
			Healed:     1,
			Died:       1,
			DistrictID: 2,
		},
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 3,
		},
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 3,
		},
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 4,
		},
	}

	for i, report := range testData {
		rt, _ := time.Parse(time.RFC3339, "2020-06-03T15:50:45Z")
		report.Date = rt.Add(time.Duration(i) * 24 * time.Hour)
		repository.AddReport(&report)
	}

	summaryReports, err := repository.GetFederalStatesSummary()
	assert.Equal(t, []model.SummaryReport{
		{
			Name:           "Baden-Würtemberg",
			FederalStateID: 1,
			Count:          6,
			Healed:         1,
			Died:           3,
		},
		{
			Name:           "Bayern",
			FederalStateID: 2,
			Count:          6,
			Healed:         0,
			Died:           3,
		},
	}, summaryReports)
	require.NoError(t, err)
}

func TestReportRepositoryDistrictSummary(t *testing.T) {
	db := setupDB()
	repository := model.MakeRepository(db)
	test.SetUpTestStates(repository)

	testData := []model.Report{
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 1,
		},
		{
			Count:      2,
			Healed:     0,
			Died:       1,
			DistrictID: 1,
		},
		{
			Count:      2,
			Healed:     1,
			Died:       1,
			DistrictID: 2,
		},
	}

	for i, report := range testData {
		rt, _ := time.Parse(time.RFC3339, "2020-06-03T15:50:45Z")
		report.Date = rt.Add(time.Duration(i) * 24 * time.Hour)
		repository.AddReport(&report)
	}

	summaryReports, err := repository.GetDistrictSummary(1)
	assert.Equal(t, 2, len(summaryReports))
	assert.Equal(t, []model.SummaryReport{
		{
			Name:   "Biberach",
			Count:  4,
			Healed: 0,
			Died:   2,
		},
		{
			Name:   "Ludwigsburg",
			Count:  2,
			Healed: 1,
			Died:   1,
		},
	}, summaryReports)
	require.NoError(t, err)
}
