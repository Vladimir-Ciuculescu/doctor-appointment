import { combineReducers } from "redux";

const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

const INITIAL_STATE = {
  user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
      break;
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

const userApp = combineReducers({
  userReducer,
});

export default userApp;
