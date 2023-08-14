"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_PORT = exports.JWT_SALT = exports.JWT_SECRET = exports.POSTGRES_DB = exports.POSTGRES_PASSWORD = exports.POSTGRES_USER = void 0;
exports.POSTGRES_USER = process.env.POSTGRES_USER ?? '';
exports.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '';
exports.POSTGRES_DB = process.env.POSTGRES_DB ?? '';
exports.JWT_SECRET = process.env.JWT_SECRET ?? '';
exports.JWT_SALT = +(process.env.JWT_SALT ?? '10');
exports.API_PORT = process.env.API_PORT ?? 8080;
