import { configureStore } from "@reduxjs/toolkit";
import trackReduser from "./slices/track"
import  userReducer  from "./slices/user";

export default configureStore  ({
  reducer: {
    track: trackReduser,
    user: userReducer,
    
  }
})