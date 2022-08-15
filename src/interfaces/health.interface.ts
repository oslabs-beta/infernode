
// Basic health check with a name, status, and optional list of subchecks
interface HealthCheckResponse {
  name: string;
  status: string;
  checks?: HealthCheckResponse[];
}

// Health check with data specific to a started process
interface StartedCheckResponse extends HealthCheckResponse {
  data: {
    started_on: number,
    uptime: number,
    pid: number,
    proc_arguments: string[],
    node_arguments: string[],
    total_cpu_usage: NodeJS.CpuUsage,
    curr_mem_usage: NodeJS.MemoryUsage,
  }
}

// Health check with data specific to a live server
interface LivelinessCheckResponse extends HealthCheckResponse {
  data: {
    api_self_check?: string,
  }
}

// Health check with data specific to a ready server
interface ReadinessCheckResponse extends HealthCheckResponse {
  data: {
    db_connected?: boolean,
    db_version?: string,
  }
}

export {HealthCheckResponse, StartedCheckResponse, LivelinessCheckResponse, ReadinessCheckResponse};