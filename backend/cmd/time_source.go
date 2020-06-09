package cmd

import (
	"time"

	"github.com/fastleansmart/covid19-district-reports/model"
)

type currentTimeSource struct{}

func (cts currentTimeSource) Now() time.Time {
	return time.Now()
}

func newCurrentTimeSource() model.TimeSource {
	return currentTimeSource{}
}
