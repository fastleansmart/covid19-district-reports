import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ReportsOverviewContainer } from "../../covidReportsOverview/covidReportsOverviewContainer";
import { ReportForm } from "../../reportForm/reportForm";
import { NotFound } from "../../notFound/notFound";

class ContentContainer extends React.Component {
  render() {
    return (
      <div id="content">
        <Route path="/" exact>
          <Redirect to="/overview" />
        </Route>
        <Route path="/overview" exact component={ReportsOverviewContainer} />
        <Route path="/add" exact component={ReportForm} />
        <Route component={NotFound} />
      </div>
    );
  }
}

export { ContentContainer };
