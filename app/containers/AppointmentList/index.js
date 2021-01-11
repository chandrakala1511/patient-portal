import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
//import { FormattedMessage } from 'react-intl';
//import messages from './messages';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from '../App/saga';
import reducer from '../App/reducer';
import { loadPatientList, loadPaymentList } from '../App/actions';
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
    props.loadPaymentList();
  }, []);

  const data = {
    columns: [
      {
        field: 'name',
        headerName: 'Patient Name',
        width: 180,
      },
      {
        field: 'ageGender',
        headerName: 'Age / Gender',
        width: 150,
      },
      {
        field: 'appointmentDate',
        headerName: 'Appointment Date',
        width: 180,
      },
      {
        field: 'balanceAmount',
        headerName: 'Balance Amount',
        disableClickEventBubbling: true,
        width: 180,
      },
      {
        field: 'status',
        headerName: 'Status',
        disableClickEventBubbling: true,
        width: 180,
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
    rows: props.medicalData.map(item => {
      const date = new Date(item.appointmentDate);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');
      const statusValue = props.paymentData.filter(data => (data.patientId == item.id)).map((row, index) => { return row.paidAmount })
      const totalPaidAmount = statusValue.reduce(function (acc, val) { return parseInt(acc) + parseInt(val); }, 0);
      const balanceAmount = item.totalAmount - totalPaidAmount;
      const status = (balanceAmount == 0) ? "Fully Billed" : (balanceAmount == item.totalAmount) ? "Not yet Billed" : "Due Billed";
      const calculatedData = { "ageGender": `${item.age} / ${item.gender}`, "balanceAmount": balanceAmount + " INR", "appointmentDate": formattedDate, "status": status };
      return { ...item, ...calculatedData };
    })
  }

  const handlePaymentClick = (id) => {
    props.history.push("/patientbilling/" + id)
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
  loadPatientList: PropTypes.func,
  loadPaymentList: PropTypes.func,
};

const mapStateToProps = state => ({
  medicalData: state['global'].medicalData,
  paymentData: state['global'].paymentData,
});

function mapDispatchToProps(dispatch) {
  return {
    loadPatientList: () => dispatch(loadPatientList()),
    loadPaymentList: () => dispatch(loadPaymentList()),
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

