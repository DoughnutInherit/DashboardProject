import { combineReducers } from 'redux';
import Weather from './weather';
import appointment from './appointment';
import birthdayReducer from './birthdayReducer';

export default combineReducers({
  list: Weather,
  appointment,
  birthdayReducer,
});
