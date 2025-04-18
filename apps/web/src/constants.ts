export enum ROLES {
  BUYER = "BUYER",
  SELLER = "SELLER",
}

export const ROLES_LABELS = {
  [ROLES.BUYER]: "Buyer",
  [ROLES.SELLER]: "Seller",
} as const;

export enum PLUGINS {
  // Authentication Plugins
  API_KEY = "api-key",
  AUTHZ_CASBIN = "authz-casbin",
  AUTHZ_KEYCLOAK = "authz-keycloak",
  BASIC_AUTH = "basic-auth",
  FORWARD_AUTH = "forward-auth",
  HMAC_AUTH = "hmac-auth",
  JWT_AUTH = "jwt-auth",
  KEY_AUTH = "key-auth",
  LDAP_AUTH = "ldap-auth",
  OPENID_CONNECT = "openid-connect",
  WOLF_RBAC = "wolf-rbac",

  // Security Plugins
  AI_PROMPT_GUARD = "ai-prompt-guard",
  CORS = "cors",
  CSRF = "csrf",
  IP_RESTRICTION = "ip-restriction",
  REFERER_RESTRICTION = "referer-restriction",
  UA_RESTRICTION = "ua-restriction",
  URI_BLOCKER = "uri-blocker",

  // Traffic Control Plugins
  AI_RATE_LIMITING = "ai-rate-limiting",
  BANDWIDTH_LIMIT = "bandwidth-limit",
  CLIENT_CONTROL = "client-control",
  LIMIT_CONN = "limit-conn",
  LIMIT_COUNT = "limit-count",
  LIMIT_REQ = "limit-req",
  PROXY_CONTROL = "proxy-control",
  TRAFFIC_SPLIT = "traffic-split",

  // Observability Plugins
  DATADOG = "datadog",
  ELASTICSEARCH_LOGGER = "elasticsearch-logger",
  FILE_LOGGER = "file-logger",
  GOOGLE_CLOUD_LOGGING = "google-cloud-logging",
  HTTP_LOGGER = "http-logger",
  KAFKA_LOGGER = "kafka-logger",
  LOGGLY = "loggly",
  PROMETHEUS = "prometheus",
  ROCKETMQ_LOGGER = "rocketmq-logger",
  SKYWALKING = "skywalking",
  SKYWALKING_LOGGER = "skywalking-logger",
  SLS_LOGGER = "sls-logger",
  SOLARWINDS_LOGGLY = "solarwinds-loggly",
  SPLUNK_HEC_LOGGING = "splunk-hec-logging",
  SYSLOG = "syslog",
  TCP_LOGGER = "tcp-logger",
  TENCENT_CLOUD_CLS = "tencent-cloud-cls",
  UDP_LOGGER = "udp-logger",
  ZIPKIN = "zipkin",

  // Transformation Plugins
  AI_REQUEST_REWRITE = "ai-request-rewrite",
  BATCH_REQUESTS = "batch-requests",
  GRPC_TRANSCODE = "grpc-transcode",
  GRPC_WEB = "grpc-web",
  PROXY_MIRROR = "proxy-mirror",
  PROXY_REWRITE = "proxy-rewrite",
  REQUEST_TRANSFORMER = "request-transformer",
  RESPONSE_REWRITE = "response-rewrite",

  // Serverless Plugins
  AWS_LAMBDA = "aws-lambda",
  AZURE_FUNCTIONS = "azure-functions",
  OPENFUNCTION = "openfunction",
  OPENWHISK = "openwhisk",
  SERVERLESS_POST_FUNCTION = "serverless-post-function",
  SERVERLESS_PRE_FUNCTION = "serverless-pre-function",

  // AI Gateway Plugins
  AI = "ai",
  AI_PROXY = "ai-proxy",
  AI_PROXY_MULTI = "ai-proxy-multi",

  // Other Plugins
  DECODE_ENCODE = "decode-encode",
  ECHO = "echo",
  ERROR_LOG_LOGGER = "error-log-logger",
  EXAMPLE_PLUGIN = "example-plugin",
  EXT_PLUGIN_POST_REQ = "ext-plugin-post-req",
  EXT_PLUGIN_POST_RESP = "ext-plugin-post-resp",
  EXT_PLUGIN_PRE_REQ = "ext-plugin-pre-req",
  FAULT_INJECTION = "fault-injection",
  KAFKA_PROXY = "kafka-proxy",
  MOCKING = "mocking",
  MQTT_PROXY = "mqtt-proxy",
  REDIRECT = "redirect",
  REQUEST_ID = "request-id",
  REQUEST_VALIDATION = "request-validation",
  SLUGIFY = "slugify",
  WORKFLOW = "workflow",
}

