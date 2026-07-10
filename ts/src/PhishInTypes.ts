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
  data?: Record<string, any>
  success?: boolean
}

export interface SearchLoadMatch {
  data?: Record<string, any>
  success?: boolean
}

export interface Show {
  data?: any[]
  date?: string
  id?: number
  location?: string
  page?: number
  show_count?: number
  success?: boolean
  total_entry?: number
  total_page?: number
  tour_id?: number
  tour_name?: string
  track?: any[]
  venue_id?: number
  venue_name?: string
  year?: number
}

export interface ShowLoadMatch {
  date?: string
  id?: number
  year?: number
}

export interface ShowListMatch {
  data?: any[]
  date?: string
  id?: number
  location?: string
  page?: number
  show_count?: number
  success?: boolean
  total_entry?: number
  total_page?: number
  tour_id?: number
  tour_name?: string
  track?: any[]
  venue_id?: number
  venue_name?: string
  year?: number
}

export interface Song {
  alia?: string
  data?: Record<string, any>
  debut?: string
  id?: number
  last_played?: string
  success?: boolean
  times_played?: number
  title?: string
}

export interface SongLoadMatch {
  id: number
}

export interface SongListMatch {
  alia?: string
  data?: Record<string, any>
  debut?: string
  id?: number
  last_played?: string
  success?: boolean
  times_played?: number
  title?: string
}

export interface Tour {
  data?: Record<string, any>
  end_date?: string
  id?: number
  name?: string
  shows_count?: number
  start_date?: string
  success?: boolean
}

export interface TourLoadMatch {
  id: number
}

export interface TourListMatch {
  data?: Record<string, any>
  end_date?: string
  id?: number
  name?: string
  shows_count?: number
  start_date?: string
  success?: boolean
}

export interface Track {
  data?: Record<string, any>
  success?: boolean
}

export interface TrackLoadMatch {
  id: number
}

export interface Venue {
  data?: Record<string, any>
  id?: number
  latitude?: number
  location?: string
  longitude?: number
  name?: string
  shows_count?: number
  success?: boolean
}

export interface VenueLoadMatch {
  id: number
}

export interface VenueListMatch {
  data?: Record<string, any>
  id?: number
  latitude?: number
  location?: string
  longitude?: number
  name?: string
  shows_count?: number
  success?: boolean
}

export interface Year {
}

