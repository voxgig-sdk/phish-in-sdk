# PhishIn SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PhishInFeatures
  def self.make_feature(name)
    case name
    when "base"
      PhishInBaseFeature.new
    when "test"
      PhishInTestFeature.new
    else
      PhishInBaseFeature.new
    end
  end
end
