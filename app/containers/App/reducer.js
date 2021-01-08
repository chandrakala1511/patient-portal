/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOAD_PATIENT_LIST_SUCCESS, LOAD_PATIENT_LIST, LOAD_PATIENT_LIST_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  patientData: {
    patientlist: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PATIENT_LIST:
        draft.loading = true;
        draft.error = false;
        draft.patientData.patientlist = false;
        break;

      case LOAD_PATIENT_LIST_SUCCESS:
        draft.patientData.patientlist = action.patientlist;
        draft.loading = false;
        draft.currentUser = action.patientname;
        break;

      case LOAD_PATIENT_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
