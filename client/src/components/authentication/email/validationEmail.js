import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {request} from "../../../requests/user";
import {Grid} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import history from "../../../history";

const useStyles = makeStyles((theme) => ({
    box: {
        borderRadius: 15,
        fontSize: 20,
        margin: theme.spacing(10, 5, 2, 7)
    },
    button : {
        margin: theme.spacing(3, 65, 0, 65),
        width: 150,
        height: 50
    }
}))

function ValidateEmail() {

    const classes = useStyles();
    const ERROR = '#f6beb4'
    const SUCCESS = '#c1ffdb'

    const token = useSelector(state => state.user.tokenEmail)
    const user = useSelector(state => state.user.username)

    const [infoValidation, setInfoValidation] = useState('')
    const [colorInfo, setColorInfo] = useState('')

    const params = {
        token: token,
        username: user
    }

    useEffect(() => {
        request.tokenEmail(params).then((res) => {
            setInfoValidation(res.data.message)
            setColorInfo(SUCCESS)
        }).catch(err => {
            setInfoValidation(err.response.data.message)
            setColorInfo(ERROR)
        })
    }, [])

    const signIn = (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            value="submit"
            onClick={() => {history.push('/signIn')}}
            className={classes.button}
        >
            Sign In
        </Button>
    )

    return (
        <Grid container justify={"center"}>
            <Box className={classes.box} bgcolor={colorInfo} color="success.contrastText" p={4}>
                {infoValidation}
            </Box>
            {colorInfo === SUCCESS && signIn}
        </Grid>
    )
}

export default ValidateEmail;
