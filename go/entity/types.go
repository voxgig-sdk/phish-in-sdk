// Typed models for the PhishIn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Era is the typed data model for the era entity.
type Era struct {
	EndDate *string `json:"end_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// EraListMatch is the typed request payload for Era.ListTyped.
type EraListMatch struct {
	EndDate *string `json:"end_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Show is the typed data model for the show entity.
type Show struct {
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Page *int `json:"page,omitempty"`
	ShowCount *int `json:"show_count,omitempty"`
	Success *bool `json:"success,omitempty"`
	TotalEntry *int `json:"total_entry,omitempty"`
	TotalPage *int `json:"total_page,omitempty"`
	TourId *int `json:"tour_id,omitempty"`
	TourName *string `json:"tour_name,omitempty"`
	Track *[]any `json:"track,omitempty"`
	VenueId *int `json:"venue_id,omitempty"`
	VenueName *string `json:"venue_name,omitempty"`
	Year *int `json:"year,omitempty"`
}

// ShowLoadMatch is the typed request payload for Show.LoadTyped.
type ShowLoadMatch struct {
	Date *string `json:"date,omitempty"`
	Id *int `json:"id,omitempty"`
	Year *int `json:"year,omitempty"`
}

// ShowListMatch is the typed request payload for Show.ListTyped.
type ShowListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Date *string `json:"date,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Page *int `json:"page,omitempty"`
	ShowCount *int `json:"show_count,omitempty"`
	Success *bool `json:"success,omitempty"`
	TotalEntry *int `json:"total_entry,omitempty"`
	TotalPage *int `json:"total_page,omitempty"`
	TourId *int `json:"tour_id,omitempty"`
	TourName *string `json:"tour_name,omitempty"`
	Track *[]any `json:"track,omitempty"`
	VenueId *int `json:"venue_id,omitempty"`
	VenueName *string `json:"venue_name,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Song is the typed data model for the song entity.
type Song struct {
	Alia *string `json:"alia,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Debut *string `json:"debut,omitempty"`
	Id *int `json:"id,omitempty"`
	LastPlayed *string `json:"last_played,omitempty"`
	Success *bool `json:"success,omitempty"`
	TimesPlayed *int `json:"times_played,omitempty"`
	Title *string `json:"title,omitempty"`
}

// SongLoadMatch is the typed request payload for Song.LoadTyped.
type SongLoadMatch struct {
	Id int `json:"id"`
}

// SongListMatch is the typed request payload for Song.ListTyped.
type SongListMatch struct {
	Alia *string `json:"alia,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Debut *string `json:"debut,omitempty"`
	Id *int `json:"id,omitempty"`
	LastPlayed *string `json:"last_played,omitempty"`
	Success *bool `json:"success,omitempty"`
	TimesPlayed *int `json:"times_played,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Tour is the typed data model for the tour entity.
type Tour struct {
	Data *map[string]any `json:"data,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ShowsCount *int `json:"shows_count,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// TourLoadMatch is the typed request payload for Tour.LoadTyped.
type TourLoadMatch struct {
	Id int `json:"id"`
}

// TourListMatch is the typed request payload for Tour.ListTyped.
type TourListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ShowsCount *int `json:"shows_count,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Track is the typed data model for the track entity.
type Track struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// TrackLoadMatch is the typed request payload for Track.LoadTyped.
type TrackLoadMatch struct {
	Id int `json:"id"`
}

// Venue is the typed data model for the venue entity.
type Venue struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *int `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Location *string `json:"location,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	ShowsCount *int `json:"shows_count,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// VenueLoadMatch is the typed request payload for Venue.LoadTyped.
type VenueLoadMatch struct {
	Id int `json:"id"`
}

// VenueListMatch is the typed request payload for Venue.ListTyped.
type VenueListMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *int `json:"id,omitempty"`
	Latitude *float64 `json:"latitude,omitempty"`
	Location *string `json:"location,omitempty"`
	Longitude *float64 `json:"longitude,omitempty"`
	Name *string `json:"name,omitempty"`
	ShowsCount *int `json:"shows_count,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Year is the typed data model for the year entity.
type Year struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
