import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, Edit} from "@material-ui/icons";
import {useSelector} from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import {request} from "../../requests/user";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
    },
    contText:{
      marginTop: theme.spacing(5)
    },
    check: {
        marginTop: theme.spacing(2),
    },
    submit: {
        marginTop: theme.spacing(4)
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

    // State error
    const [errorEmail, setErrorEmail] = useState({
        isError: false,
        text: ''
    })

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
        const {value} = event.target
        console.log("[ocChangeEmail] "+value)
        setEmail(value)
        request.isEmailFormatValid(value).then(res => {
            if (!res[0]) {
                setErrorEmail({...errorEmail, isError: true, text: res[1]})
            } else {
                request.isEmailValid(value).then((res) => {
                    if (!res) {
                        console.log("ERROR")
                        setErrorEmail({...errorEmail, isError: true, text: 'Email is already present!'})
                    } else {
                        setErrorEmail({...errorEmail, isError: false, text: ''})
                    }
                })
            }
        })
    }

    const onSubmit = event => {
    }

    return (
        <Grid container justify={'center'}>
            <form className={classes.form} onSubmit={onSubmit}>
                <Grid container justify={'center'}>
                    <Grid container justify={'center'} className={classes.contText}>
                        <Grid item xs={3}>
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
                    <Grid container justify={'center'}  className={classes.contText}>
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
                        <Grid item xs={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                value={"submit"}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}
export default About
