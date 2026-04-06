# Environment Variables

This application uses environment variables for configuration. The `.env` file is located in the project root directory.

## Required Variables

### `REACT_APP_API_URL`
The base URL for the API backend server.

**Example:**
```bash
REACT_APP_API_URL=http://localhost:3000
```

**Production Example:**
```bash
REACT_APP_API_URL=https://api.yourapp.com
```

## Optional Variables

### `REACT_APP_ENABLE_API_LOGGING`
Enable/disable API request/response logging in the console.

**Default:** `true` in development, `false` in production

**Example:**
```bash
REACT_APP_ENABLE_API_LOGGING=true
```

### `REACT_APP_API_TIMEOUT`
API request timeout in milliseconds.

**Default:** `10000` (10 seconds)

**Example:**
```bash
REACT_APP_API_TIMEOUT=15000
```

### `REACT_APP_ENABLE_RETRY`
Enable/disable automatic retry for failed API requests.

**Default:** `true`

**Example:**
```bash
REACT_APP_ENABLE_RETRY=true
```

### `REACT_APP_RETRY_ATTEMPTS`
Number of retry attempts for failed API requests.

**Default:** `3`

**Example:**
```bash
REACT_APP_RETRY_ATTEMPTS=5
```

## Setup Instructions

1. **For Local Development:**
   The `.env` file is already configured in the project root.
   
2. **For Production:**
   Set the environment variables in your hosting platform (Vercel, Netlify, etc.).

## Notes

- All environment variables must be prefixed with `REACT_APP_` to be accessible in the React app.
- The `.env` file is committed to version control since it contains no sensitive data.
- Use different values for development, staging, and production environments.
- No authentication is required for this application.
