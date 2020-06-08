import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { ReportsOverview } from './covidReportsOverview/covidReportsOverview';
import { Localizer } from './i18n/localizer';

export default function App() {
  return (
    <Localizer>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Container maxWidth="md">
          <Box my={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              Covid-19 District Reporting
            </Typography>
            <ReportsOverview />
          </Box>
        </Container>
      </ThemeProvider>
    </Localizer>
  );
}
