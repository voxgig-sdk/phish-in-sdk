package core

type PhishInError struct {
	IsPhishInError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPhishInError(code string, msg string, ctx *Context) *PhishInError {
	return &PhishInError{
		IsPhishInError: true,
		Sdk:              "PhishIn",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PhishInError) Error() string {
	return e.Msg
}
