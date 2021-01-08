/**
 * Gets the patient list
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT_LIST } from 'containers/App/constants';
import { patientListLoadingSuccess, patientListLoadingError } from 'containers/App/actions';

import request from 'utils/request';

/**
 * Patient list request/response handler
 */
export function* getPatientList() {
  const requestURL = `http://localhost:3001/patients`;

  try {
    // Call our request helper (see 'utils/request')
    const patientlist = yield call(request, requestURL);
    yield put(patientListLoadingSuccess(patientlist));
  } catch (err) {
    yield put(patientListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* patientData() {
  // Watches for LOAD_PATIENT_LIST actions and calls getPatientList when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PATIENT_LIST, getPatientList);
}
