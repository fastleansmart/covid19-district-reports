package cmd

import (
	"database/sql"
	"os"

	"github.com/fastleansmart/covid19-district-reports/tools"
	"github.com/spf13/cobra"

	// import the sqlite driver
	_ "github.com/mattn/go-sqlite3"
)

var fixturesCmd = &cobra.Command{
	Use:   "fixtures",
	Short: "load external fixtures into db",
	Long:  `This is for development of the api server to load the external data`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	Run: func(cmd *cobra.Command, args []string) {
		db, err := sql.Open("sqlite3", "./test.db")
		if err != nil {
			os.Exit(1)
		}
		db.SetMaxOpenConns(1)

		tools.LoadData(db)

		db.Close()
	},
}
