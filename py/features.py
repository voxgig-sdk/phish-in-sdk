# PhishIn SDK feature factory

from feature.base_feature import PhishInBaseFeature
from feature.test_feature import PhishInTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PhishInBaseFeature(),
        "test": lambda: PhishInTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
