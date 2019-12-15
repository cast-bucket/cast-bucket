import { IUser } from "@cast-bucket/core";
import { memoDelete, memoGet, memoSet } from "./memoize";
// import ApiClient from "@cast-bucket/core/src/api/client";

const MOCK_TOKEN = "c67a39515eddcad7f84d4a9ee53d7fff";
const localStorageKey = "__user__token__";

// !NOTE: This function is used for development purposes, and doesn't represent an actual user.
function getMockUser() {
  const mockUser = {
    username: "dummy",
    firstName: "Dummy",
    lastName: "User",
    email: "dummy.user@cast-bucket.com"
  };
  return Promise.resolve(mockUser);
}

async function handleUserResponse(user) {
  await memoSet(localStorageKey, MOCK_TOKEN);
  return user;
}

export const getUser = async () => {
  const token = await getToken();
  if (!token) {
    return Promise.resolve(null);
  } else {
    return getMockUser();
  }
};

function login({ username, token }: IUser) {
  // TODO: Add user login flow
  return getMockUser().then(handleUserResponse);
}

function register({ username }) {
  // TODO: Add user registration
  return getMockUser().then(handleUserResponse);
}

async function logout() {
  await memoDelete(localStorageKey);
  return Promise.resolve();
}

async function getToken() {
  return await memoGet(localStorageKey);
}

export const AuthClient = { login, register, logout, getToken };
