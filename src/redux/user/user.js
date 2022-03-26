const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";
const SET_EMAIL = "SET_EMAIL";

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

const INITIAL_STATE = {
  user: null,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

// const userApp = combineReducers({
//   userReducer,
// });

// export default userApp;

export default userReducer;
