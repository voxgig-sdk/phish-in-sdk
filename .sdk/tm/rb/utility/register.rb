# PhishIn SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PhishInUtility.registrar = ->(u) {
  u.clean = PhishInUtilities::Clean
  u.done = PhishInUtilities::Done
  u.make_error = PhishInUtilities::MakeError
  u.feature_add = PhishInUtilities::FeatureAdd
  u.feature_hook = PhishInUtilities::FeatureHook
  u.feature_init = PhishInUtilities::FeatureInit
  u.fetcher = PhishInUtilities::Fetcher
  u.make_fetch_def = PhishInUtilities::MakeFetchDef
  u.make_context = PhishInUtilities::MakeContext
  u.make_options = PhishInUtilities::MakeOptions
  u.make_request = PhishInUtilities::MakeRequest
  u.make_response = PhishInUtilities::MakeResponse
  u.make_result = PhishInUtilities::MakeResult
  u.make_point = PhishInUtilities::MakePoint
  u.make_spec = PhishInUtilities::MakeSpec
  u.make_url = PhishInUtilities::MakeUrl
  u.param = PhishInUtilities::Param
  u.prepare_auth = PhishInUtilities::PrepareAuth
  u.prepare_body = PhishInUtilities::PrepareBody
  u.prepare_headers = PhishInUtilities::PrepareHeaders
  u.prepare_method = PhishInUtilities::PrepareMethod
  u.prepare_params = PhishInUtilities::PrepareParams
  u.prepare_path = PhishInUtilities::PreparePath
  u.prepare_query = PhishInUtilities::PrepareQuery
  u.graphql_body = PhishInUtilities::GraphqlBody
  u.graphql_errors = PhishInUtilities::GraphqlErrors
  u.result_basic = PhishInUtilities::ResultBasic
  u.result_body = PhishInUtilities::ResultBody
  u.result_headers = PhishInUtilities::ResultHeaders
  u.transform_request = PhishInUtilities::TransformRequest
  u.transform_response = PhishInUtilities::TransformResponse
}
