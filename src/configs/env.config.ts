export default () => ({
  nodeEnv: process.env.NODE_ENV || "development",
  api: {
    port: Number(process.env.API_PORT) || 3344,
    host: process.env.API_HOST || 'localhost',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
});
