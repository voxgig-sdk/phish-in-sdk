<?php
declare(strict_types=1);

// PhishIn SDK utility: result_body

class PhishInResultBody
{
    public static function call(PhishInContext $ctx): ?PhishInResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
