import actionWeather from '../../actions/action';

const initialState = {
  weather: {},
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionWeather.ADD_LIST:
      return { ...state, weather: action.weather };
    default:
      return state;
  }
};
export default weatherReducer;
