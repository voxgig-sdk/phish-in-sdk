package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewEraEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewSearchEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewShowEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewSongEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewTourEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewTrackEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewVenueEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

var NewYearEntityFunc func(client *PhishInSDK, entopts map[string]any) PhishInEntity

