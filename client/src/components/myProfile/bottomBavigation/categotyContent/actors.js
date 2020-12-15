import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import TitleIcon from "@material-ui/icons/Title";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import {makeStyles} from "@material-ui/core/styles";
import MovieIcon from '@material-ui/icons/Movie';
import {requestNewContents} from "../../../../requests/content/newContents";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    contText: {
        marginTop: theme.spacing(1)
    },
    form: {
        width: '100%',
    },
    input: {
        display: 'none',
    },
    button: {
        marginTop: theme.spacing(4),
    },
    alertImage: {
        marginTop: theme.spacing(4),
    },
    alertInfo: {
        marginTop: theme.spacing(3),
    },
}));

function Actors(props) {

    const classes = useStyles()
    const userId = useSelector(state => state.user._id)

    // State contents
    const [field, setField] = useState({
        title: '',
        popularity: '',
        department: '',
        image: null
    })

    const [error, setError] = useState({
        title: false,
        popularity: false,
        department: false,
        image: false
    })

    const [alertImage, setAlertImage] = useState({
        text: '',
        isError: false
    })

    const [alert, setAlert] = useState({
        text: '',
        isError: false
    })

    const onChange = (event) => {
        const {name, value} = event.target
        setField({...field, [name]: value})
    }

    const onImageChange = (event) => {
        if (event.target.files[0]) {
            setField({...field, image: event.target.files[0]})
            setAlertImage({...alertImage, isError: false, text: 'Image loaded correctly!'})
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        isValidForm(error, setError, field)

        if (field.title && field.department && parseFloat(field.popularity) <= 100 && parseFloat(field.popularity) >= 0) {
            requestNewContents.addData(userId, field, props.category).then((res) => {
                // Upload image
                if (field.image !== null) {
                    requestNewContents.addImage(res.data.data._id, field.image).then((res) => {
                        setAlertImage({...alertImage, isError: false, text: ''})
                        setAlert({...alert, isError: false, text: res.data.message})
                        setField({...field, title: '', popularity: '', department: '', image: null})
                    }).catch(err => {
                        setAlert({...alert, isError: true, text: err.response.data.message})
                    })
                } else {
                    setAlertImage({...alertImage, isError: false, text: ''})
                    setAlert({...alert, isError: false, text: res.data.message})
                    setField({...field, title: '', popularity: '', department: '', image: null})
                }
            }).catch(err => {
                setAlertImage({...alertImage, isError: false, text: ''})
                setAlert({...alert, isError: true, text: err.response.data.message})
            })
        }
    }

    return (
        <Grid container justify={'center'}>
            <form noValidate className={classes.form} onSubmit={onSubmit}>
                <Grid container spacing={5} className={classes.contText}>
                    <Grid item xs={12}>
                        <TextField
                            error={error.title}
                            helperText={error.title ? 'Title must not be empty' : ''}
                            autoComplete="ftitle"
                            name="title"
                            variant="standard"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            autoFocus
                            value={field.title}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={error.popularity}
                            helperText={error.popularity ? 'Popularity must not be empty and not greater than 100' : ''}
                            autoComplete="fpopularity"
                            type={"number"}
                            name="popularity"
                            variant="standard"
                            required
                            fullWidth
                            id="popularity"
                            label="Popularity"
                            autoFocus
                            value={field.popularity}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ThumbUpIcon/>
                                    </InputAdornment>
                                ), inputProps: {min: 0, max: 100, step: 0.1}
                            }}
                            onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={error.department}
                            helperText={error.department ? 'Department must not be empty' : ''}
                            autoComplete="fdepartment"
                            name="department"
                            variant="standard"
                            required
                            fullWidth
                            id="department"
                            label="Department"
                            autoFocus
                            value={field.department}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MovieIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={onChange}
                        />
                    </Grid>
                </Grid>
                <Grid container justify={'center'} spacing={2}>
                    <Grid item xs={6}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={onImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    {alertImage.text &&
                    <Alert severity={alertImage.isError ? 'error' : 'success'} className={classes.alertImage}
                           variant="standard">
                        {alertImage.text}
                    </Alert>}
                </Grid>
                <Grid container justify={'center'}>
                    <Grid item xs={6}>
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
                    {alert.text &&
                    <Alert severity={alert.isError ? 'error' : 'success'} className={classes.alertInfo}
                           variant="standard">
                        {alert.text}
                    </Alert>}
                </Grid>
            </form>
        </Grid>
    )
}

export default Actors

function isValidForm(error, setError, field) {
    setError({
        ...error,
        title: field.title === '',
        department: field.department === '',
        popularity: (field.popularity === '' || (parseFloat(field.popularity) > 100 || parseFloat(field.popularity) < 0)),
        image: field.image === null
    })
}
