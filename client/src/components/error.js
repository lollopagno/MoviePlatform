import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    code: {
        marginTop: theme.spacing(25)
    },
    title: {
        marginTop: theme.spacing(2),
        color: "#909090"
    },
    alert: {
        marginTop: theme.spacing(4),
    }
}));

function Error() {

    const classes = useStyles()
    return (
        <Grid container justify={'center'}>

            <Grid item xs={12}>
                <Typography className={classes.code} variant={'h1'}>404</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.title} variant={"h4"}>Page not found!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Alert severity={'error'} variant="standard" className={classes.alert}>
                    We can't find the page you're looking for.<br/>You can either return to the previous page.
                </Alert>
            </Grid>
        </Grid>
    )
}

export default Error;
