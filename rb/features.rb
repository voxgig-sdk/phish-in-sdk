# PhishIn SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PhishInFeatures
  def self.make_feature(name)
    case name
    when "base"
      PhishInBaseFeature.new
    when "ratelimit"
      PhishInRatelimitFeature.new
    when "retry"
      PhishInRetryFeature.new
    when "test"
      PhishInTestFeature.new
    when "timeout"
      PhishInTimeoutFeature.new
    else
      PhishInBaseFeature.new
    end
  end
end
