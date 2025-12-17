export const ROUTES = {
  api: {
    base: '/api',
    auth: {
      base: '/api/auth',
      signup: '/api/auth/signup',
      signin: '/api/auth/signin',
    },
    users: {
      base: '/api/users',
    },
  },
} as const;

