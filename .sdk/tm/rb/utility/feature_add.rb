# PhishIn SDK utility: feature_add
module PhishInUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
