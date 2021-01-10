/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_PATIENT_LIST_SUCCESS,
  LOAD_PATIENT_LIST,
  LOAD_PATIENT_LIST_ERROR,
  SAVE_PATIENT_DETAILS,
  SAVE_PATIENT_DETAILS_SUCCESS,
  SAVE_PATIENT_DETAILS_ERROR,
  LOAD_SCAN_LIST,
  LOAD_SCAN_LIST_SUCCESS,
  LOAD_SCAN_LIST_ERROR,
  LOAD_PAYMENT_LIST,
  LOAD_PAYMENT_LIST_SUCCESS,
  LOAD_PAYMENT_LIST_ERROR,
  SAVE_PAYMENT_DETAILS,
  SAVE_PAYMENT_DETAILS_SUCCESS,
  SAVE_PAYMENT_DETAILS_ERROR
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  medicalData: [],
  scanData: [],
  paymentData: []
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PATIENT_LIST:
      return { ...state };
    case LOAD_PATIENT_LIST_SUCCESS:
      const medicalData = action.data.data;
      return { ...state, medicalData: medicalData };
    case LOAD_PATIENT_LIST_ERROR:
      return { ...state };
    case SAVE_PATIENT_DETAILS:
      return { ...state };
    case SAVE_PATIENT_DETAILS_SUCCESS:
      const savePatientData = action.data.data;
      return { ...state, savePatientData: savePatientData };
    case SAVE_PATIENT_DETAILS_ERROR:
      return { ...state };
    case LOAD_SCAN_LIST:
      return { ...state };
    case LOAD_SCAN_LIST_SUCCESS:
      const scanData = action.data.data;
      return { ...state, scanData: scanData };
    case LOAD_SCAN_LIST_ERROR:
      return { ...state };
    case LOAD_PAYMENT_LIST:
      return { ...state };
    case LOAD_PAYMENT_LIST_SUCCESS:
      const paymentData = action.data.data;
      return { ...state, paymentData: paymentData };
    case LOAD_PAYMENT_LIST_ERROR:
      return { ...state };
    case SAVE_PATIENT_DETAILS:
      return { ...state };
    case SAVE_PATIENT_DETAILS_SUCCESS:
      const savePaymentData = action.data.data;
      return { ...state, savePaymentData: savePaymentData };
    case SAVE_PATIENT_DETAILS_ERROR:
      return { ...state };
    default:
      return state;
  }
};

export default appReducer;
