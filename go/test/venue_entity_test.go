package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/phish-in-sdk/go"
	"github.com/voxgig-sdk/phish-in-sdk/go/core"

	vs "github.com/voxgig-sdk/phish-in-sdk/go/utility/struct"
)

func TestVenueEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Venue(nil)
		if ent == nil {
			t.Fatal("expected non-nil VenueEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := venueBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "venue." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PHISHIN_TEST_VENUE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		venueRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.venue", setup.data)))
		var venueRef01Data map[string]any
		if len(venueRef01DataRaw) > 0 {
			venueRef01Data = core.ToMapAny(venueRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = venueRef01Data

		// LIST
		venueRef01Ent := client.Venue(nil)
		venueRef01Match := map[string]any{}

		venueRef01ListResult, err := venueRef01Ent.List(venueRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, venueRef01ListOk := venueRef01ListResult.([]any)
		if !venueRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", venueRef01ListResult)
		}

		// LOAD
		venueRef01MatchDt0 := map[string]any{
			"id": venueRef01Data["id"],
		}
		venueRef01DataDt0Loaded, err := venueRef01Ent.Load(venueRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		venueRef01DataDt0LoadResult := core.ToMapAny(venueRef01DataDt0Loaded)
		if venueRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if venueRef01DataDt0LoadResult["id"] != venueRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func venueBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "venue", "VenueTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read venue test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse venue test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"venue01", "venue02", "venue03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PHISHIN_TEST_VENUE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PHISHIN_TEST_VENUE_ENTID": idmap,
		"PHISHIN_TEST_LIVE":      "FALSE",
		"PHISHIN_TEST_EXPLAIN":   "FALSE",
		"PHISHIN_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PHISHIN_TEST_VENUE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PHISHIN_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PHISHIN_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPhishInSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PHISHIN_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PHISHIN_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
