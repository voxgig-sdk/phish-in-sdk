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
---@field data? table
---@field success? boolean

---@class SearchLoadMatch
---@field data? table
---@field success? boolean

---@class Show
---@field data? table
---@field date? string
---@field id? number
---@field location? string
---@field page? number
---@field show_count? number
---@field success? boolean
---@field total_entry? number
---@field total_page? number
---@field tour_id? number
---@field tour_name? string
---@field track? table
---@field venue_id? number
---@field venue_name? string
---@field year? number

---@class ShowLoadMatch
---@field date string
---@field id number
---@field year number

---@class ShowListMatch
---@field data? table
---@field date? string
---@field id? number
---@field location? string
---@field page? number
---@field show_count? number
---@field success? boolean
---@field total_entry? number
---@field total_page? number
---@field tour_id? number
---@field tour_name? string
---@field track? table
---@field venue_id? number
---@field venue_name? string
---@field year? number

---@class Song
---@field alia? string
---@field data? table
---@field debut? string
---@field id? number
---@field last_played? string
---@field success? boolean
---@field times_played? number
---@field title? string

---@class SongLoadMatch
---@field id number

---@class SongListMatch
---@field alia? string
---@field data? table
---@field debut? string
---@field id? number
---@field last_played? string
---@field success? boolean
---@field times_played? number
---@field title? string

---@class Tour
---@field data? table
---@field end_date? string
---@field id? number
---@field name? string
---@field shows_count? number
---@field start_date? string
---@field success? boolean

---@class TourLoadMatch
---@field id number

---@class TourListMatch
---@field data? table
---@field end_date? string
---@field id? number
---@field name? string
---@field shows_count? number
---@field start_date? string
---@field success? boolean

---@class Track
---@field data? table
---@field success? boolean

---@class TrackLoadMatch
---@field id number

---@class Venue
---@field data? table
---@field id? number
---@field latitude? number
---@field location? string
---@field longitude? number
---@field name? string
---@field shows_count? number
---@field success? boolean

---@class VenueLoadMatch
---@field id number

---@class VenueListMatch
---@field data? table
---@field id? number
---@field latitude? number
---@field location? string
---@field longitude? number
---@field name? string
---@field shows_count? number
---@field success? boolean

---@class Year

local M = {}

return M
