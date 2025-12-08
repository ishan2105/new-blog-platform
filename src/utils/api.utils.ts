// Utility functions for API responses and error handling

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

// Successful response
export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  }
}

// Error response
export function errorResponse(error: string): ApiResponse<null> {
  return {
    success: false,
    error,
    timestamp: new Date().toISOString(),
  }
}

// Input sanitization
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Generate timestamp
export function getTimestamp(): string {
  return new Date().toISOString()
}
