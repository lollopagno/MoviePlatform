import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import TitleIcon from '@material-ui/icons/Title';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import LanguageIcon from '@material-ui/icons/Language';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {Alert} from "@material-ui/lab";
import {requestNewContents} from "../../../../requests/content/newContents";
import {useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    contText: {
        marginTop: theme.spacing(5)
    },
    form: {
        width: 450,
    },
    input: {
        display: 'none',
    },
    button: {
        marginTop: theme.spacing(4),
    },
    alert: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        marginTop: theme.spacing(5),
    },
    select: {
        width: 450
    }
}));

function MoviesTvContents(props) {

    const classes = useStyles()
    const userId = useSelector(state => state.user._id)

    // State select
    const [valueSelect, setValueSelect] = useState('');
    const [openSelect, setOpenSelect] = useState(false);

    // State contents
    const [field, setField] = useState({
        title: '',
        date: '',
        language: '',
        vote: '',
        image: null
    })

    const [error, setError] = useState({
        title: false,
        date: false,
        language: false,
        vote: false,
        image: false
    })

    const [alert, setAlert] = useState({
        text: '',
        isError: false
    })

    const onChangeSelect = (event) => {
        setValueSelect(event.target.value);
    };

    const onCloseSelect = () => {
        setOpenSelect(false);
    };

    const onOpenSelect = () => {
        setOpenSelect(true);
    };

    const onChange = (event) => {
        const {name, value} = event.target
        setField({...field, [name]: value})
    }

    const onImageChange = (event) => {
        if (event.target.files[0]) {
            setField({...field, image: event.target.files[0]})
            setAlert({...alert, isError: false, text: 'Image loaded correctly!'})
        } else {
            setAlert({...alert, isError: true, text: "Image not loaded!"})
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        isValidForm(error, setError, field)

        if (field.title && field.date && field.language && parseFloat(field.vote) <= 10 && parseFloat(field.vote) >= 0 /*&& field.image !== null*/) {
            requestNewContents.added(userId, field, props.category).then((res) => {
                setValueSelect(1)
                setAlert({...alert, isError: false, text: "Content loaded successfully!"})
                setField({...field, title: '', date: '', vote: '', language: '', image: null})
            }).catch((err) => {
                setAlert({...alert, isError: true, text: err.response.data.message})
            })
        }
    }

    return (
        <Grid container justify={'center'}>
            <form noValidate className={classes.form} onSubmit={onSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Section</InputLabel>
                    <Select
                        className={classes.select}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openSelect}
                        onClose={onCloseSelect}
                        onOpen={onOpenSelect}
                        value={valueSelect}
                        onChange={onChangeSelect}
                    >
                        {props.category === 'Movies' && <MenuItem value={1}>Popular</MenuItem>}
                        {(props.category === 'Movies' || props.category === 'Tv') &&
                        <MenuItem value={2}>Top Rated</MenuItem>}
                        {(props.category === 'Movies' || props.category === 'Tv') &&
                        <MenuItem value={3}>Upcoming</MenuItem>}
                    </Select>
                </FormControl>
                <Grid item xs={12} className={classes.contText}>
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
                <Grid item xs={12} className={classes.contText}>
                    <TextField
                        error={error.date}
                        helperText={error.date ? 'Release date must not be empty' : ''}
                        type={"date"}
                        autoComplete="freleaseDate"
                        name="date"
                        variant="standard"
                        required
                        fullWidth
                        id="releaseDate"
                        label="Release Date"
                        autoFocus
                        value={field.date}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DateRangeIcon/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} className={classes.contText}>
                    <TextField
                        error={error.language}
                        helperText={error.language ? 'Language must not be empty' : ''}
                        autoComplete="flanguage"
                        name="language"
                        variant="standard"
                        required
                        fullWidth
                        id="language"
                        label="Language"
                        autoFocus
                        value={field.language}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} className={classes.contText}>
                    <TextField
                        error={error.vote}
                        helperText={error.vote ? 'Vote must not be empty and not greater than 10' : ''}
                        autoComplete="fvote"
                        type={"number"}
                        name="vote"
                        variant="standard"
                        required
                        fullWidth
                        id="vote"
                        label="Vote"
                        autoFocus
                        value={field.vote}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ThumbUpIcon/>
                                </InputAdornment>
                            ), inputProps: {min: 0, max: 10, step: 0.1}
                        }}
                        onChange={onChange}
                    />
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
                    {alert.text &&
                    <Alert severity={alert.isError ? 'error' : 'success'} className={classes.alert}
                           variant="standard">
                        {alert.text}
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
                </Grid>
            </form>
        </Grid>
    )
}

export default MoviesTvContents;


function isValidForm(error, setError, field) {
    setError({
        ...error,
        title: field.title === '',
        date: field.date === '',
        language: field.language === '',
        vote: (field.vote === '' || (parseFloat(field.vote) > 10 || parseFloat(field.vote) < 0)),
        image: field.image === null
    })

    // if (field.image === null) {
    //     setAlert({...alert, isError: true, text: 'Image not loaded!'})
    // }else{
    //     setAlert({...alert, isError: false, text: ''})
    // }
}
