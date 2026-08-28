// Typed models for the PhishIn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Era {
  end_date?: string
  id?: number
  name?: string
  start_date?: string
}

export interface EraListMatch {
  end_date?: string
  id?: number
  name?: string
  start_date?: string
}

export interface Search {
  shows?: any[]
  songs?: any[]
  venues?: any[]
}

export interface SearchLoadMatch {
  term: string
}

export interface Show {
  data?: any[]
  date?: string
  id?: number
  location?: string
  page?: number
  show_count?: number
  success?: boolean
  total_entries?: number
  total_pages?: number
  tour_id?: number
  tour_name?: string
  tracks?: any[]
  venue_id?: number
  venue_name?: string
  year?: number
}

export interface ShowLoadMatch {
  id: number
}

export interface ShowListMatch {
  page?: number
  per_page?: number
  sort_attr?: string
  sort_dir?: string
}

export interface Song {
  alias?: string
  debut?: string
  id?: number
  last_played?: string
  times_played?: number
  title?: string
}

export interface SongLoadMatch {
  id: number
}

export interface SongListMatch {
  page?: number
  per_page?: number
  sort_attr?: string
  sort_dir?: string
}

export interface Tour {
  end_date?: string
  id?: number
  name?: string
  shows_count?: number
  start_date?: string
}

export interface TourLoadMatch {
  id: number
}

export interface TourListMatch {
  end_date?: string
  id?: number
  name?: string
  shows_count?: number
  start_date?: string
}

export interface Track {
  duration?: number
  id?: number
  mp3?: string
  position?: number
  set?: string
  show_id?: number
  song_id?: number
  title?: string
}

export interface TrackLoadMatch {
  id: number
}

export interface Venue {
  id?: number
  latitude?: number
  location?: string
  longitude?: number
  name?: string
  shows_count?: number
}

export interface VenueLoadMatch {
  id: number
}

export interface VenueListMatch {
  page?: number
  per_page?: number
  sort_attr?: string
  sort_dir?: string
}

export interface Year {
}

