import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import messages from './messages';
import { loadPatientList } from '../App/actions';
import { changePatientname } from './actions';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import reducer from './reducer';
import saga from './saga';
import { DataGrid, ColDef, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import patientData from './patientData' 

const key = 'appointments';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

const filterModel = {
  items: [{ columnField: 'name' }],
};

export function AppointmentList({
  loadPatientList,
  patientname,
  loading,
  error,
  repos,
  onSubmitForm
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPatientList();
  }, []);

  const data = {
    "columns": [
      {
        "field": "name",
        "headerName": "Patient Name",
        "width": 200
      },
      {
        "field": "gender",
        "headerName": "Age / Gender",
        "width": 180
      },
      {
        "field": "appointmentDate",
        "headerName": "Appointment Date",
        "width": 200
      },
      {
        "field": "balanceAmount",
        "headerName": "Balance Amount",
        "disableClickEventBubbling": true,
        "width": 200
      },
      {
        "field": "action",
        "headerName": "Action",
        "filterable": "false",
        "width": 150,
        "disableClickEventBubbling": true,
        "renderCell": () => {
          return <Button variant="contained" className="pay-button">Click to pay</Button>;
        }
      }
    ],
    "rows": patientData.data
  }
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>View Appointment</title>
        <meta
          name="description"
          content="View Appointment"
        />
      </Helmet>
      <Typography variant="h6" gutterBottom>
        View Appointment
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid {...data}  filterModel={filterModel} showToolbar disableDensitySelector/>
        </div>
      </div>
    </div>
  );
}

AppointmentList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadPatientList: PropTypes.func,
  patientname: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadPatientList: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadPatientList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AppointmentList);