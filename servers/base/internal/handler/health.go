package handler

import (
	"encoding/json"
	"net/http"
	"runtime"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
)

type HealthResponse struct {
	Status      string      `json:"status"`
	Version     string      `json:"version"`
	Uptime      float64     `json:"uptime"`
	Timestamp   time.Time   `json:"timestamp"`
	SystemInfo  SystemInfo  `json:"system_info"`
	RuntimeInfo RuntimeInfo `json:"runtime_info"`
}

type SystemInfo struct {
	CPUUsage    float64 `json:"cpu_usage"`
	MemoryUsage float64 `json:"memory_usage"`
	TotalMemory uint64  `json:"total_memory"`
	FreeMemory  uint64  `json:"free_memory"`
}

type RuntimeInfo struct {
	GoVersion    string `json:"go_version"`
	NumCPU       int    `json:"num_cpu"`
	NumGoroutine int    `json:"num_goroutine"`
	NumCgoCall   int64  `json:"num_cgo_call"`
	NumGC        uint32 `json:"num_gc"`
}

var startTime = time.Now()

// HealthCheck handles health check requests
func (h *Handler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	// Get CPU usage
	cpuPercent, err := cpu.Percent(time.Second, false)
	if err != nil {
		cpuPercent = []float64{0}
	}

	// Get memory info
	memInfo, err := mem.VirtualMemory()
	if err != nil {
		memInfo = &mem.VirtualMemoryStat{}
	}

	// Get runtime stats
	var m runtime.MemStats
	runtime.ReadMemStats(&m)

	response := HealthResponse{
		Status:    "healthy",
		Version:   "1.0.0",
		Uptime:    time.Since(startTime).Seconds(),
		Timestamp: time.Now(),
		SystemInfo: SystemInfo{
			CPUUsage:    cpuPercent[0],
			MemoryUsage: memInfo.UsedPercent,
			TotalMemory: memInfo.Total,
			FreeMemory:  memInfo.Free,
		},
		RuntimeInfo: RuntimeInfo{
			GoVersion:    runtime.Version(),
			NumCPU:       runtime.NumCPU(),
			NumGoroutine: runtime.NumGoroutine(),
			NumCgoCall:   runtime.NumCgoCall(),
			NumGC:        m.NumGC,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
