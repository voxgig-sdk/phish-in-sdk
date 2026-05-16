# PhishIn SDK exists test

require "minitest/autorun"
require_relative "../PhishIn_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PhishInSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
