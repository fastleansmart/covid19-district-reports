import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon  from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
    linktext: {
        textDecoration: "none",
        color: '#666',
    },
  }));

const navLinks = [
    {
        label: "Overview",
        target: "/overview",
        icon: <InboxIcon />,
    },
    {
        label: "Add Data",
        target: "/add",
        icon: <DraftsIcon />,
    },
]

export { navLinks };

function Navigation() {

    const classes = useStyles();
    
    const createNavElements = (links) => {

        return links.map((item, index) => 
            <NavLink key={index} className={classes.linktext} to={item.target}>
                <ListItem button>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>
            </NavLink>
        );
    }

        return (
            <div id="navigation">
                <List component="nav">
                    {createNavElements(navLinks)}
                </List>
            </div>
        );
}

export { Navigation };