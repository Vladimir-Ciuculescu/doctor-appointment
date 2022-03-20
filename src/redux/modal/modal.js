const TOGGLE_MODAL = "TOGGLE_MODAL";

//Action
export const toggleModal = (toggle) => ({
  type: TOGGLE_MODAL,
  payload: toggle,
});

//Action type
const INITIAL_STATE = {
  hidden: true,
};

//Reducer
const modalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, hidden: action.payload };

    default:
      return state;
  }
};

export default modalReducer;
