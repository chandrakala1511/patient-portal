import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from '../App/saga';
import reducer from '../App/reducer';
import { loadPatientList, loadPaymentList, savePaymentDetails } from '../App/actions';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';

const key = 'patientbilling';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(),
    color: theme.palette.text.secondary,
    width: '40%',
    marginTop: '20px',
    marginBottom: '20px'
  },
  sectionheading: {
    fontSize: '14px',
    width: '100%'
  },
  paymentMode: {
    width: '100%',
    marginTop: '10px',
  },
  table: {
    width: '100%'
  }
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PatientBilling(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    props.loadPatientList();
    props.loadPaymentList();
  }, []);

  useEffect(() => {
    const patientDetails = props.medicalData.filter(data => (data.id == patientID)).map(detail => { return detail });
    if (patientDetails.length > 0) {
      setPatientData(patientDetails[0]);
    }
  }, [props.medicalData]);

  useEffect(() => {
    const paymentDetails = props.paymentData.filter(data => (data.patientId == patientID)).map(detail => { return detail });
    if (paymentDetails.length > 0) {
      const amount = paymentDetails.reduce(function (acc, val) { return parseInt(acc) + parseInt(val.paidAmount); }, 0);
      const balance = patientData.totalAmount - parseInt(amount);
      setPaymentData(paymentDetails);
      setPaidAmount(amount);
      setBalanceAmount(balance);
    } else {
      setBalanceAmount(patientData.totalAmount);
    }
  }, [props.paymentData]);

  const classes = useStyles();
  const [saveClicked, setSaveClicked] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("error");
  const patientID = props.location.pathname.split("/").pop();
  const [patientData, setPatientData] = React.useState({});
  const [paymentData, setPaymentData] = React.useState([]);
  const [paidAmount, setPaidAmount] = React.useState(0);
  const [balanceAmount, setBalanceAmount] = React.useState(0);

  const [paymentFormData, setPaymentFormData] = React.useState({
    "id": Math.random().toFixed(36).substr(2, 6),
    "patientId": patientID,
    "paymentDate": new Date().toISOString().split('T')[0],
    "paymentMode": "Card",
    "paidAmount": 0,
    "referenceNumber": "",
    "cardName": "",
    "cardNumber": "",
    "expiryDate": "",
    "cvv": ""
  })

  const handleInputChange = event => {
    let inputData = { [event.target.id || event.target.name]: event.target.value }
    setPaymentFormData({ ...paymentFormData, ...inputData });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const filterFormValues = (...props) => o => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});

  const savePaymentDetails = event => {
    setSaveClicked(true);
    if (paymentFormData.paymentMode == "Cash" && paymentFormData.paidAmount == "") {
      showSnackbar(true, "Please enter amount", "error");
      return false;
    }
    if (paymentData.length == 2) {
      if (paymentFormData.paidAmount < balanceAmount) {
        showSnackbar(true, "You have done 2 transactions already. Please pay the balance amount fully", "error");
        return false;
      }
    } else if (paymentData.length < 2) {
      if (paymentFormData.paidAmount < (patientData.totalAmount * 20)/100) {
        showSnackbar(true, "Please pay atleast 20% of the total amount", "error");
        return false;
      }
    }
    if (paymentFormData.paymentMode == "Card") {
      const formValidation = Object.keys(paymentFormData).filter(key => (paymentFormData[key] == "")).map(key => key);
      if (formValidation.length > 0) {
        showSnackbar(true, "All fields marked with * are mandatory", "error");
        return false;
      }
    }
    let paymentValues = filterFormValues('id', 'patientId', 'paymentDate', 'paymentMode', 'paidAmount', 'referenceNumber')(paymentFormData);
    props.savePaymentDetails(paymentValues);
    showSnackbar(true, "Payment has been made successfully", "success");
    setTimeout(() => {
      props.history.push('/appointments');
    }, 5000);
    event.stopPropagation();
    event.preventDefault();
  };

  const showSnackbar = (open, message, type) => {
    setSnackbarOpen(open);
    setSnackbarMessage(message);
    setSnackbarType(type);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient Billing
      </Typography>
      <Grid container spacing={3}>
        <Grid item container direction="column" xs={12} sm={5}>
          <Typography
            className={classes.sectionheading}
            gutterBottom
            className={classes.title}
          >
            <b>Current Billing Status:</b>
          </Typography>
          <Grid container>
            {patientData &&
              <React.Fragment key={patientData.id}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Patient Name</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patientData.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Patient ID</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patientData.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Age / Gender</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{`${patientData.age} / ${patientData.gender}`}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Total Amount</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patientData.totalAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Discount</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{patientData.discount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Paid Amount</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{paidAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Balance</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{balanceAmount}</Typography>
                </Grid>
              </React.Fragment>
            }
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={7}>
          <Typography
            className={classes.sectionheading}
            gutterBottom
            className={classes.title}
          >
            <b>Previous Transactions:</b>
          </Typography>
          <Grid container className="transaction">
            <Grid item xs={6} sm={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Sno</StyledTableCell>
                      <StyledTableCell align="center">Date</StyledTableCell>
                      <StyledTableCell align="center">
                        Paid Amount
                    </StyledTableCell>
                      <StyledTableCell align="center">
                        Payment Mode
                    </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData.map((row, index) => (
                      <StyledTableRow key={index++}>
                        <StyledTableCell component="th" scope="row">
                          {index++}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.paymentDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.paidAmount}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.paymentMode}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {Object.keys(paymentData).length === 0 && <StyledTableRow>
                      <StyledTableCell component="th" scope="row" colSpan={4} align="center">
                        Payment history not available
                        </StyledTableCell>
                    </StyledTableRow>}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {balanceAmount > 0 && <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <TextField
              required
              error={(paymentFormData.paidAmount == "" && saveClicked)}
              name="paidAmount"
              label="Payable Amount"
              fullWidth={true}
              onChange={handleInputChange}
            />
            <FormControl className={classes.paymentMode}>
              <InputLabel id="paymentModeLabel">Payment Mode</InputLabel>
              <Select
                required
                error={(paymentFormData.paymentMode == "" && saveClicked)}
                labelId="paymentModeLabel"
                name="paymentMode"
                value={paymentFormData.paymentMode}
                fullWidth={true}
                onChange={handleInputChange}
              >
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>}
      {balanceAmount > 0 && paymentFormData.paymentMode == "Card" && <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={(paymentFormData.cardName == "" && paymentFormData.paymentMode == "Card" && saveClicked)}
            name="cardName"
            label="Name on card"
            fullWidth={true}
            onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={(paymentFormData.cardNumber == "" && paymentFormData.paymentMode == "Card" && saveClicked)}
            name="cardNumber"
            label="Card number"
            fullWidth={true}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="expiryDate"
            error={(paymentFormData.expiryDate == "" && paymentFormData.paymentMode == "Card" && saveClicked)}
            label="Expiry date"
            fullWidth={true}
            type="date"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EventIcon />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={(paymentFormData.cvv == "" && paymentFormData.paymentMode == "Card" && saveClicked)}
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth={true}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={(paymentFormData.referenceNumber == "" && paymentFormData.paymentMode == "Card" && saveClicked)}
            name="referenceNumber"
            label="Reference Number"
            fullWidth={true}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>}
      {balanceAmount > 0 && <Grid item xs={12} sm={12} align="center">
        <Button variant="contained" className="save-button" onClick={savePaymentDetails}>
          SAVE
          </Button>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarType}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>}
    </React.Fragment>
  );
}


PatientBilling.propTypes = {
  loadPatientList: PropTypes.func,
  loadPaymentList: PropTypes.func,
  savePaymentDetails: PropTypes.func
};

const mapStateToProps = state => ({
  medicalData: state['global'].medicalData,
  paymentData: state['global'].paymentData,
  savePaymentData: state['global'].savePaymentData
});

function mapDispatchToProps(dispatch) {
  return {
    loadPatientList: () => dispatch(loadPatientList()),
    loadPaymentList: () => dispatch(loadPaymentList()),
    savePaymentDetails: (data) => dispatch(savePaymentDetails(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(PatientBilling);
