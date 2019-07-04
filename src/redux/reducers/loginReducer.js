import actionLogin from '../../actions/actionLogin';

const initialState = {
  email: '',
  password: '',
  bearerToken: 'aaa',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionLogin.SET_EMAIL:
      return { ...state, email: action.email };
    case actionLogin.SET_PASSWORD:
      return { ...state, password: action.password };
    case actionLogin.SET_BEARER_TOKEN:
      return { ...state, bearerToken: action.token };
    default:
      return state;
  }
};

export default loginReducer;
