package models

// Plugin represents a plugin type in the system
type Plugin string

const (
	// Authentication Plugins
	APIKeyAuth    Plugin = "api-key"
	AuthzCasbin   Plugin = "authz-casbin"
	AuthzKeycloak Plugin = "authz-keycloak"
	BasicAuth     Plugin = "basic-auth"
	ForwardAuth   Plugin = "forward-auth"
	HmacAuth      Plugin = "hmac-auth"
	JwtAuth       Plugin = "jwt-auth"
	KeyAuth       Plugin = "key-auth"
	LdapAuth      Plugin = "ldap-auth"
	OpenIdConnect Plugin = "openid-connect"
	WolfRbac      Plugin = "wolf-rbac"

	// Security Plugins
	AiPromptGuard      Plugin = "ai-prompt-guard"
	Cors               Plugin = "cors"
	Csrf               Plugin = "csrf"
	IpRestriction      Plugin = "ip-restriction"
	RefererRestriction Plugin = "referer-restriction"
	UaRestriction      Plugin = "ua-restriction"
	UriBlocker         Plugin = "uri-blocker"

	// Traffic Control Plugins
	AiRateLimiting Plugin = "ai-rate-limiting"
	BandwidthLimit Plugin = "bandwidth-limit"
	ClientControl  Plugin = "client-control"
	LimitConn      Plugin = "limit-conn"
	LimitCount     Plugin = "limit-count"
	LimitReq       Plugin = "limit-req"
	ProxyControl   Plugin = "proxy-control"
	TrafficSplit   Plugin = "traffic-split"

	// Observability Plugins
	Datadog             Plugin = "datadog"
	ElasticsearchLogger Plugin = "elasticsearch-logger"
	FileLogger          Plugin = "file-logger"
	GoogleCloudLogging  Plugin = "google-cloud-logging"
	HttpLogger          Plugin = "http-logger"
	KafkaLogger         Plugin = "kafka-logger"
	Loggly              Plugin = "loggly"
	Prometheus          Plugin = "prometheus"
	RocketmqLogger      Plugin = "rocketmq-logger"
	Skywalking          Plugin = "skywalking"
	SkywalkingLogger    Plugin = "skywalking-logger"
	SlsLogger           Plugin = "sls-logger"
	SolarwindsLoggly    Plugin = "solarwinds-loggly"
	SplunkHecLogging    Plugin = "splunk-hec-logging"
	Syslog              Plugin = "syslog"
	TcpLogger           Plugin = "tcp-logger"
	TencentCloudCls     Plugin = "tencent-cloud-cls"
	UdpLogger           Plugin = "udp-logger"
	Zipkin              Plugin = "zipkin"

	// Transformation Plugins
	AiRequestRewrite   Plugin = "ai-request-rewrite"
	BatchRequests      Plugin = "batch-requests"
	GrpcTranscode      Plugin = "grpc-transcode"
	GrpcWeb            Plugin = "grpc-web"
	ProxyMirror        Plugin = "proxy-mirror"
	ProxyRewrite       Plugin = "proxy-rewrite"
	RequestTransformer Plugin = "request-transformer"
	ResponseRewrite    Plugin = "response-rewrite"

	// Serverless Plugins
	AwsLambda              Plugin = "aws-lambda"
	AzureFunctions         Plugin = "azure-functions"
	OpenFunction           Plugin = "openfunction"
	OpenWhisk              Plugin = "openwhisk"
	ServerlessPostFunction Plugin = "serverless-post-function"
	ServerlessPreFunction  Plugin = "serverless-pre-function"

	// AI Gateway Plugins
	Ai           Plugin = "ai"
	AiProxy      Plugin = "ai-proxy"
	AiProxyMulti Plugin = "ai-proxy-multi"

	// Other Plugins
	DecodeEncode      Plugin = "decode-encode"
	Echo              Plugin = "echo"
	ErrorLogLogger    Plugin = "error-log-logger"
	ExamplePlugin     Plugin = "example-plugin"
	ExtPluginPostReq  Plugin = "ext-plugin-post-req"
	ExtPluginPostResp Plugin = "ext-plugin-post-resp"
	ExtPluginPreReq   Plugin = "ext-plugin-pre-req"
	FaultInjection    Plugin = "fault-injection"
	KafkaProxy        Plugin = "kafka-proxy"
	Mocking           Plugin = "mocking"
	MqttProxy         Plugin = "mqtt-proxy"
	Redirect          Plugin = "redirect"
	RequestId         Plugin = "request-id"
	RequestValidation Plugin = "request-validation"
	Slugify           Plugin = "slugify"
	Workflow          Plugin = "workflow"
)

