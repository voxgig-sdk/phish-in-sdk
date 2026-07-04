# Typed models for the PhishIn SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Era:
    end_date: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    start_date: Optional[str] = None


@dataclass
class EraListMatch:
    end_date: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    start_date: Optional[str] = None


@dataclass
class Search:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class SearchLoadMatch:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class Show:
    data: Optional[list] = None
    date: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    page: Optional[int] = None
    show_count: Optional[int] = None
    success: Optional[bool] = None
    total_entry: Optional[int] = None
    total_page: Optional[int] = None
    tour_id: Optional[int] = None
    tour_name: Optional[str] = None
    track: Optional[list] = None
    venue_id: Optional[int] = None
    venue_name: Optional[str] = None
    year: Optional[int] = None


@dataclass
class ShowLoadMatch:
    date: str
    id: int
    year: int


@dataclass
class ShowListMatch:
    data: Optional[list] = None
    date: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    page: Optional[int] = None
    show_count: Optional[int] = None
    success: Optional[bool] = None
    total_entry: Optional[int] = None
    total_page: Optional[int] = None
    tour_id: Optional[int] = None
    tour_name: Optional[str] = None
    track: Optional[list] = None
    venue_id: Optional[int] = None
    venue_name: Optional[str] = None
    year: Optional[int] = None


@dataclass
class Song:
    alia: Optional[str] = None
    data: Optional[dict] = None
    debut: Optional[str] = None
    id: Optional[int] = None
    last_played: Optional[str] = None
    success: Optional[bool] = None
    times_played: Optional[int] = None
    title: Optional[str] = None


@dataclass
class SongLoadMatch:
    id: int


@dataclass
class SongListMatch:
    alia: Optional[str] = None
    data: Optional[dict] = None
    debut: Optional[str] = None
    id: Optional[int] = None
    last_played: Optional[str] = None
    success: Optional[bool] = None
    times_played: Optional[int] = None
    title: Optional[str] = None


@dataclass
class Tour:
    data: Optional[dict] = None
    end_date: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    shows_count: Optional[int] = None
    start_date: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class TourLoadMatch:
    id: int


@dataclass
class TourListMatch:
    data: Optional[dict] = None
    end_date: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    shows_count: Optional[int] = None
    start_date: Optional[str] = None
    success: Optional[bool] = None


@dataclass
class Track:
    data: Optional[dict] = None
    success: Optional[bool] = None


@dataclass
class TrackLoadMatch:
    id: int


@dataclass
class Venue:
    data: Optional[dict] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    location: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    shows_count: Optional[int] = None
    success: Optional[bool] = None


@dataclass
class VenueLoadMatch:
    id: int


@dataclass
class VenueListMatch:
    data: Optional[dict] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    location: Optional[str] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    shows_count: Optional[int] = None
    success: Optional[bool] = None


@dataclass
class Year:
    pass

