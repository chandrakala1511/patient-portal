/*
 * PatientForm Messages
 *
 * This contains all the text for the PatientForm component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'patientportal.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  appointments: {
    id: `${scope}.appointments`,
    defaultMessage: 'View Appointments',
  },
});
