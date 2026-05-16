<?php
declare(strict_types=1);

// PhishIn SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PhishInUtility::setRegistrar(function (PhishInUtility $u): void {
    $u->clean = [PhishInClean::class, 'call'];
    $u->done = [PhishInDone::class, 'call'];
    $u->make_error = [PhishInMakeError::class, 'call'];
    $u->feature_add = [PhishInFeatureAdd::class, 'call'];
    $u->feature_hook = [PhishInFeatureHook::class, 'call'];
    $u->feature_init = [PhishInFeatureInit::class, 'call'];
    $u->fetcher = [PhishInFetcher::class, 'call'];
    $u->make_fetch_def = [PhishInMakeFetchDef::class, 'call'];
    $u->make_context = [PhishInMakeContext::class, 'call'];
    $u->make_options = [PhishInMakeOptions::class, 'call'];
    $u->make_request = [PhishInMakeRequest::class, 'call'];
    $u->make_response = [PhishInMakeResponse::class, 'call'];
    $u->make_result = [PhishInMakeResult::class, 'call'];
    $u->make_point = [PhishInMakePoint::class, 'call'];
    $u->make_spec = [PhishInMakeSpec::class, 'call'];
    $u->make_url = [PhishInMakeUrl::class, 'call'];
    $u->param = [PhishInParam::class, 'call'];
    $u->prepare_auth = [PhishInPrepareAuth::class, 'call'];
    $u->prepare_body = [PhishInPrepareBody::class, 'call'];
    $u->prepare_headers = [PhishInPrepareHeaders::class, 'call'];
    $u->prepare_method = [PhishInPrepareMethod::class, 'call'];
    $u->prepare_params = [PhishInPrepareParams::class, 'call'];
    $u->prepare_path = [PhishInPreparePath::class, 'call'];
    $u->prepare_query = [PhishInPrepareQuery::class, 'call'];
    $u->result_basic = [PhishInResultBasic::class, 'call'];
    $u->result_body = [PhishInResultBody::class, 'call'];
    $u->result_headers = [PhishInResultHeaders::class, 'call'];
    $u->transform_request = [PhishInTransformRequest::class, 'call'];
    $u->transform_response = [PhishInTransformResponse::class, 'call'];
});
