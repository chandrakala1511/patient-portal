import { PATIENT_NAME } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} patientname The new text of the input field
 *
 * @return {object} An action object with a type of PATIENT_NAME
 */
export function changePatientname(patientname) {
  return {
    type: PATIENT_NAME,
    patientname,
  };
}
