import React from "react";
import { useReducer } from "react";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

const initialState = {
  logged: false,
};

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user,
  };
};
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = (name = "") => {
    const action = {
      type: types.login,
      payload: {
        id: "ABC",
        name,
      },
    };

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: "ABC",
        name,
      })
    );

    dispatch(action);
  };


  const logout = () =>{
    localStorage.removeItem('user');
    const action = {type: types.logout}
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
