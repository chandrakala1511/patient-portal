import {
  LOAD_PATIENT_LIST,
  LOAD_PATIENT_LIST_SUCCESS,
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

/**
 * Load the patient list, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PATIENT_LIST
 */
export function loadPatientList() {
  return {
    type: LOAD_PATIENT_LIST,
  };
}

/**
 * Dispatched when the patient list are loaded by the request saga
 *
 *
 * @return {object}      An action object with a type of LOAD_PATIENT_LIST_SUCCESS passing the patients list
 */
export function patientListLoadingSuccess(data) {
  return {
    type: LOAD_PATIENT_LIST_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the patient list fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PATIENT_LIST_ERROR passing the error
 */
export function patientListLoadingError(error) {
  return {
    type: LOAD_PATIENT_LIST_ERROR,
    error,
  };
}

/**
 * Save the patient details, this action starts the request saga
 *
 * @return {object} An action object with a type of SAVE_PATIENT_DETAILS
 */
export function savePatientDetails(data) {
  return {
    type: SAVE_PATIENT_DETAILS,
    data
  };
}

/**
 * Dispatched when the patient details are saved by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} patientname The current patientname
 *
 * @return {object}      An action object with a type of SAVE_PATIENT_DETAILS_SUCCESS passing the patients list
 */
export function savePatientDetailsSuccess(data) {
  return {
    type: SAVE_PATIENT_DETAILS_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the save patient details fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SAVE_PATIENT_DETAILS_ERROR passing the error
 */
export function savePatientDetailsError(error) {
  return {
    type: SAVE_PATIENT_DETAILS_ERROR,
    error,
  };
}

/**
 * Load the scan list, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_SCAN_LIST
 */
export function loadScanList() {
  return {
    type: LOAD_SCAN_LIST,
  };
}

/**
 * Dispatched when the scan list are loaded by the request saga
 *
 *
 * @return {object}      An action object with a type of LOAD_SCAN_LIST_SUCCESS passing the scan list
 */
export function scanListLoadingSuccess(data) {
  return {
    type: LOAD_SCAN_LIST_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the scan list fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_SCAN_LIST_ERROR passing the error
 */
export function scanListLoadingError(error) {
  return {
    type: LOAD_SCAN_LIST_ERROR,
    error,
  };
}

/**
 * Load the payment list, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PAYMENT_LIST
 */
export function loadPaymentList(data) {
  return {
    type: LOAD_PAYMENT_LIST,
    data
  };
}

/**
 * Dispatched when the payment list are loaded by the request saga
 *
 *
 * @return {object}      An action object with a type of LOAD_PAYMENT_LIST_SUCCESS passing the payment list
 */
export function paymentListLoadingSuccess(data) {
  return {
    type: LOAD_PAYMENT_LIST_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the payment list fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PAYMENT_LIST_ERROR passing the error
 */
export function paymentListLoadingError(error) {
  return {
    type: LOAD_PAYMENT_LIST_ERROR,
    error,
  };
}

/**
 * Save the payment details, this action starts the request saga
 *
 * @return {object} An action object with a type of SAVE_PAYMENT_DETAILS
 */
export function savePaymentDetails(data) {
  return {
    type: SAVE_PAYMENT_DETAILS,
    data
  };
}

/**
 * Dispatched when the payment details are saved by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of SAVE_PAYMENT_DETAILS_SUCCESS passing the payments list
 */
export function savePaymentDetailsSuccess(data) {
  return {
    type: SAVE_PAYMENT_DETAILS_SUCCESS,
    data,
  };
}

/**
 * Dispatched when loading the save payment details fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of SAVE_PAYMENT_DETAILS_ERROR passing the error
 */
export function savePaymentDetailsError(error) {
  return {
    type: SAVE_PAYMENT_DETAILS_ERROR,
    error,
  };
}