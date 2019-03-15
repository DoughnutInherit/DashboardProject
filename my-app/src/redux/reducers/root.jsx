import { combineReducers } from 'redux';
import Weather from './weather';
import appointment from './appointment';
import birthdayReducer from './birthdayReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  list: Weather,
  appointment,
  birthdayReducer,
  loginReducer,
});
