import React from 'react';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <Typography variant="h4" component="h1" gutterBottom>
                    Covid-19 District Reporting
                </Typography>
                <Typography variant="body1" component="p" id="introductory-text">
                    Welcome to the Covid-19 case data reporting page for all german districts.
                    You are on the welcome page. See the overview of all current data in the table below.
                </Typography>
            </div>
        )
    }
}

export { Header };