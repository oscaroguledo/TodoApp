// API Configuration
export const API_CONFIG = {
  // Base URL for API calls
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Cache settings (in milliseconds)
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  
  // Feature flags
  ENABLE_CACHING: false,
  ENABLE_RETRY: true,
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
};

// API Endpoints
export const API_ENDPOINTS = {
  TODOS: '/todos',
  AUTH: '/auth',
  USERS: '/users',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error - Unable to connect to server',
  TIMEOUT_ERROR: 'Request timed out - Please try again',
  UNAUTHORIZED: 'Unauthorized - Please login again',
  FORBIDDEN: 'Forbidden - Insufficient permissions',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error - Please try again later',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;
