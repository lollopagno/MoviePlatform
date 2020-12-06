import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle} from "@material-ui/icons";
import {useSelector} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import {request} from "../../requests/user";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(17),
        marginRight: theme.spacing(128)
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    check: {
        marginTop: theme.spacing(-7),
        marginLeft: theme.spacing(50)
    }
}));

function About() {

    const classes = useStyles()

    // todo 1- Inserire logica errore per i singoli textfiled
    // todo 2- pulsante di save
    // todo 3- inserire le funzioni asincrone (vedi in fondo file)

    // Info redux
    const reduxName = useSelector(state => state.user.name)
    const reduxUsername = useSelector(state => state.user.username)
    const reduxEmail = useSelector(state => state.user.email)

    // State check
    const [checkName, setCheckName] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    // State text field
    const [disabledName, setDisabledName] = useState(true)
    const [disabledUsername, setDisabledUsername] = useState(true)
    const [disabledEmail, setDisabledEmail] = useState(true)

    const [name, setName] = useState(reduxName)
    const [username, setUsername] = useState(reduxUsername)
    const [email, setEmail] = useState(reduxEmail)

    const handleChangeCheck = (event) => {

        switch (event.target.ariaLabel) {
            case 'Name':
                setCheckName(!checkName);
                setDisabledName(!disabledName)
                break;
            case 'Username':
                setCheckUsername(!checkUsername);
                setDisabledUsername(!disabledUsername)
                break;
            case 'Email':
                setCheckEmail(!checkEmail);
                setDisabledEmail(!disabledEmail)
                break;
            default:
                break;
        }
    };

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    return (
        <Container component={'main'} maxWidth="xs">
            <div className={classes.paper}>
                <form className={classes.form}>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <TextField
                                //helperText={errorName ? 'Name must not be empty' : ''}
                                autoComplete="fname"
                                name="name"
                                variant="standard"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={name}
                                disabled={disabledName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={onChangeName}
                            />
                            <Checkbox
                                className={classes.check}
                                checked={checkName}
                                onChange={handleChangeCheck}
                                inputProps={{'aria-label': 'Name'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                //helperText={errorName ? 'Name must not be empty' : ''}
                                autoComplete="fname"
                                name="name"
                                variant="standard"
                                required
                                fullWidth
                                id="name"
                                label="Username"
                                autoFocus
                                value={username}
                                disabled={disabledUsername}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={onChangeUsername}
                            />
                            <Checkbox
                                className={classes.check}
                                checked={checkUsername}
                                onChange={handleChangeCheck}
                                inputProps={{'aria-label': 'Username'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                //helperText={errorName ? 'Name must not be empty' : ''}
                                autoComplete="fname"
                                name="name"
                                variant="standard"
                                required
                                fullWidth
                                id="name"
                                label="Email"
                                autoFocus
                                value={email}
                                disabled={disabledEmail}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={onChangeEmail}
                            />
                            <Checkbox
                                className={classes.check}
                                checked={checkEmail}
                                onChange={handleChangeCheck}
                                inputProps={{'aria-label': 'Email'}}
                            />
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}


/**
 * Check if the email is format valid
 */
async function isEmailFormatValid(email) {
    const res = await request.isValidEmail(email)
    return [res.data.email, res.data.message]
}

/**
 * Check if the email is already present
 */
async function isEmailValid(email) {
    const users = await request.sameField("email", email)
    const usernameDb = users.data.data
    if (usernameDb !== []) {
        if (usernameDb.email === email) {
            return false
        }
    }
    return true
}

/**
 * Check if the username is already present
 */
async function isUserValid(username) {
    const users = await request.sameField("username", username)
    const usernameDb = users.data.data
    if (usernameDb !== []) {
        if (usernameDb.username === username) {
            return false
        }
    }
    return true
}

export default About
