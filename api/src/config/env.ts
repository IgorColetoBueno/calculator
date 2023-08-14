export const POSTGRES_USER = process.env.POSTGRES_USER ?? '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '';
export const POSTGRES_DB = process.env.POSTGRES_DB ?? '';
export const JWT_SECRET = process.env.JWT_SECRET ?? '';
export const JWT_SALT = +(process.env.JWT_SALT ?? '10');
export const API_PORT = process.env.API_PORT ?? 8080;