export const PLUGINS_LABELS = {
  // Authentication Plugins
  [PLUGINS.API_KEY]: "API Key Authentication",
  [PLUGINS.AUTHZ_CASBIN]: "Casbin Authorization",
  [PLUGINS.AUTHZ_KEYCLOAK]: "Keycloak Authorization",
  [PLUGINS.BASIC_AUTH]: "Basic Authentication",
  [PLUGINS.FORWARD_AUTH]: "Forward Authentication",
  [PLUGINS.HMAC_AUTH]: "HMAC Authentication",
  [PLUGINS.JWT_AUTH]: "JWT Authentication",
  [PLUGINS.KEY_AUTH]: "Key Authentication",
  [PLUGINS.LDAP_AUTH]: "LDAP Authentication",
  [PLUGINS.OPENID_CONNECT]: "OpenID Connect",
  [PLUGINS.WOLF_RBAC]: "Wolf RBAC",

  // Security Plugins
  [PLUGINS.AI_PROMPT_GUARD]: "AI Prompt Guard",
  [PLUGINS.CORS]: "Cross-Origin Resource Sharing",
  [PLUGINS.CSRF]: "CSRF Protection",
  [PLUGINS.IP_RESTRICTION]: "IP Restriction",
  [PLUGINS.REFERER_RESTRICTION]: "Referer Restriction",
  [PLUGINS.UA_RESTRICTION]: "User-Agent Restriction",
  [PLUGINS.URI_BLOCKER]: "URI Blocker",

  // Traffic Control Plugins
  [PLUGINS.AI_RATE_LIMITING]: "AI Rate Limiting",
  [PLUGINS.BANDWIDTH_LIMIT]: "Bandwidth Limit",
  [PLUGINS.CLIENT_CONTROL]: "Client Control",
  [PLUGINS.LIMIT_CONN]: "Limit Connections",
  [PLUGINS.LIMIT_COUNT]: "Limit Count",
  [PLUGINS.LIMIT_REQ]: "Limit Requests",
  [PLUGINS.PROXY_CONTROL]: "Proxy Control",
  [PLUGINS.TRAFFIC_SPLIT]: "Traffic Split",

  // Observability Plugins
  [PLUGINS.DATADOG]: "Datadog",
  [PLUGINS.ELASTICSEARCH_LOGGER]: "Elasticsearch Logger",
  [PLUGINS.FILE_LOGGER]: "File Logger",
  [PLUGINS.GOOGLE_CLOUD_LOGGING]: "Google Cloud Logging",
  [PLUGINS.HTTP_LOGGER]: "HTTP Logger",
  [PLUGINS.KAFKA_LOGGER]: "Kafka Logger",
  [PLUGINS.LOGGLY]: "Loggly",
  [PLUGINS.PROMETHEUS]: "Prometheus",
  [PLUGINS.ROCKETMQ_LOGGER]: "RocketMQ Logger",
  [PLUGINS.SKYWALKING]: "SkyWalking",
  [PLUGINS.SKYWALKING_LOGGER]: "SkyWalking Logger",
  [PLUGINS.SLS_LOGGER]: "SLS Logger",
  [PLUGINS.SOLARWINDS_LOGGLY]: "SolarWinds Loggly",
  [PLUGINS.SPLUNK_HEC_LOGGING]: "Splunk HEC Logging",
  [PLUGINS.SYSLOG]: "Syslog",
  [PLUGINS.TCP_LOGGER]: "TCP Logger",
  [PLUGINS.TENCENT_CLOUD_CLS]: "Tencent Cloud CLS",
  [PLUGINS.UDP_LOGGER]: "UDP Logger",
  [PLUGINS.ZIPKIN]: "Zipkin",

  // Transformation Plugins
  [PLUGINS.AI_REQUEST_REWRITE]: "AI Request Rewrite",
  [PLUGINS.BATCH_REQUESTS]: "Batch Requests",
  [PLUGINS.GRPC_TRANSCODE]: "gRPC Transcode",
  [PLUGINS.GRPC_WEB]: "gRPC Web",
  [PLUGINS.PROXY_MIRROR]: "Proxy Mirror",
  [PLUGINS.PROXY_REWRITE]: "Proxy Rewrite",
  [PLUGINS.REQUEST_TRANSFORMER]: "Request Transformer",
  [PLUGINS.RESPONSE_REWRITE]: "Response Rewrite",

  // Serverless Plugins
  [PLUGINS.AWS_LAMBDA]: "AWS Lambda",
  [PLUGINS.AZURE_FUNCTIONS]: "Azure Functions",
  [PLUGINS.OPENFUNCTION]: "OpenFunction",
  [PLUGINS.OPENWHISK]: "OpenWhisk",
  [PLUGINS.SERVERLESS_POST_FUNCTION]: "Serverless Post Function",
  [PLUGINS.SERVERLESS_PRE_FUNCTION]: "Serverless Pre Function",

  // AI Gateway Plugins
  [PLUGINS.AI]: "AI",
  [PLUGINS.AI_PROXY]: "AI Proxy",
  [PLUGINS.AI_PROXY_MULTI]: "AI Proxy Multi",

  // Other Plugins
  [PLUGINS.DECODE_ENCODE]: "Decode Encode",
  [PLUGINS.ECHO]: "Echo",
  [PLUGINS.ERROR_LOG_LOGGER]: "Error Log Logger",
  [PLUGINS.EXAMPLE_PLUGIN]: "Example Plugin",
  [PLUGINS.EXT_PLUGIN_POST_REQ]: "External Plugin Post Request",
  [PLUGINS.EXT_PLUGIN_POST_RESP]: "External Plugin Post Response",
  [PLUGINS.EXT_PLUGIN_PRE_REQ]: "External Plugin Pre Request",
  [PLUGINS.FAULT_INJECTION]: "Fault Injection",
  [PLUGINS.KAFKA_PROXY]: "Kafka Proxy",
  [PLUGINS.MOCKING]: "Mocking",
  [PLUGINS.MQTT_PROXY]: "MQTT Proxy",
  [PLUGINS.REDIRECT]: "Redirect",
  [PLUGINS.REQUEST_ID]: "Request ID",
  [PLUGINS.REQUEST_VALIDATION]: "Request Validation",
  [PLUGINS.SLUGIFY]: "Slugify",
  [PLUGINS.WORKFLOW]: "Workflow",
} as const;
