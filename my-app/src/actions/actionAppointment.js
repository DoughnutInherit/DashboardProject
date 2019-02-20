const SET_EVENT = 'SET_EVENT';
const SET_TIME = 'SET_TIME';

export default {
  SET_EVENT,
  SET_TIME,
};

export const setEvent = (event) => ({ type: SET_EVENT, event });
export const setTime = (time) => ({ type: SET_TIME, time });
