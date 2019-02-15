import actionAppointment from '../../actions/actionAppointment';

const initialState = {
  event: {},
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionAppointment.SET_EVENT:
    debugger;
      return { ...state, weather: action.event };
    default:
      return state;
  }
};
export default appointmentReducer;
