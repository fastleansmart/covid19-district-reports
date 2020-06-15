import React, { useState } from "react";
import { useAsyncResource } from "use-async-resource";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import { fetchFederalStates } from "../../api/fetchLoader";
import { notificationWrapper } from "../../api/notificationWrapper";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  subheading: {
    color: "#999",
  },
  formControl: {
    margin: theme.spacing(0),
    width: 200,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

function ReportForm({ renderNotification }) {
  const classes = useStyles();
  const [districtDisabled, setDistrictEnabled] = React.useState(true);
  const [selectedFederalState, setFederalState] = React.useState(null);
  const [selectedDistrict, setDistrict] = React.useState(null);
  const [numOfInfections, setNumOfInfections] = React.useState(null);
  const [numOfHealed, setNumOfHealed] = React.useState(null);
  const [numOfDeaths, setNumOfDeaths] = React.useState(null);

  const federalStatesWrapper = notificationWrapper(
    fetchFederalStates,
    renderNotification,
    <Alert severity="error">Failed to fetch federals state list, try again later</Alert>
  );
  const [fetchAllFederalStates] = useAsyncResource(federalStatesWrapper, []);

  const handleChangeFederalState = (federalStateId) => {
    if (federalStateId !== undefined && federalStateId !== null) setDistrictEnabled(false);
    setFederalState(federalStateId);
  };

  return (
    <Paper component={"div"} id="#reportform" className={classes.paper}>
      <form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography className={classes.subheading} variant="h6" component="h4">
              Record new data
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <React.Suspense fallback={<CircularProgress />}>
              <FederalStateSelect
                fetchAllFederalStates={fetchAllFederalStates}
                handleChangeFederalState={handleChangeFederalState}
              />
            </React.Suspense>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="district-select">District</InputLabel>
              <Select id="district-select" value="" disabled={districtDisabled}></Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {/* Placeholder for spacing purposes */}
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Num. of infections</InputLabel>
              <Input type="number" />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Num. of healed</InputLabel>
              <Input type="number" />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Death count</InputLabel>
              <Input type="number" />
            </FormControl>
          </Grid>
        </Grid>
        <Button className={classes.button} variant="contained" color="primary">
          Send data
        </Button>
      </form>
    </Paper>
  );
}

function FederalStateSelect({ fetchAllFederalStates, handleChangeFederalState }) {
  const classes = useStyles();
  const federalStates = fetchAllFederalStates();
  const [selectedValue, setSelectedValue] = useState("");

  const handleStateChange = (event) => {
    const { value } = event.target;
    if (value === undefined && value === null) {
      return;
    }
    handleChangeFederalState(value);
    setSelectedValue(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="federal-state-select">Federal state</InputLabel>
      <Select id="federal-state-select" value={selectedValue} onChange={handleStateChange}>
        {federalStates.map((federalState) => (
          <MenuItem key={federalState.id} value={federalState.id}>
            {federalState.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { ReportForm };
