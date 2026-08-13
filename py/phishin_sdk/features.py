# PhishIn SDK feature factory

from phishin_sdk.feature.base_feature import PhishInBaseFeature
from phishin_sdk.feature.test_feature import PhishInTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PhishInBaseFeature(),
        "test": lambda: PhishInTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
