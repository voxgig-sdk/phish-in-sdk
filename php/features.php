<?php
declare(strict_types=1);

// PhishIn SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PhishInFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PhishInBaseFeature();
            case "test":
                return new PhishInTestFeature();
            default:
                return new PhishInBaseFeature();
        }
    }
}
