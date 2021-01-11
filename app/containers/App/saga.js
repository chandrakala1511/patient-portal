import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  LOAD_PATIENT_LIST,
  SAVE_PATIENT_DETAILS,
  LOAD_SCAN_LIST,
  LOAD_PAYMENT_LIST,
  SAVE_PAYMENT_DETAILS
} from 'containers/App/constants';
import {
  patientListLoadingSuccess,
  patientListLoadingError,
  savePatientDetailsSuccess,
  savePatientDetailsError,
  scanListLoadingSuccess,
  scanListLoadingError,
  paymentListLoadingSuccess, 
  paymentListLoadingError,
  savePaymentDetailsSuccess,
  savePaymentDetailsError
} from 'containers/App/actions';
import request from 'utils/request';

/**
 * Patient list request/response handler
 */
export function* loadPatientListCall() {
  const requestURL = `http://localhost:3001/patients`;

  try {
    // Call our request helper (see 'utils/request')
    const medicaldata = yield call(request, 'GET', requestURL);
    yield put(patientListLoadingSuccess(medicaldata));
  } catch (err) {
    yield put(patientListLoadingError(err));
  }
}

/**
 * Save patient details request/response handler
 */
export function* savePatientDetailsCall(details) {
  const requestURL = `http://localhost:3001/patients`;

  try {
    // Call our request helper (see 'utils/request')
    const savepatientdata = yield call(request, 'POST', requestURL, details.data);
    yield put(savePatientDetailsSuccess(savepatientdata));
  } catch (err) {
    yield put(savePatientDetailsError(err));
  }
}

/**
 * Scan list request/response handler
 */
export function* loadScanListCall() {

  const requestURL = `http://localhost:3001/tests`;

  try {
    // Call our request helper (see 'utils/request')
    const scandata = yield call(request, 'GET', requestURL);
    yield put(scanListLoadingSuccess(scandata));
  } catch (err) {
    yield put(scanListLoadingError(err));
  }
}

/**
 * Payment list request/response handler
 */
export function* loadPaymentListCall(details) {
  const requestURL = `http://localhost:3001/paymenthistory`;

  try {
    // Call our request helper (see 'utils/request')
    const paymentdata = yield call(request, 'GET', requestURL);
    yield put(paymentListLoadingSuccess(paymentdata));
  } catch (err) {
    yield put(paymentListLoadingError(err));
  }
}

/**
 * Save payment details request/response handler
 */
export function* savePaymentDetailsCall(details) {
  const requestURL = `http://localhost:3001/paymenthistory`;

  try {
    // Call our request helper (see 'utils/request')
    const savepatientdata = yield call(request, 'POST', requestURL, details.data);
    yield put(savePaymentDetailsSuccess(savepatientdata));
  } catch (err) {
    yield put(savePaymentDetailsError(err));
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
  yield takeLatest(LOAD_PATIENT_LIST, loadPatientListCall);
  yield takeLatest(SAVE_PATIENT_DETAILS, savePatientDetailsCall);
  yield takeLatest(LOAD_SCAN_LIST, loadScanListCall);
  yield takeLatest(LOAD_PAYMENT_LIST, loadPaymentListCall);
  yield takeLatest(SAVE_PAYMENT_DETAILS, savePaymentDetailsCall);
}
