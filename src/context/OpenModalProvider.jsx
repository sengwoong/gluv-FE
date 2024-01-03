// authContext.jsx
import React, { createContext, useReducer } from "react";

import LoginForm from "../components/Login/LoginForm";
import AlertForm from "../components/Login/AlertForm";
import NotifyForm from "../components/Login/NotifyForm";
import PasswordChangeForm from "../components/Login/PasswordChageForm.jsx";
import LoginRegister from "../components/Login/LoginRegister.jsx";
import AlertFormMain from  "../components/Login/AlertFormMain";
import ProfleForm from "../components/Login/ProfleForm.jsx";

// Actions
const OPEN_FORM = "OPEN_FORM";
const CLOSE_FORM = "CLOSE_FORM";

const reducer = (state, action) => {
  switch (action.type) {
    case OPEN_FORM:
      return { ...state, selectedCategory: action.payload };
    case CLOSE_FORM:
      return { ...state, selectedCategory: null };
    default:
      return state;
  }
};

export const OpenModalContext = createContext();

export const OpenModalProvider = ({ children }) => {
  const initialState = { selectedCategory: null }; // Set the initial state to null
  const [state, dispatch] = useReducer(reducer, initialState);

  const openForm = (category) => {
    dispatch({ type: OPEN_FORM, payload: category });
  };

  const closeForm = () => {
    dispatch({ type: CLOSE_FORM });
  };


  const formConfig = {
    loginForm: LoginForm,
    registerForm: LoginRegister,
    alertForm: AlertForm,
    notifyForm: NotifyForm,
    alertFormMain: AlertFormMain,
    passwordChangeForm: PasswordChangeForm,
    profileForm: ProfleForm,
  };
  
  const renderForm = () => {
    const FormComponent = formConfig[state.selectedCategory];
  
    if (FormComponent) {
      return <FormComponent onClose={closeForm} />;
    } else {
      return null;
    }
  };

  return (
    <OpenModalContext.Provider value={{ openForm, closeForm }}>
      {renderForm()}
      {children}
    </OpenModalContext.Provider>
  );
};
