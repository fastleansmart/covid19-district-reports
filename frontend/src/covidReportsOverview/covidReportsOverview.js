import React from 'react';
import { useAsyncResource } from 'use-async-resource';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { fetchFederalStates } from '../components/data/fetchLoader';

const useStyles = makeStyles({
    table: {},
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#eee',
        },
    }
});

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
    const federalStates = fetchAllFederalStates();

    return (
        <TableContainer component={Paper}>
            <Table size={'small'} className={classes.table} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell>Bundesland</TableCell>
                        <TableCell align="right">gemeldete Fälle</TableCell>
                        <TableCell align="right">davon genesen</TableCell>
                        <TableCell align="right">Todesfälle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {federalStates.map((federalState, index) => 
                        <OverviewTable.Row key={index} federalState={federalState} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

OverviewTable.Row = function OverviewTableRow({ federalState }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.tableRow} key={federalState.id}>
                <TableCell>{federalState.name}</TableCell>
                <TableCell align="right">{0}</TableCell>
                <TableCell align="right">{0}</TableCell>
                <TableCell align="right">{0}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export { ReportsOverview };