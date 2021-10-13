export interface FnGData {
  time_until_update: string
  timestamp: string
  value: string
  value_classification: string
}

export interface FnGIndexResponse {
  data: FnGData[]
  metadata: {
    error: boolean
  }
  name: string
}

export interface FnGIndex {
  timestamp: string
  value: number
  value_classification: string
}
