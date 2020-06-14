import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { routes } from './Routes';

const useStyles = makeStyles((theme) => ({
    linktext: {
        textDecoration: "none",
        color: '#666',
    },
}));


function Navigation() {
    return (
        <div id="navigation">
            <List component="nav">
                {routes.map((item, index) => <Navigation.Element item={item} key={index} />)}
            </List>
        </div>
    );
}

Navigation.Element = function NavigationElement({ item, index }) {
    const classes = useStyles();

    return (
        <NavLink key={index} className={classes.linktext} to={item.target}>
            <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
            </ListItem>
        </NavLink>
    );
}

export { Navigation };