<?php
declare(strict_types=1);

// PhishIn SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PhishInMakeContext
{
    public static function call(array $ctxmap, ?PhishInContext $basectx): PhishInContext
    {
        return new PhishInContext($ctxmap, $basectx);
    }
}
