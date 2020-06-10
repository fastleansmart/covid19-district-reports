package model

import "time"

// FederalState represents a german federal state
type FederalState struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// District represents a section in a federal state
type District struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	FederalStateID int    `json:"federal_state_id"`
}

// Report describes a single entry for a district
type Report struct {
	ID         int       `json:"id"`
	Date       time.Time `json:"date"`
	Count      int       `json:"infects"`
	Healed     int       `json:"healed"`
	Died       int       `json:"died"`
	DistrictID int       `json:"district_id"`
}

// SummaryReport describes cummulated data for a federal state or district
type SummaryReport struct {
	FederalStateID int    `json:"federalState_id"`
	Name           string `json:"name"`
	Count          int    `json:"infects"`
	Healed         int    `json:"healed"`
	Died           int    `json:"died"`
}
