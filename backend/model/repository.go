package model

import (
	"database/sql"
	"time"
)

// DataAccessor represents the interface to communicate with storage
type DataAccessor interface {
	AddFederalState(federalState *FederalState) (int, error)
	GetFederalStates() ([]FederalState, error)
	AddDistrict(d *District) error
	GetDistricts(fsID *int) ([]District, error)
	SetupStructure() error
	AddReport(d *Report) error
	GetReports(filter *ReportFilter) ([]Report, error)
}

// Repository alllows the access to a db
type Repository struct {
	db *sql.DB
}

// ReportFilter filter the reports table
type ReportFilter struct {
	DistrictID     int
	FederalStateID int
	StartDate      time.Time
	EndDate        time.Time
}

// SetupStructure creates the table structure in the DB
func (rep *Repository) SetupStructure() error {
	_, err := rep.db.Exec(`CREATE TABLE IF NOT EXISTS federalStates (
		id INTEGER PRIMARY KEY ASC,
		name varchar(255) NOT NULL
	);`)

	if err != nil {
		return err
	}

	_, err = rep.db.Exec(`CREATE TABLE IF NOT EXISTS districts (
		id INTEGER PRIMARY KEY ASC,
		name varchar(255) NOT NULL,
		federalState_id INTEGER NOT NULL
	);`)

	if err != nil {
		return err
	}

	_, err = rep.db.Exec(`CREATE TABLE IF NOT EXISTS reports (
		id INTEGER PRIMARY KEY ASC,
		timestamp DATETIME NOT NULL,
		district_id INTEGER NOT NULL,
		infects INTEGER NOT NULL,
		healed INTEGER NOT NULL,
		died INTEGER NOT NULL
	);`)

	return err
}

// MakeRepository create a repository from a db conn
func MakeRepository(db *sql.DB) DataAccessor {
	r := new(Repository)
	r.db = db

	return r
}

// AddFederalState inserts a record
func (rep *Repository) AddFederalState(fs *FederalState) (int, error) {
	res, err := rep.db.Exec("INSERT INTO federalStates (name) VALUES($name)", fs.Name)

	if err != nil {
		return 0, err
	}
	insertID, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(insertID), nil
}

// GetFederalStates retrieves a list of federal states
func (rep *Repository) GetFederalStates() ([]FederalState, error) {
	federalStates := []FederalState{}
	rows, err := rep.db.Query("SELECT * FROM federalStates")

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		federalState := FederalState{}
		err := rows.Scan(&federalState.ID, &federalState.Name)
		if err != nil {
			return nil, err
		}
		federalStates = append(federalStates, federalState)
	}

	return federalStates, nil
}

// GetDistricts retrieves a list of federal states
func (rep *Repository) GetDistricts(fsID *int) ([]District, error) {
	districts := []District{}
	var err error
	var rows *sql.Rows
	if fsID != nil {
		rows, err = rep.db.Query("SELECT * FROM districts WHERE federalState_id = $fsId", fsID)
	} else {
		rows, err = rep.db.Query("SELECT * FROM districts")
	}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		district := District{}
		err := rows.Scan(&district.ID, &district.Name, &district.FederalStateID)
		if err != nil {
			return nil, err
		}
		districts = append(districts, district)
	}

	return districts, nil
}

// AddDistrict inserts a record
func (rep *Repository) AddDistrict(d *District) error {
	_, err := rep.db.Exec("INSERT INTO districts (name, federalState_id) VALUES($name, $fs_id)", d.Name, d.FederalStateID)

	return err
}

// AddReport inserts a record
func (rep *Repository) AddReport(r *Report) error {
	_, err := rep.db.Exec("INSERT INTO reports (timestamp, district_id, infects, healed, died) VALUES ($date, $districtId, $count, $healed, $died)", r.Date, r.DistrictID, r.Count, r.Healed, r.Died)

	return err
}

// GetReports return a list of reports
func (rep *Repository) GetReports(filter *ReportFilter) ([]Report, error) {
	reports := []Report{}
	var err error
	var rows *sql.Rows
	if filter != nil {
		rows, err = rep.db.Query("SELECT * FROM reports WHERE district_id = $fsId", filter.DistrictID)
	} else {
		rows, err = rep.db.Query("SELECT * FROM reports")
	}

	if err != nil {
		return nil, err
	}

	for rows.Next() {
		report := Report{}
		err := rows.Scan(&report.ID, &report.Date, &report.DistrictID, &report.Count, &report.Healed, &report.Died)
		if err != nil {
			return nil, err
		}
		reports = append(reports, report)
	}

	return reports, nil
}
