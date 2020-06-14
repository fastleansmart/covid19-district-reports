import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ReportsOverview } from "../Reports/ReportsOverview";
import { ReportForm } from "../Reports/ReportForm";
import { NotFound } from "../NotFound/NotFound";
import { RenderNotificationContext } from "../../context/RenderNotification";

class ContentContainer extends React.Component {
  render() {
    return (
      <div id="content">
        <RenderNotificationContext.Consumer>
          {(renderNotification) => {
            return (
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/overview" />
                </Route>
                <Route path="/overview" exact>
                  <ReportsOverview renderNotification={renderNotification} />
                </Route>
                <Route path="/add" exact component={ReportForm} />
                <Route component={NotFound} />
              </Switch>
            );
          }}
        </RenderNotificationContext.Consumer>
      </div>
    );
  }
}

export { ContentContainer };
