// Typed models for the PhishIn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/phish-in-sdk/go/core"
)

// Era is the typed data model for the era entity.
type Era struct {
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
}

// SearchLoadMatch is the typed request payload for Search.LoadTyped.
type SearchLoadMatch struct {
	Term string `json:"term"`
}

// Show is the typed data model for the show entity.
type Show struct {
}

// ShowLoadMatch is the typed request payload for Show.LoadTyped.
type ShowLoadMatch struct {
	Id int `json:"id"`
}

// ShowListMatch is the typed request payload for Show.ListTyped.
type ShowListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortAttr *string `json:"sort_attr,omitempty"`
	SortDir *string `json:"sort_dir,omitempty"`
}

// Song is the typed data model for the song entity.
type Song struct {
}

// SongLoadMatch is the typed request payload for Song.LoadTyped.
type SongLoadMatch struct {
	Id int `json:"id"`
}

// SongListMatch is the typed request payload for Song.ListTyped.
type SongListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortAttr *string `json:"sort_attr,omitempty"`
	SortDir *string `json:"sort_dir,omitempty"`
}

// Tour is the typed data model for the tour entity.
type Tour struct {
}

// TourLoadMatch is the typed request payload for Tour.LoadTyped.
type TourLoadMatch struct {
	Id int `json:"id"`
}

// TourListMatch is the typed request payload for Tour.ListTyped.
type TourListMatch struct {
	EndDate *string `json:"end_date,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	ShowsCount *int `json:"shows_count,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// Track is the typed data model for the track entity.
type Track struct {
}

// TrackLoadMatch is the typed request payload for Track.LoadTyped.
type TrackLoadMatch struct {
	Id int `json:"id"`
}

// Venue is the typed data model for the venue entity.
type Venue struct {
}

// VenueLoadMatch is the typed request payload for Venue.LoadTyped.
type VenueLoadMatch struct {
	Id int `json:"id"`
}

// VenueListMatch is the typed request payload for Venue.ListTyped.
type VenueListMatch struct {
	Page *int `json:"page,omitempty"`
	PerPage *int `json:"per_page,omitempty"`
	SortAttr *string `json:"sort_attr,omitempty"`
	SortDir *string `json:"sort_dir,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
