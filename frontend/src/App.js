import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import theme from './theme';
import { ContentContainer } from './components/contentContainer/contentContainer';
import { Navigation } from './components/navigation/navigation';
import { Header } from './components/header/header';

import './ascii-art';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '8px',
    },
    paper: {
        padding: theme.spacing(0),
        color: theme.palette.text.secondary,
    },
    paperSpaced: {
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
    },
}));

export default function App() {
  const classes = useStyles();

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Container className={classes.root} maxWidth="md">
            <Grid container spacing={4}>
              <Grid item xs={12}> 
                <Paper className={classes.paperSpaced}>
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