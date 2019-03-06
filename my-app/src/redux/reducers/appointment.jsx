/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import actionAppointment from '../../actions/actionAppointment';
import { compare } from '../../services/serviceWorker';

const initialState = {
  event: {},
  time: 0,
  eventIndex: 0,
  events: [
    {
      title: 'a',
      description: '',
      type: {
        id: 0,
        dateIni: '2019-02-20T11:00:00',
        dateEnd: '2019-03-04T11:30:00',
        events: [],
        name: '',
      },
    },
  ],
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

const setDefaultEvent = (array, index) => {
  debugger;
  let object = {
    title: 'Hola',
    description: 'Hola',
  };

  if (index < array.length) {
    object = array[index];
  }
  return object;
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAppointment.SET_EVENT:
      return { ...state, event: action.event };
    case actionAppointment.SET_TIMER:
      return { ...state, time: action.time };
    case actionAppointment.SET_EVENTS:
      const myEvents = setDates(action.events);

      return { ...state, events: myEvents, event: setDefaultEvent(myEvents, state.eventIndex) };
    case actionAppointment.SET_INDEX:
      return { ...state, eventIndex: action.index };
    default:
      return state;
  }
};
export default appointmentReducer;
