import React, {useEffect, useState} from 'react'
import {signInSuccess} from "../../../redux/reducer/userReducer";
import {request} from '../../../requests/user'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {MdLocalMovies} from 'react-icons/md';
import {useStyles} from "./styles";
import {store} from '../../../redux/store'
import history from '../../../history'
import {useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";
import {meFromTokenSuccess} from "../../../redux/reducer/tokenReducer";
import {resetAlert} from "../../../redux/reducer/signInReducer";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © ' + new Date().getFullYear() + '.'}
        </Typography>
    );
}

function SignIn() {

    const classes = useStyles();
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const {username, password} = userData
    const [typePassword, setTypePassword] = useState(false);
    const [infoAlert, setInfoAlert] = useState(null)
    const alertRedux = useSelector(state => state.signIn.alert)

    useEffect(() => {

        console.log("[SIGN IN] USE EFFECT APP: " )
        // Check tp show alert
        if (alertRedux !== undefined && alertRedux.length > 0) {
            setInfoAlert(alertRedux)
            store.dispatch(resetAlert())
        }
        //else{
        //     history.push('/dashboard')
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * Action to change username and password
     * @param event value
     */
    const onChange = event => {
        const {value, name} = event.target
        setUserData({...userData, [name]: value})
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    /**
     * Reset password and username
     */
    const onReset = () => {
        setUserData({...userData, username: '', password: ''})
        setTypePassword(false)
        setInfoAlert(null)
    }

    /**
     * Send password and username to server
     * @param event
     */
    const onSubmit = event => {
        event.preventDefault()
        if (username && password) {
            request.signIn(userData).then(res => {
                setInfoAlert(null)
                store.dispatch(signInSuccess(res.data.data))
                store.dispatch(meFromTokenSuccess(res.data.token));
                history.push('/dashboard')
            }).catch(err => {
                console.log(err.response.data.message)
                setInfoAlert(err.response.data.message)
                setUserData({...userData, password: ''})
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <MdLocalMovies/>
                </Avatar>
                <Typography component="h1" className={classes.title} variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit} onReset={onReset} noValidate>
                    <Grid container spacing={2}>
                        <Grid className={classes.username} item xs={10}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username or email"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formPassword} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={typePassword ? 'text' : 'password'}
                                    name={'password'}
                                    value={password}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setTypePassword(!typePassword)
                                                }}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {typePassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={82}
                                />
                            </FormControl>
                        </Grid>
                        <Grid container justify={"center"}>
                            {infoAlert &&
                            <Alert severity="error" variant="standard" className={classes.alert}>
                                {infoAlert}
                            </Alert>}
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            value="submit"
                            className={classes.signIn}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="reset"
                            variant="contained"
                            color="primary"
                            value="reset"
                            className={classes.reset}
                        >
                            Reset
                        </Button>
                        <Grid container justify="flex-end">
                            {/*<Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>*/}
                            <Grid item>
                                <Link href={'/signUp'} variant="body2" className={classes.link}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={10}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default SignIn;
