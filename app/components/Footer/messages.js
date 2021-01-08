/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'patientportal.components.Footer';

export default defineMessages({
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
    © Copyright 2021. All rights reserved.
    `,
  },
});
