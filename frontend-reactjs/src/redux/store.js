import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userLoginReducer } from '../reducers/user';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
 
  // userUpdate: userUpdateReducer,
  auth: authSlice,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// const middleware = [thunk];

export const store = configureStore({
  reducer,
  initialState,
})