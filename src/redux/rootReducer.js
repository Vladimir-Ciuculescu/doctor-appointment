import { combineReducers } from "redux";
import userReducer from "./user/user";
import modalReducer from "./modal/modal";
import doctorReducer from "./doctor/doctor";

const rootReducer = combineReducers({
  userReducer: userReducer,
  modalReducer: modalReducer,
  doctorReducer: doctorReducer,
});

export default rootReducer;
