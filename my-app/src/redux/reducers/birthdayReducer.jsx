import actionBirthday from '../../actions/actionBirthday';

const initialState = {
  birthdayList: [],
};

const birthdayReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionBirthday.SET_BIRTHDAY_LIST:
      debugger;
      return { ...state, birthdayList: action.birthdayList };
    default:
      return state;
  }
};
export default birthdayReducer;
