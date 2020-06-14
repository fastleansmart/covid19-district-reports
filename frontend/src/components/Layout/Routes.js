import React from 'react';
import InboxIcon  from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const routes = [
    {
        label: "Overview",
        target: "/overview",
        icon: <InboxIcon />,
    },
    {
        label: "Report data",
        target: "/add",
        icon: <DraftsIcon />,
    },
]

export { routes };