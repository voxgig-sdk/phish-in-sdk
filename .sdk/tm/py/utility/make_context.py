# PhishIn SDK utility: make_context

from core.context import PhishInContext


def make_context_util(ctxmap, basectx):
    return PhishInContext(ctxmap, basectx)
