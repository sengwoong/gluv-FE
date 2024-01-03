// authContext.jsx
import React, { createContext, useReducer } from "react";

import LoginForm from "../components/Form/LoginForm";
import AlertForm from "../components/Form/AlertForm";
import NotifyForm from "../components/Form/NotifyForm";
import PasswordChangeForm from "../components/Form/PasswordChageForm.jsx";
import LoginRegisterForm from "../components/Form/LoginRegisterForm.jsx";
import AlertFormMain from  "../components/Form/AlertFormMain";
import ProfileForm from "../components/Form/ProfleForm.jsx";

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
    registerForm: LoginRegisterForm,
    alertForm: AlertForm,
    notifyForm: NotifyForm,
    alertFormMain: AlertFormMain,
    passwordChangeForm: PasswordChangeForm,
    profileForm: ProfileForm,
  };

  const renderForm = () => {
    const FormComponent = formConfig[state.selectedCategory];
    console.log("state.selectedCategory")
  console.log(state.selectedCategory)
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
