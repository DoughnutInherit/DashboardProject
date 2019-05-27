import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Weather from './weather';
import appointment from './appointment';
import birthdayReducer from './birthdayReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  list: Weather,
  appointment,
  birthdayReducer,
  form: formReducer,
  loginReducer,
});
