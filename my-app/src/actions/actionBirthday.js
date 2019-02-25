const SET_BIRTHDAY_LIST = 'SET_BIRTHDAY_LIST';

export default {
  SET_BIRTHDAY_LIST,
};

export const setBirthdayList = (birthdayList) => ({ type: SET_BIRTHDAY_LIST, birthdayList });
