const SET_TIMER = 'SET_TIMER';
const SET_EVENTS = 'SET_EVENTS';
const SET_INDEX = 'SET_INDEX';
const SET_EVENT = 'SET_EVENT';

export default {
  SET_TIMER,
  SET_EVENTS,
  SET_INDEX,
  SET_EVENT,
};

export const setIndex = (index) => ({ type: SET_INDEX, index });
export const setTimer = (time) => ({ type: SET_TIMER, time });
export const setEvents = (events) => ({ type: SET_EVENTS, events });
export const setEvent = (event) => ({ type: SET_EVENT, event });
