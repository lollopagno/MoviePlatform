import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {request} from '../../../requests/user'
import {useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import {store} from "../../../redux/store";
import {changeTokenEmail, signUpSuccess} from "../../../redux/reducer/userReducer";

const RED = '#ce0018'
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 65, 0, 65),
        width: 175,
        height: 50
    },
    p: {
        margin: theme.spacing(15, 0, 0, 0)
    },
    infoResendEmail: {
        margin: theme.spacing(0, 5, 0, 5),
        color: RED
    }
}))

function ResendToken() {

    const classes = useStyles();
    const name = useSelector(state => state.user.name)
    const username = useSelector(state => state.user.username)
    const [infoSend, setInfoSend ] = useState('')

    const data = {
        username: username
    }

    return (
        <div className={classes.root}>

            <Grid container spacing={2} justify={"center"}>

                <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom className={classes.p}>
                        Hi {name}, thanks for registering.<br/><br/>
                        An email has been sent to the specified address to verify your account. <strong>You have 12
                        hours!</strong><br/>
                        If the code has expired or the email has not arrived, click below!
                    </Typography>
                </Grid>
                <Grid container justify={"center"}>
                    <Box className={classes.infoResendEmail} p={1}>
                        {infoSend}
                    </Box>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    value="resend"
                    onClick={() => {
                        request.resendTokenEmail(data).then(res => {
                            setInfoSend(res.data.message)
                            // Saved new token
                            store.dispatch(changeTokenEmail(res.data))
                        }).catch(err => {
                            setInfoSend(err.response.data.message)
                        })
                    }}
                    className={classes.button}
                >
                    Resend email
                </Button>
            </Grid>

        </div>

    )
}

export default ResendToken;
