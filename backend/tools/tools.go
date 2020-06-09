package tools

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/fastleansmart/covid19-district-reports/model"
)

type districts struct {
	Nhits   int `json:"nhits"`
	Records []struct {
		Datasetid string `json:"datasetid"`
		Recordid  string `json:"recordid"`
		Fields    struct {
			Name2      string    `json:"name_2"`
			Name0      string    `json:"name_0"`
			Name1      string    `json:"name_1"`
			Cca2       string    `json:"cca_2"`
			Engtype2   string    `json:"engtype_2"`
			GeoPoint2D []float64 `json:"geo_point_2d"`
			Hasc2      string    `json:"hasc_2"`
			ID2        int       `json:"id_2"`
			Type2      string    `json:"type_2"`
			ID0        int       `json:"id_0"`
			ID1        int       `json:"id_1"`
			Iso        string    `json:"iso"`
			GeoShape   struct {
				Type string `json:"type"`
				//Coordinates [][]interface{} `json:"coordinates"`
			} `json:"geo_shape"`
			Ccn2 int `json:"ccn_2"`
		} `json:"fields"`
		Geometry struct {
			Type        string    `json:"type"`
			Coordinates []float64 `json:"coordinates"`
		} `json:"geometry"`
		RecordTimestamp time.Time `json:"record_timestamp"`
	} `json:"records"`
}

// LoadData receives the test data from an external api
func LoadData(db *sql.DB) {
	var repository = model.MakeRepository(db)
	err := repository.SetupStructure()
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	federalStates := map[string]int{}
	resultSetLength := 100
	client := &http.Client{}
	req, err := http.NewRequest("GET", "https://public.opendatasoft.com/api/records/1.0/search/", nil)
	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	q := req.URL.Query()
	q.Add("dataset", "landkreise-in-germany")
	q.Add("rows", "1")
	q.Add("start", "0")
	req.URL.RawQuery = q.Encode()
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("Error when sending request to the server")
		return
	}

	defer resp.Body.Close()
	var resultData districts
	respBody, _ := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(respBody, &resultData)

	fmt.Println(resp.Status)

	pages := int(math.Ceil(float64(resultData.Nhits) / float64(resultSetLength)))

	fmt.Println(pages)

	for p := 0; p <= pages; p++ {
		q := req.URL.Query()
		q.Set("rows", strconv.Itoa(resultSetLength))
		q.Set("start", strconv.Itoa(p*resultSetLength))
		req.URL.RawQuery = q.Encode()
		resp, err := client.Do(req)
		if err != nil {
			fmt.Printf("Error when sending request to the server %+v", err)
			return
		}
		fmt.Println(resp.Status)
		var resultData districts
		respBody, _ := ioutil.ReadAll(resp.Body)
		err = json.Unmarshal(respBody, &resultData)

		for _, record := range resultData.Records {
			federalStateID, isSet := federalStates[record.Fields.Name1]
			if !isSet {
				fs := model.FederalState{Name: record.Fields.Name1}
				federalStateID, err = repository.AddFederalState(&fs)
				if err != nil {
					panic(err)
				}
				federalStates[record.Fields.Name1] = federalStateID
			}
			district := model.District{
				Name:           record.Fields.Name2,
				FederalStateID: federalStateID,
			}
			err = repository.AddDistrict(&district)
			if err != nil {
				panic(err)
			}
		}
	}
}
