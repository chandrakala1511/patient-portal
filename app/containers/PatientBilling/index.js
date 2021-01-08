import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
const key = 'patientbilling';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(),
    color: theme.palette.text.secondary,
    width: '40%',
    marginTop: '20px'
  },
  sectionheading: {
    fontSize: '14px'
  },
  paymentMode: {
    width: '100%',
    marginTop: '10px'
  },
}));

const payments = [
  { name: 'Patient Name', detail: 'Visa' },
  { name: 'Patient ID', detail: 'Mr John Smith' },
  { name: 'Age / Gender', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Total Amount', detail: '04/2024' },
  { name: 'Discount', detail: 'Mr John Smith' },
  { name: 'Paid Amount', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Balance', detail: '04/2024' }
];


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#b5e3e8',
    color: '#666',
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

export default function PatientBilling() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Patient Billing
      </Typography>
      <Grid container spacing={3}>
        <Grid item container direction="column" xs={12} sm={5}>
          <Typography className={classes.sectionheading} gutterBottom className={classes.title}>
            <b>Current Billing Status:</b>
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={7}>
          <Typography className={classes.sectionheading} gutterBottom className={classes.title}>
            <b>Previous Transactions:</b>
          </Typography>
          <Grid item xs={6} sm={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sno</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Paid Amount</StyledTableCell>
                    <StyledTableCell align="center">Payment Mode</StyledTableCell>
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
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <TextField required id="paymentAmount" label="Payable Amount" fullWidth />
            <FormControl className={classes.paymentMode}>
              <InputLabel id="paymentModeLabel">Payment Mode</InputLabel>
              <Select
                labelId="paymentModeLabel"
                id="paymentMode"
                value={""}
                fullWidth={true}
              // onChange={handleAgeChange}
              >
                <MenuItem value={"Card"}>Card</MenuItem>
                <MenuItem value={"Cash"}>Cash</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField required id="cardName" label="Payment Mode" fullWidth /> */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth="true"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth="true"
          />
        </Grid>
        <Grid item xs={12} sm={12} align="center">
          <Button variant="contained" className="save-button">SAVE</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
