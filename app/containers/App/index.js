/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import PatientForm from 'containers/PatientForm/Loadable';
import AppointmentList from 'containers/AppointmentList/Loadable';
import PatientBilling from 'containers/PatientBilling/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import saga from './saga';

import GlobalStyle from '../../global-styles';

const key = 'app';
const AppWrapper = styled.div`
  max-width: calc(1024px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  useInjectSaga({ key, saga });
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s" defaultTitle="Patient Portal">
        <meta name="description" content="Patient Portal" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={PatientForm} />
        <Route exact path="/appointments" component={AppointmentList} />
        <Route exact path="/patientbilling/:id" component={PatientBilling} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}