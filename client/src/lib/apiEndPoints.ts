import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api`;
export const REGISTER_URL = `${Env.BACKEND_URL}/auth/register`;
export const LOGIN_URL = `${Env.BACKEND_URL}/auth/login`;
export const CHECK_CERDENTIALS_URL = `${Env.BACKEND_URL}auth/check/credentials`;
export const FORGET_PASSWORD_URL= `${BASE_URL}/auth/forget-password`;
export const RESET_PASSWORD_URL= `${BASE_URL}/auth/reset-password`;
export const KALESH_URL = `${BASE_URL}/kalesh`;
export const KALESH_ITEMS_URL = `${BASE_URL}/kalesh/items`;