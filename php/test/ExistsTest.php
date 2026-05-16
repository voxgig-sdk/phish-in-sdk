<?php
declare(strict_types=1);

// PhishIn SDK exists test

require_once __DIR__ . '/../phishin_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PhishInSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
