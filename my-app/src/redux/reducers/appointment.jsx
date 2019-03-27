/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import moment from 'moment';
import actionAppointment from '../../actions/actionAppointment';
import { compare } from '../../services/serviceWorker';


const initialState = {
  event: {},
  allDayEvent: {},
  time: 0,
  eventIndex: 0,
  actionTime: 0,
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

const checkAllDayEvent = (events) => {
  let eventSelected = {};
  events.forEach(element => {
    const dateIniD = new Date(element.entryDate);
    const dateEndD = new Date(element.departureDate);

    const dateIniMom = moment(dateIniD).format('HH:mm:ss');
    const dateEndMom = moment(dateEndD).format('HH:mm:ss');
    if (dateIniMom === '08:00:00' && dateEndMom === '20:00:00') {
      eventSelected = element;
    }
  });
  return eventSelected;
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
      checkAllDayEvent(myEvents);
      return {
        ...state,
        events: myEvents,
        event: setDefaultEvent(myEvents, state.eventIndex),
        allDayEvent: checkAllDayEvent(myEvents),
      };
    case actionAppointment.SET_INDEX:
      return { ...state, eventIndex: action.index };
    case actionAppointment.SET_ACTION_TIME:
      return { ...state, actionTime: action.time };
    default:
      return state;
  }
};
export default appointmentReducer;
