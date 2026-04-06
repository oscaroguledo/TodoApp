// API Configuration
export const API_CONFIG = {
  // Base URL for API calls - from environment variable
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
};

// API Endpoints
export const API_ENDPOINTS = {
  TODOS: '/todos',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error - Unable to connect to server',
  TIMEOUT_ERROR: 'Request timed out - Please try again',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error - Please try again later',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;
