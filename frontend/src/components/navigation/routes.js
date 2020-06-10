import React from 'react';
import InboxIcon  from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const routes = [
    {
        label: "Übersicht",
        target: "/overview",
        icon: <InboxIcon />,
    },
    {
        label: "Daten erfassen",
        target: "/add",
        icon: <DraftsIcon />,
    },
]

export { routes };