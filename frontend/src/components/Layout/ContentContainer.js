import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ReportsOverviewContainer } from "../Helper/ReportsOverviewContainer";
import { ReportForm } from "../Reports/ReportForm";
import { NotFound } from "../NotFound/NotFound";

class ContentContainer extends React.Component {
    render() {
        return (
            <div id="content">
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/overview" />
                    </Route>
                    <Route path="/overview" exact component={ReportsOverviewContainer} />
                    <Route path="/add" exact component={ReportForm} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export { ContentContainer };