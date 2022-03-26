const TOGGLE_MODAL = "TOGGLE_MODAL";
const TOGGLE_BOOKING_MODAL = "TOGGLE_BOOKING_MODAL";
const TOGGLE_SIGN_OUT_MODAL = "TOGGLE_SIGN_OUT_MODAL";

//Actions
export const toggleModal = (toggle) => ({
  type: TOGGLE_MODAL,
  payload: toggle,
});

export const toggleBookingModal = (toggle) => ({
  type: TOGGLE_BOOKING_MODAL,
  payload: toggle,
});

export const toggleSignOutModal = (toggle) => ({
  type: TOGGLE_SIGN_OUT_MODAL,
  payload: toggle,
});

//Action type
const INITIAL_STATE = {
  hidden: true,
  bookingModal: false,
  signOutModal: false,
};

//Reducer
const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, hidden: action.payload };
    case TOGGLE_BOOKING_MODAL:
      return { ...state, bookingModal: action.payload };
    case TOGGLE_SIGN_OUT_MODAL:
      return { ...state, signOutModal: action.payload };
    default:
      return state;
  }
};

export default modalReducer;
