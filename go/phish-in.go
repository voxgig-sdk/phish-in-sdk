package voxgigphishinsdk

import (
	"github.com/voxgig-sdk/phish-in-sdk/go/core"
	"github.com/voxgig-sdk/phish-in-sdk/go/entity"
	"github.com/voxgig-sdk/phish-in-sdk/go/feature"
	_ "github.com/voxgig-sdk/phish-in-sdk/go/utility"
)

// Type aliases preserve external API.
type PhishInSDK = core.PhishInSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PhishInEntity = core.PhishInEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PhishInError = core.PhishInError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEraEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewEraEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewShowEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewShowEntity(client, entopts)
	}
	core.NewSongEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewSongEntity(client, entopts)
	}
	core.NewTourEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewTourEntity(client, entopts)
	}
	core.NewTrackEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewTrackEntity(client, entopts)
	}
	core.NewVenueEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewVenueEntity(client, entopts)
	}
	core.NewYearEntityFunc = func(client *core.PhishInSDK, entopts map[string]any) core.PhishInEntity {
		return entity.NewYearEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPhishInSDK = core.NewPhishInSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
