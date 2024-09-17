import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const REGISTER_URL = `http://localhost:8000/api/auth/register`;
export const LOGIN_URL = `http://localhost:8000/api/auth/login`;
export const CHECK_CERDENTIALS_URL = `http://localhost:8000/api/auth/check/credentials`;