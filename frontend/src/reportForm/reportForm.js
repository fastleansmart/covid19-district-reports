import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    subheading: {
        color: '#999',
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
    }
}));

function ReportForm() {
    const classes = useStyles();
    const [districtDisabled, setDistrictEnabled] = React.useState(true);
    const [selectedFederalState, setFederalState] = React.useState(null);
    const [selectedDistrict, setDistrict] = React.useState(null);
    const [numOfInfections, setNumOfInfections] = React.useState(null);
    const [numOfHealed, setNumOfHealed] = React.useState(null);
    const [numOfDeaths, setNumOfDeaths] = React.useState(null);

    const handleChangeFederalState = (event) => {
        if (event.target.value !== undefined && event.target.value !== null)
            setDistrictEnabled(false);
        setFederalState(event.target.value);
    }

    return (
        <Paper component={'div'} id="#reportform" className={classes.paper}>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12}> 
                        <Typography className={classes.subheading} variant="h6" component="h4">Record new data</Typography>
                    </Grid>
                    <Grid item xs={4}> 
                        <FormControl className={classes.formControl}>
                            <InputLabel>Federal state</InputLabel>
                            <Select onChange={handleChangeFederalState}>
                                <MenuItem value={1}>NRW</MenuItem>
                                <MenuItem value={2}>Meckpom</MenuItem>
                                <MenuItem value={3}>Bawü</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}> 
                        <FormControl className={classes.formControl}>
                            <InputLabel>District</InputLabel>
                            <Select disabled={districtDisabled}>
                                
                            </Select>
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
                <Button className={classes.button} variant="contained" color="primary">Send data</Button>
            </form>
        </Paper>
    )
}

export { ReportForm };