import React from 'react';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <Typography variant="h4" component="h1" gutterBottom>
                    Covid-19 District Reports
                </Typography>
                <Typography variant="body1" component="p" id="introductory-text">
                    Welcome to the Covid-19 case data reporting app for all german districts.
                    On this page, you can see all case data that has been reported so far. You are also able to report new data for any district.
                    The app consists of the overview page showing data in a tabular manner.
                    Under the link "Report data" you can report current data.
                </Typography>
            </div>
        )
    }
}

export { Header };