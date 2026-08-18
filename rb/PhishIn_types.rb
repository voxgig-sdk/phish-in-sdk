# frozen_string_literal: true

# Typed models for the PhishIn SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Era entity data model.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
Era = Struct.new(
  :end_date,
  :id,
  :name,
  :start_date,
  keyword_init: true
)

# Request payload for Era#list.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
EraListMatch = Struct.new(
  :end_date,
  :id,
  :name,
  :start_date,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] shows
#   @return [Array, nil]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] venues
#   @return [Array, nil]
Search = Struct.new(
  :shows,
  :songs,
  :venues,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] shows
#   @return [Array, nil]
#
# @!attribute [rw] songs
#   @return [Array, nil]
#
# @!attribute [rw] venues
#   @return [Array, nil]
SearchLoadMatch = Struct.new(
  :shows,
  :songs,
  :venues,
  keyword_init: true
)

# Show entity data model.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] show_count
#   @return [Integer, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] total_entries
#   @return [Integer, nil]
#
# @!attribute [rw] total_pages
#   @return [Integer, nil]
#
# @!attribute [rw] tour_id
#   @return [Integer, nil]
#
# @!attribute [rw] tour_name
#   @return [String, nil]
#
# @!attribute [rw] tracks
#   @return [Array, nil]
#
# @!attribute [rw] venue_id
#   @return [Integer, nil]
#
# @!attribute [rw] venue_name
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
Show = Struct.new(
  :data,
  :date,
  :id,
  :location,
  :page,
  :show_count,
  :success,
  :total_entries,
  :total_pages,
  :tour_id,
  :tour_name,
  :tracks,
  :venue_id,
  :venue_name,
  :year,
  keyword_init: true
)

# Request payload for Show#load.
#
# @!attribute [rw] id
#   @return [Integer]
ShowLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Show#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] show_count
#   @return [Integer, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] total_entries
#   @return [Integer, nil]
#
# @!attribute [rw] total_pages
#   @return [Integer, nil]
#
# @!attribute [rw] tour_id
#   @return [Integer, nil]
#
# @!attribute [rw] tour_name
#   @return [String, nil]
#
# @!attribute [rw] tracks
#   @return [Array, nil]
#
# @!attribute [rw] venue_id
#   @return [Integer, nil]
#
# @!attribute [rw] venue_name
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
ShowListMatch = Struct.new(
  :data,
  :date,
  :id,
  :location,
  :page,
  :show_count,
  :success,
  :total_entries,
  :total_pages,
  :tour_id,
  :tour_name,
  :tracks,
  :venue_id,
  :venue_name,
  :year,
  keyword_init: true
)

# Song entity data model.
#
# @!attribute [rw] alias
#   @return [String, nil]
#
# @!attribute [rw] debut
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_played
#   @return [String, nil]
#
# @!attribute [rw] times_played
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Song = Struct.new(
  :alias,
  :debut,
  :id,
  :last_played,
  :times_played,
  :title,
  keyword_init: true
)

# Request payload for Song#load.
#
# @!attribute [rw] id
#   @return [Integer]
SongLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Song#list.
#
# @!attribute [rw] alias
#   @return [String, nil]
#
# @!attribute [rw] debut
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_played
#   @return [String, nil]
#
# @!attribute [rw] times_played
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
SongListMatch = Struct.new(
  :alias,
  :debut,
  :id,
  :last_played,
  :times_played,
  :title,
  keyword_init: true
)

# Tour entity data model.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] shows_count
#   @return [Integer, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
Tour = Struct.new(
  :end_date,
  :id,
  :name,
  :shows_count,
  :start_date,
  keyword_init: true
)

# Request payload for Tour#load.
#
# @!attribute [rw] id
#   @return [Integer]
TourLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Tour#list.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] shows_count
#   @return [Integer, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
TourListMatch = Struct.new(
  :end_date,
  :id,
  :name,
  :shows_count,
  :start_date,
  keyword_init: true
)

# Track entity data model.
#
# @!attribute [rw] duration
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] mp3
#   @return [String, nil]
#
# @!attribute [rw] position
#   @return [Integer, nil]
#
# @!attribute [rw] set
#   @return [String, nil]
#
# @!attribute [rw] show_id
#   @return [Integer, nil]
#
# @!attribute [rw] song_id
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Track = Struct.new(
  :duration,
  :id,
  :mp3,
  :position,
  :set,
  :show_id,
  :song_id,
  :title,
  keyword_init: true
)

# Request payload for Track#load.
#
# @!attribute [rw] id
#   @return [Integer]
TrackLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Venue entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] shows_count
#   @return [Integer, nil]
Venue = Struct.new(
  :id,
  :latitude,
  :location,
  :longitude,
  :name,
  :shows_count,
  keyword_init: true
)

# Request payload for Venue#load.
#
# @!attribute [rw] id
#   @return [Integer]
VenueLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Venue#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] shows_count
#   @return [Integer, nil]
VenueListMatch = Struct.new(
  :id,
  :latitude,
  :location,
  :longitude,
  :name,
  :shows_count,
  keyword_init: true
)

# Year entity data model.
class Year
end

