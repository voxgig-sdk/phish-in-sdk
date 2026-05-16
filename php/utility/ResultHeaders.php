<?php
declare(strict_types=1);

// PhishIn SDK utility: result_headers

class PhishInResultHeaders
{
    public static function call(PhishInContext $ctx): ?PhishInResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
