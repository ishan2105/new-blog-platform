// Environment configuration
export const config = {
  app: {
    name: 'User CRUD Application',
    version: '1.0.0',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
  database: {
    provider: process.env.DATABASE_PROVIDER || 'mongodb',
  },
}
