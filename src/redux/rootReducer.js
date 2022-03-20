import { combineReducers } from "redux";
import userReducer from "./user/user";
import modalReducer from "./modal/modal";

const rootReducer = combineReducers({
  userReducer: userReducer,
  modalReducer: modalReducer,
});

export default rootReducer;
