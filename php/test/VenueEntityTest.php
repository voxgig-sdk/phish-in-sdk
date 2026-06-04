<?php
declare(strict_types=1);

// Venue entity test

require_once __DIR__ . '/../phishin_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class VenueEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PhishInSDK::test(null, null);
        $ent = $testsdk->Venue(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = venue_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "venue." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PHISHIN_TEST_VENUE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $venue_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.venue")));
        $venue_ref01_data = null;
        if (count($venue_ref01_data_raw) > 0) {
            $venue_ref01_data = Helpers::to_map($venue_ref01_data_raw[0][1]);
        }

        // LIST
        $venue_ref01_ent = $client->Venue(null);
        $venue_ref01_match = [];

        [$venue_ref01_list_result, $err] = $venue_ref01_ent->list($venue_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($venue_ref01_list_result);

        // LOAD
        $venue_ref01_match_dt0 = [
            "id" => $venue_ref01_data["id"],
        ];
        [$venue_ref01_data_dt0_loaded, $err] = $venue_ref01_ent->load($venue_ref01_match_dt0, null);
        $this->assertNull($err);
        $venue_ref01_data_dt0_load_result = Helpers::to_map($venue_ref01_data_dt0_loaded);
        $this->assertNotNull($venue_ref01_data_dt0_load_result);
        $this->assertEquals($venue_ref01_data_dt0_load_result["id"], $venue_ref01_data["id"]);

    }
}

function venue_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/venue/VenueTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PhishInSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["venue01", "venue02", "venue03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PHISHIN_TEST_VENUE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PHISHIN_TEST_VENUE_ENTID" => $idmap,
        "PHISHIN_TEST_LIVE" => "FALSE",
        "PHISHIN_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PHISHIN_TEST_VENUE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PHISHIN_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PhishInSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PHISHIN_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PHISHIN_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
