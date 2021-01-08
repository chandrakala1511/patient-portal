import produce from 'immer';
import { PATIENT_NAME } from './constants';

// The initial state of the App
export const initialState = {
  patientname: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PATIENT_NAME:
        draft.patientname = action.patientname.replace(/@/gi, '');
        break;
    }
  });

export default homeReducer;
