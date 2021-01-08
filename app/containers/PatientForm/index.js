/*
 * PatientForm
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
import reducer from './reducer';
import saga from './saga';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import EventIcon from '@material-ui/icons/Event';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputAdornment from '@material-ui/core/InputAdornment';

const key = 'home';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: '20px'
  },
  formControl: {
    verticalAlign: 'bottom'
  },
  selectYear: {
    marginTop: '16px'
  },
  selectSalutation: {
    marginTop: '16px'
  },
  selectCountry: {
    width: '100%'
  },
  table: {
    minWidth: 700
  },
  datepicker: {
    width: '55%'
  },
  phoneNumber: {
    width: '48%'
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#b5e3e8',
    color: '#666'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, scanname, scanamount, discount, totalamount) {
  return { name, scanname, scanamount, discount, totalamount };
}

const rows = [
  createData(1, 'CT BRAIN', 200, 10, 180),
  createData(2, 'MRI BRAIN', 500, 5, 450),
  createData(3, 'GLUCOSE FASTING', 800, 10, 720)
];

export function PatientForm({
  patientname,
  loading,
  error,
  repos,
  loadPatientList
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    loadPatientList();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState('Male');
  const [value, setValue] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date('2014-08-18T21:11:54'));
  const [appointmentDate, setAppointmentDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [age, setAge] = React.useState('');
  const [salutation, setSalutation] = React.useState('Mr');
  const [yearMonth, setYearMonth] = React.useState('Years');

  const handleYearMonthChange = (event) => {
    setYearMonth(event.target.value);
  };

  const handleSalutationChange = (event) => {
    setSalutation(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  const handleDateChange = (date) => {
    setDateOfBirth(date);
  };
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <section>
      <Helmet>
        <title>Patient Details</title>
        <meta
          name="description"
          content="Patient Details"
        />
      </Helmet>
      <React.Fragment>
        <Paper>
          <Typography variant="h6" gutterBottom>
            Patient Details
      </Typography>
        </Paper>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={1}>
            <FormControl className={classes.formControl}>
              <Select
                value={salutation}
                onChange={handleSalutationChange}
                displayEmpty
                className={classes.selectSalutation}
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value={"Mr"}>Mr.</MenuItem>
                <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                <MenuItem value={"Ms"}>Ms.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Patient Name"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormLabel
              component="legend"
              className="label-gender">
              Gender *
              </FormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RadioGroup row
              aria-label="gender"
              className="select-gender"
              name="gender"
              value={value}
              onChange={handleRadioChange}>
              <FormControlLabel
                value="Male"
                control={<Radio color="default" />}
                label="Male" />
              <FormControlLabel
                value="Female"
                color="default"
                control={<Radio color="default" />}
                label="Female" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dateofbirth"
              label="Date of Birth"
              type="date"
              className={classes.datepicker}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"><EventIcon /></InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              id="age"
              name="age"
              label="Age"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              value={yearMonth}
              className={classes.selectYear}
              onChange={handleYearMonthChange}
              displayEmpty
              fullwidth={true}
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value={"Years"}>Years</MenuItem>
              <MenuItem value={"Months"}>Months</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="appointmentdate"
              label="Appointment Date"
              type="date"
              className={classes.datepicker}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end"><EventIcon /></InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              className={classes.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="addressLine1"
              name="addressLine1"
              label="Address line 1"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="addressLine2"
              name="addressLine2"
              label="Address line 2"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              label="State / Province"
              fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="Postal / Zip Code"
              fullWidth="true"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.selectCountry}>
              <InputLabel id="countryLabel">Country *</InputLabel>
              <Select
                required
                labelId="countryLabel"
                id="country"
                value={""}
                fullWidth="true"
              >
                <MenuItem value={1}>India</MenuItem>
                <MenuItem value={2}>Canada</MenuItem>
                <MenuItem value={3}>Russia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
      <React.Fragment>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Medical Scan Details
      </Typography>
        </Paper>
        <Grid container spacing={3} className="scan-details">
          <Grid item xs={6} sm={3}>
            <TextField
              id="scanName"
              name="scanName"
              label="Scan List"
              autoComplete="scan-list"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="scanAmount"
              name="scanAmount"
              label="Scan Amount"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="discount"
              name="discount"
              label="Discount"
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button variant="contained">ADD</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sno</StyledTableCell>
                  <StyledTableCell align="center">Scan Name</StyledTableCell>
                  <StyledTableCell align="center">Scan Amount</StyledTableCell>
                  <StyledTableCell align="center">Discount</StyledTableCell>
                  <StyledTableCell align="center">Total Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.scanname}</StyledTableCell>
                    <StyledTableCell align="center">{row.scanamount}</StyledTableCell>
                    <StyledTableCell align="center">{row.discount}</StyledTableCell>
                    <StyledTableCell align="center">{row.totalamount}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={12} align="center">
          <Button variant="contained" className="save-button">SAVE</Button>
        </Grid>
      </React.Fragment>
    </section>
  );
}

PatientForm.propTypes = {
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
)(PatientForm);
