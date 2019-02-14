const ADD_LIST = 'ADD_LIST';

export default {
    ADD_LIST,
  };

  export const addWeather = (weather) => ({ type: ADD_LIST, weather });