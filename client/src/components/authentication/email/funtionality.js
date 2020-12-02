import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {authentication} from "../../../requests/authentication";
import {store} from "../../../redux/store";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {setTokenEmail} from "../../../redux/reducer/tokenReducer";
import history from "../../../history";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(2)
    },
    alert: {
        margin: theme.spacing(2, 5, 0, 5),
    },
    p: {
        margin: theme.spacing(15, 0, 0, 0)
    }
}))

/**
 * Component to info send email
 */
export function ResendToken() {

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

/**
 * Component button and alert to send email
 */
export function ButtonResendEmail() {

    const classes = useStyles();
    const email = useSelector(state => state.user.email)
    const [resendEmail, setResendEmail] = useState({
        state: false,
        info: ''
    })

    const data = {
        email: email
    }

    return (
        <Grid container justify={"center"}>
            {resendEmail.state &&
            <Alert severity="warning" variant="standard" className={classes.alert}>
                {resendEmail.info}
            </Alert>}
            <Grid container spacing={4} justify={"center"} className={classes.button}>
                <Grid item >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        value="resend"
                        onClick={() => {
                            authentication.resendTokenEmail(data).then(res => {
                                setResendEmail({...resendEmail, info: res.data.message, state: true})
                                // Saved new token
                                store.dispatch(setTokenEmail(res.data.token))
                            }).catch(err => {
                                setResendEmail({...resendEmail, info: err.response.data.message, state: true})
                            })
                        }}
                    >
                        Resend email
                    </Button>
                </Grid>
                <Grid item >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        value="submit"
                        onClick={() => {
                            history.push('/signIn')
                        }}
                    >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
