<?php
declare(strict_types=1);

// PhishIn SDK utility: feature_add

class PhishInFeatureAdd
{
    public static function call(PhishInContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
