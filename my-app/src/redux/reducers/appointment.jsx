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
      title: '',
      description: '',
      entryDate: '',
      departureDate: '',
      typeId: 1,
      id: 21,
    },
  ],
  selectedEvent: {
    allday: false,
    date: '',
    departureDate: '',
    description: '',
    endHour: '',
    entryDate: '',
    id: 0,
    iniHour: '',
    isEditMode: false,
    title: '',
    typeId: 0,
  },
  isEditionMode: false,
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

const setDefaultEvent = (array, index, allDayEvent) => {
  let object = {
    title: 'Sin eventos para el dia de hoy',
    description: 'Sin eventos para el dia de hoy. ¡Que tengas un buen dia!',
  };

  if (index < array.length && array.length > 0) {
    object = array[index];
  } else if (allDayEvent.description !== undefined && array.length > 0) {
    object = array[0];
  } else {
    object = {
      title: 'Sin eventos para el dia de hoy',
      description: 'Sin eventos para el dia de hoy. ¡Que tengas un buen dia!',
    };
  }
  return object;
};

const deleteEvent = (stateList, event) => stateList.filter(x => x.id !== event.id);

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAppointment.SET_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case actionAppointment.SET_TIMER:
      return { ...state, time: action.time };
    case actionAppointment.SET_EVENTS:
      const myEvents = setDates(action.events);
      checkAllDayEvent(myEvents);
      return {
        ...state,
        events: myEvents,
        event: setDefaultEvent(myEvents, state.eventIndex, state.allDayEvent),
        allDayEvent: checkAllDayEvent(myEvents),
        selectedEvent: initialState.selectedEvent,
        isEditionMode: false,
      };
    case actionAppointment.SET_INDEX:
      return { ...state, eventIndex: action.index };
    case actionAppointment.SET_ACTION_TIME:
      return { ...state, actionTime: action.time };
    case actionAppointment.SET_EDITIONEVENT:
      return { ...state, selectedEvent: action.event, isEditionMode: action.isEditing };
    case actionAppointment.DELETE_EVENT:
      return {
        ...state,
        events: deleteEvent(state.events, action.event),
        selectedEvent: initialState.selectedEvent,
        isEditionMode: false,
      };
    case actionAppointment.REFRESHEVENTS:
      return { ...state, events: [...action.eventsList] };
    case actionAppointment.RESET_EDITIONMODE:
      return {
        ...state,
        selectedEvent: initialState.selectedEvent,
        isEditionMode: false,
        events: state.events.map(event => Object.assign(event, { isEditMode: false })),
      };
    default:
      return state;
  }
};
export default appointmentReducer;
