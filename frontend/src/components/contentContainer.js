import React from 'react';
import { Route } from 'react-router-dom'
import { ReportsOverview } from '../covidReportsOverview/covidReportsOverview';

class ContentContainer extends React.Component {
    render() {
        return (
            <div id="content">
                <Route path="/" exact component={ReportsOverview} />
                <Route path="/overview" exact component={ReportsOverview} />
                <Route path="/add" exact component={ReportForm} />
                <Route component={NotFound}/>
            </div>
        );
    }
}

export { ContentContainer };