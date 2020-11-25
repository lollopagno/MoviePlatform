import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ButtonResendEmail} from "./resendEmail";

const useStyles = makeStyles((theme) => ({
    p: {
        margin: theme.spacing(15, 0, 0, 0)
    }
}))

function ResendToken() {

    const classes = useStyles();
    const name = useSelector(state => state.user.name)

    return (
        <div>
            <Grid container spacing={2} justify={"center"}>
                <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom className={classes.p}>
                        Hi {name}, thanks for registering.<br/><br/>
                        An email has been sent to the specified address to verify your account. <strong>You have 12
                        hours!</strong><br/>
                        If the code has expired or the email has not arrived, click below!
                    </Typography>
                </Grid>
                <ButtonResendEmail/>
            </Grid>
        </div>
    )
}

export default ResendToken;
