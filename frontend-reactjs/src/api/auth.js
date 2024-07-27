import axios from "axios";
import API_FRONTEND from "./api.ts";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  const { API_URL_AUTH_REGISTER } = API_FRONTEND();
  return await axios.post(API_URL_AUTH_REGISTER, registrationData);
}

export async function onLogin(loginData) {
  const { API_URL_AUTH_LOGIN } = API_FRONTEND();
  return await axios.post(API_URL_AUTH_LOGIN, loginData);
}

export async function onLogout() {
  const { API_URL_AUTH_LOGOUT } = API_FRONTEND();
  return await axios.get(API_URL_AUTH_LOGOUT);
}

export async function fetchProtectedInfo() {
  const { API_URL_AUTH_PROTECTED } = API_FRONTEND();
  return await axios.get(API_URL_AUTH_PROTECTED);
}
