# PhishIn SDK exists test

import pytest
from phishin_sdk import PhishInSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PhishInSDK.test(None, None)
        assert testsdk is not None
