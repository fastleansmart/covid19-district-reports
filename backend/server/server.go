package server

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/fastleansmart/covid19-district-reports/api"
	"github.com/fastleansmart/covid19-district-reports/model"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// Server defines dependencies used in the server
type Server struct {
	DB          *sql.DB
	ChaosCheeta *api.ChaosCheeta
}

// Start the server
func (server *Server) Start() {
	corsObj:=handlers.AllowedOrigins([]string{"*"})

	rep := model.MakeRepository(server.DB)
	err := rep.SetupStructure()
	if err != nil {
		panic(err)
	}
	h := api.MakeHandlers(rep)
	r := mux.NewRouter()
	r.Use(handlers.CORS(corsObj))
	r.HandleFunc("/federal-states", h.FederalStateList)
	r.HandleFunc("/districts", h.DistrictList)
	r.HandleFunc("/reports", h.ReportList).Methods("GET")
	r.HandleFunc("/reports", h.ReportCreate).Methods("POST")
	r.Use(handlers.RecoveryHandler())
	r.Use(server.ChaosCheeta.Chaos)

	loggedRouter := handlers.LoggingHandler(os.Stdout, r)

	srv := &http.Server{
		Handler: loggedRouter,
		Addr:    ":7000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
