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
        entryDate: '2019-02-20T11:00:00',
        departureDate: '2019-03-04T11:30:00',
        events: [],
        name: '',
      },
    },
  ],
};

const setDates = (events) => {
  events.forEach(element => {
    const dateIniD = new Date(element.entryDate);
    const dateEndD = new Date(element.departureDate);

    element.entryDate = dateIniD;
    element.departureDate = dateEndD;
  });
  events.sort(compare);

  return events;
};

const setDefaultEvent = (array, index) => {
  let object = {
    title: 'Sin eventos para el dia de hoy',
    description: 'Sin eventos para el dia de hoy. ¡Que tengas un buen dia!',
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
