import { LOAD_PATIENT_LIST, LOAD_PATIENT_LIST_SUCCESS, LOAD_PATIENT_LIST_ERROR } from './constants';

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
 * @param  {array} repos The repository data
 * @param  {string} patientname The current patientname
 *
 * @return {object}      An action object with a type of LOAD_PATIENT_LIST_SUCCESS passing the repos
 */
export function patientListLoadingSuccess(patientlist, patientname) {
  return {
    type: LOAD_PATIENT_LIST_SUCCESS,
    patientlist,
    patientname,
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
