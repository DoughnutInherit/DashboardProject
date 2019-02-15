import actionWeather from '../../actions/actionWeather';

const initialState = {
  weather: {},
  date: '',
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionWeather.ADD_LIST:
      return { ...state, weather: action.weather };
    case actionWeather.SET_ACTUAL_DATE:
      return { ...state, date: action.date };
    default:
      return state;
  }
};
export default weatherReducer;
