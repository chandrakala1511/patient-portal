/*
 * PatientForm
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
import { loadPatientList, savePatientDetails, loadScanList } from '../App/actions';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const key = 'home';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '20px',
  },
  formControl: {
    verticalAlign: 'bottom',
  },
  selectYear: {
    marginTop: '16px',
  },
  selectSalutation: {
    marginTop: '16px',
  },
  selectCountry: {
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
  datepicker: {
    width: '55%',
  },
  phoneNumber: {
    width: '48%',
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#b5e3e8',
    color: '#666',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh", "Belgium", "Bermuda", "Bhutan", "Brazil", "Cambodia", "Canada", "China", "Colombia", "Croatia", "Cuba", "Cyprus", "Denmark", "Egypt", "Ethiopia", "Finland", "France", "Germany", "Greenland", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Kuwait", "Libya", "Madagascar", "Malaysia", "Maldives", "Mexico", "Namibia", "Nepal", "Nigeria", "Niue",
  "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Singapore", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Thailand", "Turkey", "Uganda", "Ukraine", "United Arab Emirates", "United States of America", "Yemen", "Zambia", "Zimbabwe"];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PatientForm(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadPatientList();
    props.loadScanList();
  }, []);

  const classes = useStyles();
  const [scanListTable, setScanListTable] = React.useState([]);
  const [selectedTest, setSelectedTest] = React.useState("");
  const [scanAmount, setScanAmount] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [addClicked, setAddClicked] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("error");

  const [patientFormData, setPatientFormData] = React.useState({
    "id": Math.random().toString(36).substr(2, 6),
    "salutation": "Mr",
    "name": "",
    "gender": "Male",
    "dateOfBirth": "",
    "age": "",
    "ageType": "Years",
    "appointmentDate": "",
    "phoneNumber": "",
    "address1": "",
    "address2": "",
    "city": "",
    "state": "",
    "zipCode": "",
    "country": ""
  })

  const handleInputChange = event => {
    let genderValue = "", ageValue = "";
    if (event.target.name == "salutation") {
      genderValue = (event.target.value == "Mr") ? "Male" : "Female";
    } else {
      genderValue = patientFormData.gender;
    }
    if (event.target.name == "dateOfBirth") {
      ageValue = calculateAge(event.target.value);
    } else {
      ageValue = patientFormData.age;
    }
    let inputData = { [event.target.id || event.target.name]: event.target.value, gender: genderValue, age: ageValue }
    setPatientFormData({ ...patientFormData, ...inputData });
  };

  const calculateAge = dateofbirth => {
    var ageDiff = Date.now() - new Date(dateofbirth).getTime();
    var ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSelectScanName = (event, value) => {
    let modality = value.split("-")[0];
    setSelectedTest(modality);
    if (value) {
      const selectedScanData = props.scanData.filter(test => test.modality == modality);
      setScanAmount(selectedScanData[0].scanAmount);
    }
  }

  const changeDiscountValue = (event) => {
    setDiscount(event.target.value);
  }

  const addTest = (event, value) => {
    setAddClicked(true);

    const formValidation = Object.keys(patientFormData).filter(key => (patientFormData[key] == "")).map(key => key);
    if (formValidation.length > 1 || (formValidation.length == 1 && formValidation[0] != "address2")) {
      showSnackbar(true, "All fields marked with * are mandatory", "error");
      return false;
    }

    const selectedScanData = props.scanData.filter(test => test.modality == selectedTest);
    const checkSlots = props.medicalData.filter(data => (patientFormData.appointmentDate.toString() == data.appointmentDate) && data.testList.indexOf(selectedTest) > -1).map(key => key.appointmentDate);

    if (parseInt(checkSlots.length) >= selectedScanData[0].slots) {
      showSnackbar(true, "Slots already filled for the selected appointment date for this test. Please change the date", "error");
      return false;
    }

    const checkTest = scanListTable.filter(scandata => scandata.modality == selectedTest);
    if (checkTest.length > 0) {
      showSnackbar(true, "Selected test has been already added", "error");
      return false;
    }

    if (discount != "" && (isNaN(discount) || discount <= 0)) {
      showSnackbar(true, "Please enter a valid discount value", "error");
      return false;
    }

    const tmpDiscount = (discount == "") ? 0 : eval(discount);
    if (tmpDiscount > selectedScanData[0].maxDiscount) {
      showSnackbar(true, "Maximum discount allowed for this test is " + selectedScanData[0].maxDiscount, "error");
      return false;
    }
    const calculatedData = selectedScanData.map(data => ({ ...data, "scanamount": scanAmount, "discount": tmpDiscount, "totalamount": (scanAmount - tmpDiscount) }));
    setScanListTable([...scanListTable, ...calculatedData]);
  }

  const removeTest = (value) => {
    const selectedScanData = scanListTable.filter(scandata => scandata.modality != value);
    setScanListTable(selectedScanData);
  }

  const savePatientDetails = event => {
    const formValidation = Object.keys(patientFormData).filter(key => (patientFormData[key] == "")).map(key => key);
    if (formValidation.length > 1 || (formValidation.length == 1 && formValidation[0] != "address2")) {
      showSnackbar(true, "All fields marked with * are mandatory", "error");
      return false;
    }
    if (scanListTable.length == 0) {
      showSnackbar(true, "Atlease one test should be added", "error");
      return false;
    }
    let totalScanAmount = scanListTable.map(scanlist => { return scanlist.scanamount }),
      totalDiscount = scanListTable.map(scanlist => { return scanlist.discount }),
      totalAmount = scanListTable.map(scanlist => { return scanlist.totalamount }),
      testList = scanListTable.map(scanlist => { return scanlist.modality });
    let amount = { "scanAmount": totalScanAmount.reduce((a, b) => eval(a) + eval(b)), "discount": totalDiscount.reduce((a, b) => eval(a) + eval(b)), "totalAmount": totalAmount.reduce((a, b) => eval(a) + eval(b)), "testList": testList };
    props.savePatientDetails({ ...patientFormData, ...amount });
    showSnackbar(true, "Patient details saved and appointment has been fixed", "success");
    setTimeout(() => {
      props.history.push('/appointments');
    }, 5000);
    event.preventDefault();
  };

  const showSnackbar = (open, message, type) => {
    setSnackbarOpen(open);
    setSnackbarMessage(message);
    setSnackbarType(type);
  }

  return (
    <section>
      <Helmet>
        <title>Patient Details</title>
        <meta name="description" content="Patient Details" />
      </Helmet>
      <React.Fragment>
        <Paper>
          <Typography variant="h6" gutterBottom>
            Patient Details
          </Typography>
        </Paper>
        <Grid item xs={12} sm={12}>
          <Typography className="info">
            * All fields marked with * are mandatory.
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={1}>
            <FormControl className={classes.formControl}>
              <Select
                value={patientFormData.salutation}
                onChange={handleInputChange}
                name="salutation"
                displayEmpty
                className={classes.selectSalutation}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
                <MenuItem value="Ms">Ms.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={5}>
            <FormControl className={classes.formControl}>
              <TextField
                required
                error={(patientFormData.name == "" && addClicked)}
                name="name"
                name="name"
                label="Patient Name"
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormLabel component="legend" className="label-gender">
              Gender <span className="info">*</span>
            </FormLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RadioGroup
              row
              aria-label="gender"
              className="select-gender"
              name="gender"
              value={patientFormData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="Male"
                control={<Radio color="default" />}
                label="Male"
                disabled
              />
              <FormControlLabel
                value="Female"
                color="default"
                control={<Radio color="default" />}
                label="Female"
                disabled
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.dateOfBirth == "" && addClicked)}
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              className={classes.datepicker}
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <EventIcon />
                //   </InputAdornment>
                // ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              error={(patientFormData.age == "" && addClicked)}
              name="age"
              label="Age"
              value={patientFormData.age}
              onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              name="ageType"
              value={patientFormData.ageType}
              className={classes.selectYear}
              onChange={handleInputChange}
              displayEmpty
              fullwidth={true}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Years">Years</MenuItem>
              <MenuItem value="Months">Months</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.appointmentDate == "" && addClicked)}
              name="appointmentDate"
              label="Appointment Date"
              type="date"
              className={classes.datepicker}
              InputProps={{
                // endAdornment: (
                //   <InputAdornment position="end">
                //     <EventIcon />
                //   </InputAdornment>
                // ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.phoneNumber == "" && addClicked)}
              name="phoneNumber"
              label="Phone Number"
              className={classes.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={(patientFormData.address1 == "" && addClicked)}
              name="address1"
              label="Address line 1"
              fullWidth={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address2"
              label="Address line 2"
              fullWidth={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.city == "" && addClicked)}
              name="city"
              label="City"
              fullWidth={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.state == "" && addClicked)}
              name="state"
              label="State / Province"
              fullWidth={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              error={(patientFormData.zipCode == "" && addClicked)}
              name="zipCode"
              label="Postal / Zip Code"
              fullWidth={true}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.selectCountry} error={(patientFormData.country == "" && addClicked)}>
              <InputLabel id="countryLabel">Country <span className="info">*</span></InputLabel>
              <Select
                required
                labelId="countryLabel"
                name="country"
                value={patientFormData.country}
                fullWidth={true}
                onChange={handleInputChange}
              >
                <MenuItem value={""}>Select Country</MenuItem>
                {countries.map(country => (<MenuItem value={country}>{country}</MenuItem>)
                )}
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
          <Grid item xs={12} sm={3}>
            <Autocomplete
              options={props.scanData.length > 0 ? props.scanData : []}
              getOptionLabel={(option) => option.modality + "-" + option.testName}
              id="scanlist"
              onInputChange={onSelectScanName}
              renderInput={(params) => <TextField {...params}
                required
                id="scanName"
                name="scanName"
                label="Scan List"
                margin="normal" />}
            />
          </Grid>
          {selectedTest != "" && <Grid container xs={6} sm={9}>
            <Grid item xs={4} sm={4}>
              <Typography className={"scan-amount"} gutterBottom>Scan Amount : <span>{scanAmount}</span></Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField id="discount" name="discount" label="Discount" onChange={changeDiscountValue} className="scan-discount" />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Button variant="contained" onClick={addTest} className="add-button">ADD</Button>
            </Grid>
          </Grid>}
        </Grid>
        <Grid item xs={6} sm={12}>
          {scanListTable.length > 0 && (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sno</StyledTableCell>
                    <StyledTableCell align="center">Scan Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Scan Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">Discount</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scanListTable.map(row => (
                    <StyledTableRow key={row.modality}>
                      <StyledTableCell component="th" scope="row">
                        {row.modality}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.testName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.scanamount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.discount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.totalamount}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button variant="contained" onClick={() => removeTest(row.modality)}>Remove</Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid item xs={12} sm={12} align="center">
          {addClicked && <Button variant="contained" className="save-button" onClick={savePatientDetails}>
            SAVE
          </Button>}
          <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarType}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Grid>
      </React.Fragment>
    </section>
  );
}

PatientForm.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadPatientList: PropTypes.func,
  loadScanList: PropTypes.func,
  savePatientDetails: PropTypes.func,
  savePatientData: PropTypes.object
};

const mapStateToProps = state => ({
  medicalData: state['global'].medicalData,
  scanData: state['global'].scanData,
  savePatientData: state['global'].savePatientData,
});

function mapDispatchToProps(dispatch) {
  return {
    loadPatientList: () => dispatch(loadPatientList()),
    loadScanList: () => dispatch(loadScanList()),
    savePatientDetails: (data) => dispatch(savePatientDetails(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(PatientForm);
