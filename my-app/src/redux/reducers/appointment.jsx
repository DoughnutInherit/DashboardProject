/* eslint-disable no-param-reassign */
import actionAppointment from '../../actions/actionAppointment';
import { compare } from '../../services/serviceWorker';

const initialState = {
  event: {},
  time: '',
  events: [],
};

const setDates = (events) => {
  events.forEach(element => {
    const dateIniD = new Date(element.dateIni);
    const dateEndD = new Date(element.dateEnd);

    element.dateIni = dateIniD;
    element.dateEnd = dateEndD;
  });
  events.sort(compare);

  return events;
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAppointment.SET_EVENT:
      return { ...state, event: action.event };
    case actionAppointment.SET_TIME:
      return { ...state, time: action.time };
    case actionAppointment.SET_EVENTS:
      const myEvents = setDates(action.events);
      return { ...state, events: myEvents };
    default:
      return state;
  }
};
export default appointmentReducer;
