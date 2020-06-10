import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAsyncResource } from 'use-async-resource';

const useStyles = makeStyles({
    table: {},
});

const fetchFederalStates = () => 
    fetch(`http://localhost:8070/federal-states`)
        .then(res => res.json())

function ReportsOverview() {
    const [fetchAllFederalStates] = useAsyncResource(fetchFederalStates, []);  

    return (
        <React.Suspense fallback="states are loading">
            <OverviewTable fetchAllFederalStates={fetchAllFederalStates} />
        </React.Suspense>
    );
}

function OverviewTable({ fetchAllFederalStates }) {
    const classes = useStyles();
    const states = fetchAllFederalStates();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Bundesland</TableCell>
                        <TableCell align="right">gemeldete Fälle</TableCell>
                        <TableCell align="right">davon genesen</TableCell>
                        <TableCell align="right">Todesfälle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {states.map(state => 
                        <TableRow key={state.id}>
                            <TableCell>
                                {state.name}
                            </TableCell>
                            <TableCell align="right">
                                {0}
                            </TableCell>
                            <TableCell align="right">
                                {0}
                            </TableCell>
                            <TableCell align="right">
                                {0}
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { ReportsOverview };