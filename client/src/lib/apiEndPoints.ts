import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const REGISTER_URL = `http://localhost:8000/api/auth/register`;
export const LOGIN_URL = `http://localhost:8000/api/auth/login`;
export const CHECK_CERDENTIALS_URL = `http://localhost:8000/api/auth/check/credentials`;
export const FORGET_PASSWORD_URL= `${BASE_URL}/auth/forget-password`;
export const RESET_PASSWORD_URL= `${BASE_URL}/auth/reset-password`;