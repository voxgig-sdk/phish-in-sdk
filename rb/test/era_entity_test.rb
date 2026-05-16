# Era entity test

require "minitest/autorun"
require "json"
require_relative "../PhishIn_sdk"
require_relative "runner"

class EraEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PhishInSDK.test(nil, nil)
    ent = testsdk.Era(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = era_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "era." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PHISHIN_TEST_ERA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    era_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.era")))
    era_ref01_data = nil
    if era_ref01_data_raw.length > 0
      era_ref01_data = Helpers.to_map(era_ref01_data_raw[0][1])
    end

    # LIST
    era_ref01_ent = client.Era(nil)
    era_ref01_match = {}

    era_ref01_list_result, err = era_ref01_ent.list(era_ref01_match, nil)
    assert_nil err
    assert era_ref01_list_result.is_a?(Array)

  end
end

def era_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "era", "EraTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PhishInSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["era01", "era02", "era03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PHISHIN_TEST_ERA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PHISHIN_TEST_ERA_ENTID" => idmap,
    "PHISHIN_TEST_LIVE" => "FALSE",
    "PHISHIN_TEST_EXPLAIN" => "FALSE",
    "PHISHIN_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["PHISHIN_TEST_ERA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PHISHIN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["PHISHIN_APIKEY"],
      },
      extra || {},
    ])
    client = PhishInSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PHISHIN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PHISHIN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
