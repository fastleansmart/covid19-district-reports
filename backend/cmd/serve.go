package cmd

import (
	"database/sql"
	"os"

	"github.com/fastleansmart/covid19-district-reports/api"
	"github.com/fastleansmart/covid19-district-reports/server"
	"github.com/spf13/cobra"

	// import the sqlite driver
	_ "github.com/mattn/go-sqlite3"
)

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "start the server",
	Long:  `This starts the simple REST API server`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		db, err := sql.Open("sqlite3", "./test.db?cache=shared")
		if err != nil {
			os.Exit(1)
		}
		db.SetMaxOpenConns(1)

		chaosCheeta := api.MakeChaosCheeta(internalServerErrorProbability)
		timeSource := newCurrentTimeSource()
		server := server.Server{DB: db, ChaosCheeta: &chaosCheeta, TimeSource: timeSource}
		server.Start()
	},
}
