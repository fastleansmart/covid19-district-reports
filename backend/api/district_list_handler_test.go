package api_test

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/fastleansmart/covid19-district-reports/api"
	"github.com/fastleansmart/covid19-district-reports/model"
	"github.com/fastleansmart/covid19-district-reports/test"
)

func TestDistrictsHandler(t *testing.T) {
	timeSource := test.MustFixedTimeSource("2020-06-04T07:30:34Z")
	tr := testRepository{
		districts: []model.District{
			{
				ID:             1,
				Name:           "Plön",
				FederalStateID: 1,
			},
		},
	}
	h := api.MakeHandlers(&tr, timeSource)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req, err := http.NewRequest("GET", "/?federalStateId=1", nil)
	if err != nil {
		t.Fatal(err)
	}

	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(h.DistrictList)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `[{"id":1,"name":"Plön","federal_state_id":1}]`
	if strings.Trim(rr.Body.String(), "\n") != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestDistrictsHandlerWithoutFSID(t *testing.T) {
	timeSource := test.MustFixedTimeSource("2020-06-04T07:30:34Z")
	tr := testRepository{
		districts: []model.District{
			{
				ID:             1,
				Name:           "Plön",
				FederalStateID: 1,
			},
		},
	}
	h := api.MakeHandlers(&tr, timeSource)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(h.DistrictList)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `[{"id":1,"name":"Plön","federal_state_id":1}]`
	if strings.Trim(rr.Body.String(), "\n") != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
