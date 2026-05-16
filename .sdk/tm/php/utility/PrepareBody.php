<?php
declare(strict_types=1);

// PhishIn SDK utility: prepare_body

class PhishInPrepareBody
{
    public static function call(PhishInContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
