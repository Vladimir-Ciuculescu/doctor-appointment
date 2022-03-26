const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_EMAIL = "SET_EMAIL";
const SET_USER_TYPE = "SET_USER_TYPE";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: userType,
});

const INITIAL_STATE = {
  user: null,
  userType: null,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_TYPE:
      return { ...state, userType: action.payload };
    case REMOVE_USER:
      return { ...state, user: null, userType: null };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

export default userReducer;
