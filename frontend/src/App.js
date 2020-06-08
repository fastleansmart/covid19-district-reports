import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { ReportsOverview } from './covidReportsOverview/covidReportsOverview';
import { Navigation } from './components/navigation';
import { Header } from './components/header';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ContentContainer } from './components/contentContainer';
import { BrowserRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '8px',
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}));

export default function App() {
  const classes = useStyles();

  return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <Container className={classes.root} maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12}> 
                <Paper className={classes.paper}>
                  <Header />
                </Paper>
                </Grid>            
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <Navigation />
                </Paper>
              </Grid>
              <Grid item xs={9}>
                <Paper className={classes.paper}>
                  <ContentContainer />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
  );
};