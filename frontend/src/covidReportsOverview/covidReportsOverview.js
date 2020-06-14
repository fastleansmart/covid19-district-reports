import React from "react";
import { useAsyncResource } from "use-async-resource";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Grid from '@material-ui/core/Grid';

import { fetchFederalStateSummaryReports } from "../components/data/fetchLoader";

const useStyles = makeStyles({
    table: {},
    tableRow: {
        "&:nth-of-type(odd)": {
            backgroundColor: "#eee",
        },
    },
});

function ReportsOverview({ renderNotification }) {
    const fetchFsSummaryReports = async () => {
    try {
        return await fetchFederalStateSummaryReports();
    } catch (e) {
        renderNotification(<Alert severity="error">There was an error loading the data, please try again later</Alert>);
    }

        return Promise.resolve([]);
    };
    const [federalStateSummaryReports] = useAsyncResource(fetchFsSummaryReports, []);

    return (
        <React.Suspense fallback="states are loading">
            <OverviewTable federalStateSummaryReports={federalStateSummaryReports} />
        </React.Suspense>
    );
}

function OverviewTable({ federalStateSummaryReports }) {
    const classes = useStyles();
    const summaryReports = federalStateSummaryReports();

    return (
        <TableContainer component={Paper}>
            <Grid xs={12}>
                <FormControl>

                </FormControl>
            </Grid>
            <Table size={'small'} className={classes.table} stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow className={classes.tableRow}>
                        <TableCell>Federal state</TableCell>
                        <TableCell align="right">number of infections</TableCell>
                        <TableCell align="right">of which were healed</TableCell>
                        <TableCell align="right">deaths</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {summaryReports.map((summaryReport, index) => 
                        <OverviewTable.Row key={index} summaryReport={summaryReport} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

OverviewTable.Row = function OverviewTableRow({ summaryReport }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.tableRow} key={summaryReport.federalState_id}>
                <TableCell>{summaryReport.name}</TableCell>
                <TableCell align="right">{summaryReport.infects}</TableCell>
                <TableCell align="right">{summaryReport.healed}</TableCell>
                <TableCell align="right">{summaryReport.died}</TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export { ReportsOverview };
