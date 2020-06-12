import React from "react";
import { ReportsOverview } from "./covidReportsOverview";

import { RenderNotificationContext } from "../context/RenderNotification";

function ReportsOverviewContainer() {
  return (
    <RenderNotificationContext.Consumer>
      {(renderNotification) => <ReportsOverview renderNotification={renderNotification} />}
    </RenderNotificationContext.Consumer>
  );
}

export { ReportsOverviewContainer };
