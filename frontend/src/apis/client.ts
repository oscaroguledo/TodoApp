import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from './config';

// Create axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and auth
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (API_CONFIG.ENABLE_LOGGING) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (API_CONFIG.ENABLE_LOGGING) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          console.error('🔒 Unauthorized - Please login again');
          // Clear invalid token
          localStorage.removeItem('authToken');
          break;
        case HTTP_STATUS.FORBIDDEN:
          console.error('🚫 Forbidden - Insufficient permissions');
          break;
        case HTTP_STATUS.NOT_FOUND:
          console.error('🔍 Not Found - Resource does not exist');
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          console.error('💥 Server Error - Please try again later');
          break;
        default:
          console.error(`❌ API Error ${status}:`, data.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error
      console.error('🌐 Network Error - Unable to connect to server');
    } else {
      // Other error
      console.error('❌ Unknown Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Generic API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Error handling utility
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Utility function to handle API errors
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      error.response.data?.message || ERROR_MESSAGES.SERVER_ERROR,
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    return new ApiError(ERROR_MESSAGES.NETWORK_ERROR);
  } else {
    return new ApiError(error.message || ERROR_MESSAGES.UNKNOWN_ERROR);
  }
};
