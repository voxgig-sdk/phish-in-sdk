# Typed models for the PhishIn SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Era(TypedDict, total=False):
    end_date: str
    id: int
    name: str
    start_date: str


class EraListMatch(TypedDict, total=False):
    end_date: str
    id: int
    name: str
    start_date: str


class Search(TypedDict, total=False):
    shows: list
    songs: list
    venues: list


class SearchLoadMatch(TypedDict, total=False):
    shows: list
    songs: list
    venues: list


class Show(TypedDict, total=False):
    data: list
    date: str
    id: int
    location: str
    page: int
    show_count: int
    success: bool
    total_entries: int
    total_pages: int
    tour_id: int
    tour_name: str
    tracks: list
    venue_id: int
    venue_name: str
    year: int


class ShowLoadMatch(TypedDict, total=False):
    date: str
    id: int
    year: int


class ShowListMatch(TypedDict, total=False):
    data: list
    date: str
    id: int
    location: str
    page: int
    show_count: int
    success: bool
    total_entries: int
    total_pages: int
    tour_id: int
    tour_name: str
    tracks: list
    venue_id: int
    venue_name: str
    year: int


class Song(TypedDict, total=False):
    alias: str
    debut: str
    id: int
    last_played: str
    times_played: int
    title: str


class SongLoadMatch(TypedDict):
    id: int


class SongListMatch(TypedDict, total=False):
    alias: str
    debut: str
    id: int
    last_played: str
    times_played: int
    title: str


class Tour(TypedDict, total=False):
    end_date: str
    id: int
    name: str
    shows_count: int
    start_date: str


class TourLoadMatch(TypedDict):
    id: int


class TourListMatch(TypedDict, total=False):
    end_date: str
    id: int
    name: str
    shows_count: int
    start_date: str


class Track(TypedDict, total=False):
    duration: int
    id: int
    mp3: str
    position: int
    set: str
    show_id: int
    song_id: int
    title: str


class TrackLoadMatch(TypedDict):
    id: int


class Venue(TypedDict, total=False):
    id: int
    latitude: float
    location: str
    longitude: float
    name: str
    shows_count: int


class VenueLoadMatch(TypedDict):
    id: int


class VenueListMatch(TypedDict, total=False):
    id: int
    latitude: float
    location: str
    longitude: float
    name: str
    shows_count: int


class Year(TypedDict):
    pass
