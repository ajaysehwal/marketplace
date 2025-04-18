package models

import "encoding/json"

type Route struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Desc string `json:"desc,omitempty"`
	URI string `json:"uri"`
	ServiceID string `json:"service_id,omitempty"`
	Path string `json:"path,omitempty"`
	UpstreamID string `json:"upstream_id,omitempty"`
	Labels map[string]string `json:"labels,omitempty"`
	Status int `json:"status,omitempty"`
	Methods []Method `json:"methods,omitempty"`
	Host string `json:"host,omitempty"`
	RemoteAddr string `json:"remote_addr,omitempty"`
	Priority int `json:"priority,omitempty"`
	PluginConfigID string `json:"plugin_config_id,omitempty"`
	Timeout int `json:"timeout,omitempty"`
	EnableWebsocket bool `json:"enable_websocket,omitempty"`
	
}
type Node struct {
	Host string `json:"host"`
	Port int `json:"port"`
	Weight int `json:"weight"`
}


type Timeout struct {
	Connect int `json:"connect"`
	Send int `json:"send"`
	Read int `json:"read"`
}

type KeepalivePool struct {
	IdleTimeout int `json:"idle_timeout"`
	Requests int `json:"requests"`
	Size int `json:"size"`
}	

type Upstream struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Desc string `json:"desc"`
	Nodes []Node `json:"nodes"`
	Retries int `json:"retries"`
	Timeout Timeout `json:"timeout"`
	Type string `json:"type"`
	Scheme string `json:"scheme"`
	PassHost string `json:"pass_host"`
	KeepalivePool KeepalivePool `json:"keepalive_pool"`
	RetryTimeout int `json:"retry_timeout"`
	
}

type Service struct {
	Name string `json:"name"`
	UpstreamID string `json:"upstream_id"`
	Desc string `json:"desc"`
	Plugins json.RawMessage `json:"plugins" bson:"plugins" omitempty`
    Hosts []string `json:"hosts"`
}

