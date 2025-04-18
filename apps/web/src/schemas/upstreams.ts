import { z } from "zod";

export const nodes = z.object({
  host: z.string().url(),
  weight: z.number().min(1).default(1),
  port: z.number().min(1).default(443),
});

export const healthCheckSchema = z.object({
  type: z.enum(["http", "https", "tcp"]).default("http"),
  timeout: z.number().min(1).default(1),
  concurrency: z.number().min(1).default(10),
  host: z.string().default("localhost"),
  port: z.number().min(1).default(80),
  http_path: z.string().default("/"),
  headers: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  healthy: z.object({
    interval: z.number().min(1).default(1),
    successes: z.number().min(1).default(2),
    http_statuses: z.array(z.number()).default([200, 201, 202, 204]),
  }),
  unhealthy: z.object({
    timeouts: z.number().min(1).default(3),
    interval: z.number().min(1).default(1),
    http_statuses: z
      .array(z.number())
      .default([429, 404, 500, 501, 502, 503, 504, 505]),
    http_failures: z.number().min(1).default(5),
    tcp_failures: z.number().min(1).default(2),
  }),
  enabled: z.boolean().default(false),
});

export type HealthCheckType = z.infer<typeof healthCheckSchema>;

export const UpstreamSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  description: z.string().min(1).default("").optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  algorithm: z.enum(["roundrobin", "leastconn", "random"]),
  nodes: z.array(nodes),
  retries: z.number().min(1).default(3),
  scheme: z.enum(["http", "https", "tcp", "udp", "grpc", "grpcs", "kafka"]),
  send_timeout: z.number().min(1).default(6),
  read_timeout: z.number().min(1).default(6),
  connect_timeout: z.number().min(1).default(6),
  keepalive: z.number().min(1).default(320),
  keepalive_requests: z.number().min(1).default(1024),
  keepalive_timeout: z.number().min(1).default(60),
  health_check: healthCheckSchema,
});

export type UpstreamType = z.infer<typeof UpstreamSchema>;

export const initialUpstreamForm: UpstreamType = {
  name: "",
  url: "",
  description: "",
  created_at: "",
  updated_at: "",
  algorithm: "roundrobin",
  scheme: "http",
  retries: 3,
  send_timeout: 6,
  read_timeout: 6,
  connect_timeout: 6,
  keepalive: 320,
  keepalive_requests: 1024,
  keepalive_timeout: 60,
  nodes: [
    {
      host: "",
      weight: 1,
      port: 443,
    },
  ],
  health_check: {
    enabled: false,
    type: "http",
    timeout: 1,
    concurrency: 10,
    host: "localhost",
    port: 80,
    http_path: "/",
    headers: [],
    healthy: {
      interval: 1,
      successes: 2,
      http_statuses: [200, 201, 202, 204],
    },
    unhealthy: {
      timeouts: 3,
      interval: 1,
      http_statuses: [429, 404, 500, 501, 502, 503, 504, 505],
      http_failures: 5,
      tcp_failures: 2,
    },
  },
};
