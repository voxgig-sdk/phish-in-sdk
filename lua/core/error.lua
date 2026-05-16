-- PhishIn SDK error

local PhishInError = {}
PhishInError.__index = PhishInError


function PhishInError.new(code, msg, ctx)
  local self = setmetatable({}, PhishInError)
  self.is_sdk_error = true
  self.sdk = "PhishIn"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PhishInError:error()
  return self.msg
end


function PhishInError:__tostring()
  return self.msg
end


return PhishInError
