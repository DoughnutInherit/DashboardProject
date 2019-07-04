const ADD_LIST = 'ADD_LIST';
const SET_ACTUAL_DATE = 'SET_ACTUAL_DATE';

export default {
  ADD_LIST,
  SET_ACTUAL_DATE,
};

export const addWeather = (weather) => ({ type: ADD_LIST, weather });
export const setActualDate = (date) => ({ type: SET_ACTUAL_DATE, date });
