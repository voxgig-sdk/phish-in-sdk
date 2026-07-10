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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Search = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Search#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
SearchLoadMatch = Struct.new(
  :data,
  :success,
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
# @!attribute [rw] total_entry
#   @return [Integer, nil]
#
# @!attribute [rw] total_page
#   @return [Integer, nil]
#
# @!attribute [rw] tour_id
#   @return [Integer, nil]
#
# @!attribute [rw] tour_name
#   @return [String, nil]
#
# @!attribute [rw] track
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
  :total_entry,
  :total_page,
  :tour_id,
  :tour_name,
  :track,
  :venue_id,
  :venue_name,
  :year,
  keyword_init: true
)

# Request payload for Show#load.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
ShowLoadMatch = Struct.new(
  :date,
  :id,
  :year,
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
# @!attribute [rw] total_entry
#   @return [Integer, nil]
#
# @!attribute [rw] total_page
#   @return [Integer, nil]
#
# @!attribute [rw] tour_id
#   @return [Integer, nil]
#
# @!attribute [rw] tour_name
#   @return [String, nil]
#
# @!attribute [rw] track
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
  :total_entry,
  :total_page,
  :tour_id,
  :tour_name,
  :track,
  :venue_id,
  :venue_name,
  :year,
  keyword_init: true
)

# Song entity data model.
#
# @!attribute [rw] alia
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] times_played
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Song = Struct.new(
  :alia,
  :data,
  :debut,
  :id,
  :last_played,
  :success,
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
# @!attribute [rw] alia
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
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
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] times_played
#   @return [Integer, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
SongListMatch = Struct.new(
  :alia,
  :data,
  :debut,
  :id,
  :last_played,
  :success,
  :times_played,
  :title,
  keyword_init: true
)

# Tour entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
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
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Tour = Struct.new(
  :data,
  :end_date,
  :id,
  :name,
  :shows_count,
  :start_date,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
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
#
# @!attribute [rw] success
#   @return [Boolean, nil]
TourListMatch = Struct.new(
  :data,
  :end_date,
  :id,
  :name,
  :shows_count,
  :start_date,
  :success,
  keyword_init: true
)

# Track entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Track = Struct.new(
  :data,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
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
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Venue = Struct.new(
  :data,
  :id,
  :latitude,
  :location,
  :longitude,
  :name,
  :shows_count,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
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
#
# @!attribute [rw] success
#   @return [Boolean, nil]
VenueListMatch = Struct.new(
  :data,
  :id,
  :latitude,
  :location,
  :longitude,
  :name,
  :shows_count,
  :success,
  keyword_init: true
)

# Year entity data model.
class Year
end

