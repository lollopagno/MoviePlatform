import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, Edit} from "@material-ui/icons";
import {useSelector} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import {request} from "../../../requests/user";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {Alert} from "@material-ui/lab";
import {changeData} from "../../../redux/reducer/userReducer";
import {store} from "../../../redux/store";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
    },
    contText: {
        marginTop: theme.spacing(5)
    },
    check: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(5),
    },
    alert:{
        marginTop : theme.spacing(3)
    }
}));

function About() {

    const classes = useStyles()
    const userId = useSelector(state => state.user._id)

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

    // State error
    const [errorName, setErrorName] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    const [blankFieldUsername, setBlankUsername] = useState(false)
    const [errorEmail, setErrorEmail] = useState({
        isError: false,
        text: ''
    })

    // State alert
    const [alert, setAlert] = useState({
        isError: false,
        text: ''
    })

    const [open, setOpen] = useState(false);

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
        const {value} = event.target
        setUsername(value)
        request.isUserValid(value, false, userId).then(res => {
            if (!res) {
                setErrorUsername(true)
            } else {
                setErrorUsername(false)
            }
        })
    }

    const onChangeEmail = (event) => {
        const {value} = event.target
        setEmail(value)
        request.isEmailFormatValid(value).then(res => {
            if (!res[0]) {
                setErrorEmail({...errorEmail, isError: true, text: res[1]})
            } else {
                request.isEmailValid(value, false, userId).then((res) => {
                    if (!res) {
                        setErrorEmail({...errorEmail, isError: true, text: 'Email is already present!'})
                    } else {
                        setErrorEmail({...errorEmail, isError: false, text: ''})
                    }
                })
            }
        })
    }

    const onSubmit = event => {
        event.preventDefault()
        isValidForm(name, username, setErrorName, setBlankUsername, errorEmail, setErrorEmail, email)

        if (!errorName && !errorUsername && !errorEmail.isError) {
            request.updateUserData(userId, name, username, email).then((res) => {
                store.dispatch(changeData(res.data.data))
                setDisabledEmail(true)
                setDisabledUsername(true)
                setDisabledName(true)
                setCheckEmail(false)
                setCheckUsername(false)
                setCheckName(false)
                setAlert({...alert, text: res.data.message})
            }).catch((err) => {
                setAlert({...alert, text: err.response.data.message, isError: true})
            })
        }
    }

    // todo 1- far si che quando si clicca delete non parte la submit del form
    // todo 2- eliminare l'account quando si clicca nel dialog e fare signout
    const handleClickOpen = () => {
        console.log("[OPEN DIALOG]")
        setOpen(true);
    };

    const handleClose = () => {
        console.log("[CLOSE DIALOG]")
        setOpen(false);
    };

    return (
        <Grid container justify={'center'}>
            <form className={classes.form} onSubmit={onSubmit} noValidate>
                <Grid container justify={'center'}>
                    <Grid container justify={'center'} className={classes.contText}>
                        <Grid item xs={3}>
                            <TextField
                                error={errorName}
                                helperText={errorName ? 'Name must not be empty' : ''}
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
                        </Grid>
                        <Checkbox
                            icon={<EditIcon/>}
                            checkedIcon={<Edit/>}
                            color={'primary'}
                            className={classes.check}
                            checked={checkName}
                            onChange={handleChangeCheck}
                            inputProps={{'aria-label': 'Name'}}
                        />
                    </Grid>
                    <Grid container justify={'center'} className={classes.contText}>
                        <Grid item xs={3}>
                            <TextField
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
                                error={errorUsername ? true : blankFieldUsername}
                                helperText={errorUsername ? 'Username already present!' : blankFieldUsername ? 'Username must not be empty' : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={onChangeUsername}
                            />
                        </Grid>
                        <Checkbox
                            icon={<EditIcon/>}
                            checkedIcon={<Edit/>}
                            color={'primary'}
                            className={classes.check}
                            checked={checkUsername}
                            onChange={handleChangeCheck}
                            inputProps={{'aria-label': 'Username'}}
                        />
                    </Grid>
                    <Grid container justify={'center'} className={classes.contText}>
                        <Grid item xs={3}>
                            <TextField
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
                                error={errorEmail.isError}
                                helperText={errorEmail.text}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={onChangeEmail}
                            />
                        </Grid>
                        <Checkbox
                            icon={<EditIcon/>}
                            checkedIcon={<Edit/>}
                            color={'primary'}
                            className={classes.check}
                            checked={checkEmail}
                            onChange={handleChangeCheck}
                            inputProps={{'aria-label': 'Email'}}
                        />
                    </Grid>
                    <Grid container justify={'center'} spacing={3}>
                        <Grid item xs={1} >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                value={"submit"}
                                startIcon={<SaveIcon/>}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                type="delete"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={handleClickOpen}
                                startIcon={<DeleteIcon/>}
                            >
                                Delete Account
                            </Button>
                        </Grid>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Delete your account?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete the account?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary" autoFocus>
                                    Ok, delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid container justify={'center'}>
                            {alert.text &&
                            <Alert severity={alert.isError? 'error': 'success'} variant="standard" className={classes.alert}>
                                {alert.text}
                            </Alert>}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default About

function isValidForm(name, username, setErrName, setErrUsername, errorEmail, setErrorEmail, email) {
    setErrName(name === '')
    setErrUsername(username === '')
    if (!errorEmail.isError) {
        setErrorEmail({...errorEmail, isError: email === '', text: email === '' ? 'Email must not be empty!' : ''})
    }
}
