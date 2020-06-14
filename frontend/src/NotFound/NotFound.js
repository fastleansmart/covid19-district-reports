import React from "react";
import { Card, CardHeader, Avatar, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: red[100],
    },
  }));

function NotFound() {
    const classes = useStyles();

    return (

        <Card>
            <CardHeader 
            avatar={
                <Avatar aria-label="code" className={classes.avatar}>
                  404
                </Avatar>
              }
            title="Sorry we didn't found your site" 
            subheader="use the navigation to the left" />
        </Card>
    );
}

export { NotFound }