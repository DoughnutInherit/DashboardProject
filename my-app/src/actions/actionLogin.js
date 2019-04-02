const SET_EMAIL = 'SET_EMAIL';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_BEARER_TOKEN = 'SET_BEARER_TOKEN';

export default {
  SET_EMAIL,
  SET_PASSWORD,
  SET_BEARER_TOKEN,
};

export const setEmailValue = (email) => ({ type: SET_EMAIL, email });
export const setPasswordValue = (password) => ({ type: SET_PASSWORD, password });
export const setAuthToken = (token) => ({ type: SET_BEARER_TOKEN, token });
