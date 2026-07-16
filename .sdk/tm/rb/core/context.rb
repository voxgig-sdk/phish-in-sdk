# PhishIn SDK context

require_relative '../utility/struct/voxgig_struct'
require_relative 'control'
require_relative 'operation'
require_relative 'spec'
require_relative 'result'
require_relative 'response'
require_relative 'error'
require_relative 'helpers'

class PhishInContext
  attr_accessor :id, :out, :client, :utility, :ctrl, :meta, :config,
                :entopts, :options, :entity, :shared, :opmap,
                :data, :reqdata, :match, :reqmatch, :point,
                :spec, :result, :response, :op

  def initialize(ctxmap = {}, basectx = nil)
    ctxmap ||= {}
    @id = "C#{rand(10000000..99999999)}"
    @out = {}

    @client = PhishInHelpers.get_ctx_prop(ctxmap, "client") || basectx&.client
    @utility = PhishInHelpers.get_ctx_prop(ctxmap, "utility") || basectx&.utility

    @ctrl = PhishInControl.new
    ctrl_raw = PhishInHelpers.get_ctx_prop(ctxmap, "ctrl")
    if ctrl_raw.is_a?(Hash)
      @ctrl.throw_err = ctrl_raw["throw"] if ctrl_raw.key?("throw")
      @ctrl.explain = ctrl_raw["explain"] if ctrl_raw["explain"].is_a?(Hash)
      @ctrl.actor = ctrl_raw["actor"] if ctrl_raw.key?("actor")
      @ctrl.paging = ctrl_raw["paging"] if ctrl_raw["paging"].is_a?(Hash)
    elsif basectx&.ctrl
      @ctrl = basectx.ctrl
    end

    m = PhishInHelpers.get_ctx_prop(ctxmap, "meta")
    @meta = m.is_a?(Hash) ? m : (basectx&.meta || {})

    cfg = PhishInHelpers.get_ctx_prop(ctxmap, "config")
    @config = cfg.is_a?(Hash) ? cfg : basectx&.config

    eo = PhishInHelpers.get_ctx_prop(ctxmap, "entopts")
    @entopts = eo.is_a?(Hash) ? eo : basectx&.entopts

    o = PhishInHelpers.get_ctx_prop(ctxmap, "options")
    @options = o.is_a?(Hash) ? o : basectx&.options

    e = PhishInHelpers.get_ctx_prop(ctxmap, "entity")
    @entity = e || basectx&.entity

    s = PhishInHelpers.get_ctx_prop(ctxmap, "shared")
    @shared = s.is_a?(Hash) ? s : basectx&.shared

    om = PhishInHelpers.get_ctx_prop(ctxmap, "opmap")
    @opmap = om.is_a?(Hash) ? om : (basectx&.opmap || {})

    @data = PhishInHelpers.to_map(PhishInHelpers.get_ctx_prop(ctxmap, "data")) || {}
    @reqdata = PhishInHelpers.to_map(PhishInHelpers.get_ctx_prop(ctxmap, "reqdata")) || {}
    @match = PhishInHelpers.to_map(PhishInHelpers.get_ctx_prop(ctxmap, "match")) || {}
    @reqmatch = PhishInHelpers.to_map(PhishInHelpers.get_ctx_prop(ctxmap, "reqmatch")) || {}

    pt = PhishInHelpers.get_ctx_prop(ctxmap, "point")
    @point = pt.is_a?(Hash) ? pt : basectx&.point

    sp = PhishInHelpers.get_ctx_prop(ctxmap, "spec")
    @spec = sp.is_a?(PhishInSpec) ? sp : basectx&.spec

    r = PhishInHelpers.get_ctx_prop(ctxmap, "result")
    @result = r.is_a?(PhishInResult) ? r : basectx&.result

    rp = PhishInHelpers.get_ctx_prop(ctxmap, "response")
    @response = rp.is_a?(PhishInResponse) ? rp : basectx&.response

    opname = PhishInHelpers.get_ctx_prop(ctxmap, "opname") || ""
    @op = resolve_op(opname)
  end

  def resolve_op(opname)
    # Cache key is `<entity>:<opname>` so two entities with the same op
    # (e.g. both have a "list") get distinct cached Operations. Keying
    # on opname alone caused the first-resolved entity's points to be
    # served to every subsequent entity's call.
    entname = @entity&.respond_to?(:get_name) ? @entity.get_name : "_"
    cache_key = "#{entname}:#{opname}"
    return @opmap[cache_key] if @opmap[cache_key]
    return PhishInOperation.new({}) if opname.empty?

    opcfg = VoxgigStruct.getpath(@config, "entity.#{entname}.op.#{opname}")

    input = (opname == "update" || opname == "create") ? "data" : "match"

    points = []
    if opcfg.is_a?(Hash)
      t = VoxgigStruct.getprop(opcfg, "points")
      points = t if t.is_a?(Array)
    end

    op = PhishInOperation.new({
      "entity" => entname,
      "name" => opname,
      "input" => input,
      "points" => points,
    })
    @opmap[cache_key] = op
    op
  end

  def make_error(code, msg)
    PhishInError.new(code, msg, self)
  end
end
