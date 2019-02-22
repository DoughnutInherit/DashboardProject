const SET_EVENT = 'SET_EVENT';
const SET_TIME = 'SET_TIME';
const SET_EVENTS = 'SET_EVENTS';

export default {
  SET_EVENT,
  SET_TIME,
  SET_EVENTS,

};

export const setEvent = (event) => ({ type: SET_EVENT, event });
export const setTime = (time) => ({ type: SET_TIME, time });
export const setEvents = (events) => ({ type: SET_EVENTS, events });
