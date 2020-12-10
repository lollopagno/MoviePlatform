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

const useStyles = makeStyles((theme) => ({
    contText: {
        marginTop: theme.spacing(5)
    },
    input: {
        display: 'none',
    },

}));

function MoviesTvContents() {

    const classes = useStyles()

    // State contents
    const [title, setTitle] = useState('')
    const [date, setReleaseDate] = useState('')
    const [vote, setVote] = useState('')
    const [language, setLanguage] = useState('')

    const onChangeTitle = () => {
    }

    return (
        <form>
            <Grid container justify={'center'}>
                <Grid item xs={3} className={classes.contText}>
                    <TextField
                        //helperText={errorName ? 'Name must not be empty' : ''}
                        autoComplete="ftitle"
                        name="title"
                        variant="standard"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                        value={title}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TitleIcon/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={onChangeTitle}
                    />
                </Grid>
                <Grid item xs={3} className={classes.contText}>
                    <TextField
                        //helperText={errorName ? 'Name must not be empty' : ''}
                        type={"date"}
                        autoComplete="freleaseDate"
                        name="releaseDate"
                        variant="standard"
                        required
                        fullWidth
                        id="releaseDate"
                        label="Release Date"
                        autoFocus
                        value={date}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DateRangeIcon/>
                                </InputAdornment>
                            ),
                        }}
                        //onChange={onChange}
                    />
                </Grid>
                <Grid item xs={3} className={classes.contText}>
                    <TextField
                        //helperText={errorName ? 'Name must not be empty' : ''}
                        autoComplete="flanguage"
                        name="language"
                        variant="standard"
                        required
                        fullWidth
                        id="language"
                        label="Language"
                        autoFocus
                        value={language}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LanguageIcon/>
                                </InputAdornment>
                            ),
                        }}
                        //onChange={onChangee}
                    />
                </Grid>
                <Grid item xs={3} className={classes.contText}>
                    <TextField
                        //helperText={errorName ? 'Name must not be empty' : ''}
                        autoComplete="fvote"
                        name="vote"
                        variant="standard"
                        required
                        fullWidth
                        id="vote"
                        label="Vote"
                        autoFocus
                        value={vote}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ThumbUpIcon/>
                                </InputAdornment>
                            ),
                        }}
                        //onChange={onChange}
                    />
                </Grid>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
            </Grid>
        </form>
    )
}

export default MoviesTvContents;
