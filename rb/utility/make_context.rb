# PhishIn SDK utility: make_context
require_relative '../core/context'
module PhishInUtilities
  MakeContext = ->(ctxmap, basectx) {
    PhishInContext.new(ctxmap, basectx)
  }
end
