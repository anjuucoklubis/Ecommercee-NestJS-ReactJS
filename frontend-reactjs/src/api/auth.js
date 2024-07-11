import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  return await axios.post(
    "http://localhost:3000/auth/signup",
    registrationData
  );
}

export async function onLogin(loginData) {
  return await axios.post("http://localhost:3000/auth/signin", loginData);
}

export async function onLogout() {
  return await axios.get("http://localhost:3000/auth/signout");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:3000/auth/protected");
}
