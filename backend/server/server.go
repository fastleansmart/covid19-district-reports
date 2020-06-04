package server

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/fastleansmart/covid19-district-reports/api"
	"github.com/fastleansmart/covid19-district-reports/model"
	"github.com/gorilla/mux"
)

// Server defines dependencies used in the server
type Server struct {
	DB *sql.DB
}

// Start the server
func (server *Server) Start() {
	rep := model.MakeRepository(server.DB)
	handlers := api.MakeHandlers(rep)
	r := mux.NewRouter()
	r.HandleFunc("/federal-states", handlers.FederalStateList)
	r.HandleFunc("/districts", handlers.DistrictList)
	r.HandleFunc("/reports", handlers.ReportList)
	log.Fatal(http.ListenAndServe(":7000", nil))
}
