const SET_EVENT = 'SET_EVENT';

export default {
  SET_EVENT,
};

export const setEvent = (event) => ({ type: SET_EVENT, event });
