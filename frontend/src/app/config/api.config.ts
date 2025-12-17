export const API_CONFIG = {
  baseUrl: 'http://localhost:3000/api',
  endpoints: {
    auth: {
      signup: '/auth/signup',
      signin: '/auth/signin',
    },
    users: {
      base: '/users',
      byId: (id: string) => `/users/${id}`,
      projects: (userId: string) => `/users/${userId}/projects`,
    },
  },
} as const;

export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.baseUrl}${endpoint}`;
}

