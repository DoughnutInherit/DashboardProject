import { combineReducers } from 'redux';
import Weather from './weather';

export default combineReducers({
  list: Weather,
});