// PluginLabels maps plugin types to their human-readable labels
var PluginLabels = map[Plugin]string{
	// Authentication Plugins
	APIKeyAuth:    "API Key Authentication",
	AuthzCasbin:   "Casbin Authorization",
	AuthzKeycloak: "Keycloak Authorization",
	BasicAuth:     "Basic Authentication",
	ForwardAuth:   "Forward Authentication",
	HmacAuth:      "HMAC Authentication",
	JwtAuth:       "JWT Authentication",
	KeyAuth:       "Key Authentication",
	LdapAuth:      "LDAP Authentication",
	OpenIdConnect: "OpenID Connect",
	WolfRbac:      "Wolf RBAC",

	// Security Plugins
	AiPromptGuard:      "AI Prompt Guard",
	Cors:               "Cross-Origin Resource Sharing",
	Csrf:               "CSRF Protection",
	IpRestriction:      "IP Restriction",
	RefererRestriction: "Referer Restriction",
	UaRestriction:      "User-Agent Restriction",
	UriBlocker:         "URI Blocker",

	// Traffic Control Plugins
	AiRateLimiting: "AI Rate Limiting",
	BandwidthLimit: "Bandwidth Limit",
	ClientControl:  "Client Control",
	LimitConn:      "Limit Connections",
	LimitCount:     "Limit Count",
	LimitReq:       "Limit Requests",
	ProxyControl:   "Proxy Control",
	TrafficSplit:   "Traffic Split",

	// Observability Plugins
	Datadog:             "Datadog",
	ElasticsearchLogger: "Elasticsearch Logger",
	FileLogger:          "File Logger",
	GoogleCloudLogging:  "Google Cloud Logging",
	HttpLogger:          "HTTP Logger",
	KafkaLogger:         "Kafka Logger",
	Loggly:              "Loggly",
	Prometheus:          "Prometheus",
	RocketmqLogger:      "RocketMQ Logger",
	Skywalking:          "SkyWalking",
	SkywalkingLogger:    "SkyWalking Logger",
	SlsLogger:           "SLS Logger",
	SolarwindsLoggly:    "SolarWinds Loggly",
	SplunkHecLogging:    "Splunk HEC Logging",
	Syslog:              "Syslog",
	TcpLogger:           "TCP Logger",
	TencentCloudCls:     "Tencent Cloud CLS",
	UdpLogger:           "UDP Logger",
	Zipkin:              "Zipkin",

	// Transformation Plugins
	AiRequestRewrite:   "AI Request Rewrite",
	BatchRequests:      "Batch Requests",
	GrpcTranscode:      "gRPC Transcode",
	GrpcWeb:            "gRPC Web",
	ProxyMirror:        "Proxy Mirror",
	ProxyRewrite:       "Proxy Rewrite",
	RequestTransformer: "Request Transformer",
	ResponseRewrite:    "Response Rewrite",

	// Serverless Plugins
	AwsLambda:              "AWS Lambda",
	AzureFunctions:         "Azure Functions",
	OpenFunction:           "OpenFunction",
	OpenWhisk:              "OpenWhisk",
	ServerlessPostFunction: "Serverless Post Function",
	ServerlessPreFunction:  "Serverless Pre Function",

	// AI Gateway Plugins
	Ai:           "AI",
	AiProxy:      "AI Proxy",
	AiProxyMulti: "AI Proxy Multi",

	// Other Plugins
	DecodeEncode:      "Decode Encode",
	Echo:              "Echo",
	ErrorLogLogger:    "Error Log Logger",
	ExamplePlugin:     "Example Plugin",
	ExtPluginPostReq:  "External Plugin Post Request",
	ExtPluginPostResp: "External Plugin Post Response",
	ExtPluginPreReq:   "External Plugin Pre Request",
	FaultInjection:    "Fault Injection",
	KafkaProxy:        "Kafka Proxy",
	Mocking:           "Mocking",
	MqttProxy:         "MQTT Proxy",
	Redirect:          "Redirect",
	RequestId:         "Request ID",
	RequestValidation: "Request Validation",
	Slugify:           "Slugify",
	Workflow:          "Workflow",
}
