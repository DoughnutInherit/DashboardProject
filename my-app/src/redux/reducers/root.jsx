import { combineReducers } from 'redux';
import Weather from './weather';
import appointment from './appointment';

export default combineReducers({
  list: Weather,
  appointment,
});
