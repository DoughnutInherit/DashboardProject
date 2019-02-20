import actionAppointment from '../../actions/actionAppointment';

const initialState = {
  event: {},
  time: '',
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAppointment.SET_EVENT:
      return { ...state, event: action.event };
    case actionAppointment.SET_TIME:
      return { ...state, time: action.time };
    default:
      return state;
  }
};
export default appointmentReducer;
