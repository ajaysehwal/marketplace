package models

type Method string

const (
	GET    Method = "GET"
	POST   Method = "POST"
	PUT    Method = "PUT"
	DELETE Method = "DELETE"
	OPTIONS Method = "OPTIONS"
	HEAD   Method = "HEAD"
	PATCH  Method = "PATCH"
	TRACE  Method = "TRACE"
	CONNECT Method = "CONNECT"
)

func (m Method) String() string {
	return string(m)
}

func (m Method) Value() string {
	return string(m)
}

