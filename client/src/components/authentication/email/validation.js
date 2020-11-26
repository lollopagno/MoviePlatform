import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {authentication} from "../../../requests/authentication";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import {ButtonResendEmail} from "./funtionality";
import {Alert} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    alert: {
        borderRadius: 15,
        fontSize: 15,
        margin: theme.spacing(10, 7, 0, 7),
    },
    button: {
        margin: theme.spacing(3, 65, 0, 65),
        width: 150,
        height: 45
    },
}))

function ValidateEmail() {

    const classes = useStyles();

    const token = useSelector(state => state.user.tokenEmail)
    const user = useSelector(state => state.user.username)

    const [infoValidation, setInfoValidation] = useState('')
    const [alert, setAlert] = useState({
        state: true
    })

    const params = {
        token: token,
        username: user
    }

    useEffect(() => {
        authentication.tokenEmail(params).then((res) => {
            setInfoValidation(res.data.message)
            setAlert({...alert, state: true})
        }).catch(err => {
            setInfoValidation(err.response.data.message)
            setAlert({...alert, state: false})
        })
    }, [])

    const signIn = (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            value="submit"
            onClick={() => {
                history.push('/signIn')
            }}
            className={classes.button}
        >
            Sign In
        </Button>
    )

    return (
        <Grid container justify={"center"}>
            <Alert severity={alert.state? 'success':'error'} variant="outlined" className={classes.alert}>
                {infoValidation}
            </Alert>
            {alert.state && signIn}
            {!alert.state && <ButtonResendEmail/>}
        </Grid>
    )
}

export default ValidateEmail;
