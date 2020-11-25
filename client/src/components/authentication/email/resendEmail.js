import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import {request} from "../../../requests/authentication";
import {store} from "../../../redux/store";
import {changeTokenEmail} from "../../../redux/reducer/userReducer";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const RED = '#ce0018'
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 65, 0, 65),
        width: 175,
        height: 50
    },
    infoResendEmail: {
        margin: theme.spacing(0, 5, 0, 5),
        color: RED
    }
}))

/**
 * Component button and box to send email
 */
export function ButtonResendEmail() {

    const classes = useStyles();
    const username = useSelector(state => state.user.username)
    const [infoSend, setInfoSend] = useState('')

    const data = {
        username: username
    }

    return (
        <div>
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
        </div>
    )
}
