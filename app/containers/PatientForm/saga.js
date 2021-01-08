import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT_LIST } from 'containers/App/constants';
import { patientListLoadingSuccess, patientListLoadingError } from 'containers/App/actions';
import request from 'utils/request';

/**
 * Patient list request/response handler
 */
export function* loadPatientList() {
  const requestURL = `http://localhost:3001/patients`;
  //const requestURL = `https://jsonplaceholder.typicode.com/todos/1`;
  
  try {
    // Call our request helper (see 'utils/request')
    const patientlist = yield call(request, 'GET', requestURL);
    yield put(patientListLoadingSuccess(patientlist));
  } catch (err) {
    yield put(patientListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* patientData() {
  // Watches for LOAD_PATIENT_LIST actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PATIENT_LIST, loadPatientList);
}
