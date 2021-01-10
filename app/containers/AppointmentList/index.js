import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
//import { FormattedMessage } from 'react-intl';
//import messages from './messages';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useHistory, Redirect } from "react-router-dom";
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from '../App/saga';
import reducer from '../App/reducer';
import { loadPatientList } from '../App/actions';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const key = 'appointments';

const filterModel = {
  items: [{ columnField: 'name' }],
};

function AppointmentList(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadPatientList();
  }, []);

 // const history = useHistory();

  const data = {
    columns: [
      {
        field: 'name',
        headerName: 'Patient Name',
        width: 200,
      },
      {
        field: 'gender',
        headerName: 'Age / Gender',
        width: 180,
      },
      {
        field: 'appointmentDate',
        headerName: 'Appointment Date',
        width: 200,
      },
      {
        field: 'balanceAmount',
        headerName: 'Balance Amount',
        disableClickEventBubbling: true,
        width: 200,
      },
      {
        field: 'id',
        headerName: 'Action',
        filterable: 'false',
        width: 150,
        disableClickEventBubbling: true,
        renderCell: (params) => (
          <Button variant="contained" className="pay-button" onClick={() => handlePaymentClick(params.value)}>Click to pay</Button>
        ),
      },
    ],
    rows: props.medicalData.map(item => { item.gender = item.age + " / " + item.gender;item.balanceAmount = item.totalAmount; return item; })
  }

  const handlePaymentClick = (id) => { 
    window.location ="http://localhost:3000/patientbilling/"+id;
    //history.push("/patientbilling/"+id)
  }

  return (
    <div>
      <Helmet>
        <title>View Appointment</title>
        <meta name="description" content="View Appointment" />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={12}>
          <Typography variant="h6" gutterBottom>
            View Appointment
      </Typography>
          <div style={{ height: 700, width: '100%' }}>
            <div style={{ height: 700, width: '100%' }}>
              <DataGrid
                {...data}
                filterModel={filterModel}
                showToolbar
                disableDensitySelector
              />
            </div>
          </div>
        </Grid>
      </Grid >
    </div>
  );
}

AppointmentList.propTypes = {
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadPatientList: PropTypes.func,
};

const mapStateToProps = state => ({
  medicalData: state['global'].medicalData,
});

function mapDispatchToProps(dispatch) {
  return {
    loadPatientList: () => dispatch(loadPatientList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(AppointmentList);

