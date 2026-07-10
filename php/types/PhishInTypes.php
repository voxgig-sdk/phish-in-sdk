<?php
declare(strict_types=1);

// Typed models for the PhishIn SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Era entity data model. */
class Era
{
    public ?string $end_date = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $start_date = null;
}

/** Request payload for Era#list. */
class EraListMatch
{
    public ?string $end_date = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $start_date = null;
}

/** Search entity data model. */
class Search
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Search#load. */
class SearchLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Show entity data model. */
class Show
{
    public ?array $data = null;
    public ?string $date = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?int $page = null;
    public ?int $show_count = null;
    public ?bool $success = null;
    public ?int $total_entry = null;
    public ?int $total_page = null;
    public ?int $tour_id = null;
    public ?string $tour_name = null;
    public ?array $track = null;
    public ?int $venue_id = null;
    public ?string $venue_name = null;
    public ?int $year = null;
}

/** Request payload for Show#load. */
class ShowLoadMatch
{
    public ?string $date = null;
    public ?int $id = null;
    public ?int $year = null;
}

/** Request payload for Show#list. */
class ShowListMatch
{
    public ?array $data = null;
    public ?string $date = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?int $page = null;
    public ?int $show_count = null;
    public ?bool $success = null;
    public ?int $total_entry = null;
    public ?int $total_page = null;
    public ?int $tour_id = null;
    public ?string $tour_name = null;
    public ?array $track = null;
    public ?int $venue_id = null;
    public ?string $venue_name = null;
    public ?int $year = null;
}

/** Song entity data model. */
class Song
{
    public ?string $alia = null;
    public ?array $data = null;
    public ?string $debut = null;
    public ?int $id = null;
    public ?string $last_played = null;
    public ?bool $success = null;
    public ?int $times_played = null;
    public ?string $title = null;
}

/** Request payload for Song#load. */
class SongLoadMatch
{
    public int $id;
}

/** Request payload for Song#list. */
class SongListMatch
{
    public ?string $alia = null;
    public ?array $data = null;
    public ?string $debut = null;
    public ?int $id = null;
    public ?string $last_played = null;
    public ?bool $success = null;
    public ?int $times_played = null;
    public ?string $title = null;
}

/** Tour entity data model. */
class Tour
{
    public ?array $data = null;
    public ?string $end_date = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $shows_count = null;
    public ?string $start_date = null;
    public ?bool $success = null;
}

/** Request payload for Tour#load. */
class TourLoadMatch
{
    public int $id;
}

/** Request payload for Tour#list. */
class TourListMatch
{
    public ?array $data = null;
    public ?string $end_date = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?int $shows_count = null;
    public ?string $start_date = null;
    public ?bool $success = null;
}

/** Track entity data model. */
class Track
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Track#load. */
class TrackLoadMatch
{
    public int $id;
}

/** Venue entity data model. */
class Venue
{
    public ?array $data = null;
    public ?int $id = null;
    public ?float $latitude = null;
    public ?string $location = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?int $shows_count = null;
    public ?bool $success = null;
}

/** Request payload for Venue#load. */
class VenueLoadMatch
{
    public int $id;
}

/** Request payload for Venue#list. */
class VenueListMatch
{
    public ?array $data = null;
    public ?int $id = null;
    public ?float $latitude = null;
    public ?string $location = null;
    public ?float $longitude = null;
    public ?string $name = null;
    public ?int $shows_count = null;
    public ?bool $success = null;
}

/** Year entity data model. */
class Year
{
}

