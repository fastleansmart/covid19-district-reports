import React, { useState } from "react";
import { useAsyncResource } from "use-async-resource";
import { useHistory } from "react-router-dom";

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
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";

import { fetchFederalStates, fetchDistrictsByState, postReportForDistrict } from "../../api/fetchLoader";
import { notificationWrapper } from "../../api/notificationWrapper";

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
    marginRight: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

function ReportForm({ renderNotification }) {
  const classes = useStyles();
  const history = useHistory();
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

  const [fetchDistricts] = useAsyncResource(fetchDistrictsByState, { federalStateId: selectedFederalState });

  const postReportData = ({ onSuccess }) => {
    return async () => {
      try {
        await postReportForDistrict({
          infects: numOfInfections,
          healed: numOfHealed,
          died: numOfDeaths,
          district_id: selectedDistrict,
        });
        renderNotification(<Alert severity="success">Data record successfully created</Alert>);
        if ({}.toString.call(onSuccess) === "[object Function]") onSuccess();
      } catch (ex) {
        renderNotification(
          <Alert severity="error">There was an error submitting the data, please try again later</Alert>
        );
      }
    };
  };

  const inputFieldDisabled = () => selectedDistrict === "" || selectedFederalState === "";
  const clearFormData = () => {
    setDistrict("");
    setFederalState("");
    setNumOfInfections(0);
    setNumOfHealed(0);
    setNumOfDeaths(0);
  };

  const gotoOverview = () => history.push("/overview");

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
                handleChangeFederalState={(event) => {
                  setDistrict("");
                  setFederalState(event.target.value);
                }}
                selectedItem={selectedFederalState}
              />
            </React.Suspense>
          </Grid>
          <Grid item xs={4}>
            <React.Suspense fallback={<CircularProgress />}>
              <DistrictSelect
                fetchDistricts={fetchDistricts}
                disabled={selectedFederalState === ""}
                handleChangeDistrict={(event) => setDistrict(event.target.value)}
                selectedItem={selectedDistrict}
              />
            </React.Suspense>
          </Grid>
          <Grid item xs={4}>
            {/* Placeholder for spacing purposes */}
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Num. of infections</InputLabel>
              <Input
                type="number"
                min="0"
                step="1"
                onChange={(event) => setNumOfInfections(parseInt(event.target.value))}
                value={numOfInfections}
                disabled={inputFieldDisabled()}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Num. of healed</InputLabel>
              <Input
                type="number"
                min="0"
                step="1"
                onChange={(event) => setNumOfHealed(parseInt(event.target.value))}
                value={numOfHealed}
                disabled={inputFieldDisabled()}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControl}>
              <InputLabel>Death count</InputLabel>
              <Input
                type="number"
                min="0"
                step="1"
                onChange={(event) => setNumOfDeaths(parseInt(event.target.value))}
                value={numOfDeaths}
                disabled={inputFieldDisabled()}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Tooltip placement="bottom" title={"Submit single data record and go back to /overview page"}>
          <span>
            <Button
              onClick={postReportData({ onSuccess: gotoOverview })}
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={inputFieldDisabled()}
            >
              Submit data
            </Button>
          </span>
        </Tooltip>
        <Tooltip placement="bottom" title={"Submit data record and clear form values to imediately submit more data"}>
          <span>
            <Button
              onClick={postReportData({ onSuccess: clearFormData })}
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={inputFieldDisabled()}
            >
              Submit data and submit more
            </Button>
          </span>
        </Tooltip>
      </form>
    </Paper>
  );
}

function FederalStateSelect({ fetchAllFederalStates, handleChangeFederalState, selectedItem }) {
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
      <InputLabel>Federal state</InputLabel>
      <Select onChange={handleChangeFederalState} value={selectedItem}>
        {federalStates.map((federalState) => (
          <MenuItem key={federalState.id} value={federalState.id}>
            {federalState.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function DistrictSelect({ fetchDistricts, disabled, handleChangeDistrict, selectedItem }) {
  const classes = useStyles();
  const districts = fetchDistricts();

  let value = selectedItem;
  if (districts.length === 1 && value === "") {
    value = districts[0].id;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>District</InputLabel>
      <Select disabled={disabled} onChange={handleChangeDistrict} value={value}>
        {districts.map((district) => (
          <MenuItem key={district.id} value={district.id}>
            {district.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export { ReportForm };
