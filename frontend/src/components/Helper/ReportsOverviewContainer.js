import React from "react";
import { ReportsOverview } from "../Reports/ReportsOverview";

import { RenderNotificationContext } from "../../context/RenderNotification";

function ReportsOverviewContainer() {
  return (
    <RenderNotificationContext.Consumer>
      {(renderNotification) => <ReportsOverview renderNotification={renderNotification} />}
    </RenderNotificationContext.Consumer>
  );
}

export { ReportsOverviewContainer };
