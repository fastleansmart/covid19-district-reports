package model

import "time"

// TimeSource returns the current time
type TimeSource interface {
	Now() time.Time
}
