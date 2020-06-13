import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ReportsOverviewContainer } from "../../ReportsOverview/ReportsOverviewContainer";
import { ReportForm } from "../../reportForm/reportForm";
import { NotFound } from "../../NotFound/NotFound";

class ContentContainer extends React.Component {
  render() {
    return (
      <div id="content">
        <Route path="/" exact>
          <Redirect to="/overview" />
        </Route>
        <Route path="/overview" exact component={ReportsOverviewContainer} />
        <Route path="/add" exact component={ReportForm} />
        <Route path="/404"  component={NotFound} />
      </div>
    );
  }
}

export { ContentContainer };
