-- Typed models for the PhishIn SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Era
---@field end_date? string
---@field id? number
---@field name? string
---@field start_date? string

---@class EraListMatch
---@field end_date? string
---@field id? number
---@field name? string
---@field start_date? string

---@class Search
---@field shows? table
---@field songs? table
---@field venues? table

---@class SearchLoadMatch
---@field shows? table
---@field songs? table
---@field venues? table

---@class Show
---@field data? table
---@field date? string
---@field id? number
---@field location? string
---@field page? number
---@field show_count? number
---@field success? boolean
---@field total_entries? number
---@field total_pages? number
---@field tour_id? number
---@field tour_name? string
---@field tracks? table
---@field venue_id? number
---@field venue_name? string
---@field year? number

---@class ShowLoadMatch
---@field id number

---@class ShowListMatch
---@field data? table
---@field date? string
---@field id? number
---@field location? string
---@field page? number
---@field show_count? number
---@field success? boolean
---@field total_entries? number
---@field total_pages? number
---@field tour_id? number
---@field tour_name? string
---@field tracks? table
---@field venue_id? number
---@field venue_name? string
---@field year? number

---@class Song
---@field alias? string
---@field debut? string
---@field id? number
---@field last_played? string
---@field times_played? number
---@field title? string

---@class SongLoadMatch
---@field id number

---@class SongListMatch
---@field alias? string
---@field debut? string
---@field id? number
---@field last_played? string
---@field times_played? number
---@field title? string

---@class Tour
---@field end_date? string
---@field id? number
---@field name? string
---@field shows_count? number
---@field start_date? string

---@class TourLoadMatch
---@field id number

---@class TourListMatch
---@field end_date? string
---@field id? number
---@field name? string
---@field shows_count? number
---@field start_date? string

---@class Track
---@field duration? number
---@field id? number
---@field mp3? string
---@field position? number
---@field set? string
---@field show_id? number
---@field song_id? number
---@field title? string

---@class TrackLoadMatch
---@field id number

---@class Venue
---@field id? number
---@field latitude? number
---@field location? string
---@field longitude? number
---@field name? string
---@field shows_count? number

---@class VenueLoadMatch
---@field id number

---@class VenueListMatch
---@field id? number
---@field latitude? number
---@field location? string
---@field longitude? number
---@field name? string
---@field shows_count? number

---@class Year

local M = {}

return M
