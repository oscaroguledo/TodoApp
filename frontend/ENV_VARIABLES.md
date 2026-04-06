# Environment Variables

This application uses environment variables for configuration. Copy `.env.example` to `.env.local` for local development.

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

### `REACT_APP_AUTH_TOKEN`
JWT authentication token (for development/testing only).

**Default:** `undefined`

**Example:**
```bash
REACT_APP_AUTH_TOKEN=your-jwt-token-here
```

## Setup Instructions

1. **For Local Development:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your local configuration.

2. **For Production:**
   Set the environment variables in your hosting platform (Vercel, Netlify, etc.).

## Environment Variable Priority

1. `.env.local` (highest priority)
2. `.env.development` (for development)
3. `.env.production` (for production)
4. `.env` (default)
5. System environment variables (lowest priority)

## Notes

- All environment variables must be prefixed with `REACT_APP_` to be accessible in the React app.
- The `.env` files are ignored by Git to prevent sensitive data from being committed.
- Never commit actual API keys or tokens to version control.
- Use different values for development, staging, and production environments.
