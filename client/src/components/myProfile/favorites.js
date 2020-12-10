import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, {useState} from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {requestRating} from "../../requests/content/rating";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Cards from "../dashboard/utility/card";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    switchContainer: {
        marginTop: theme.spacing(5)
    },
    switch: {
        marginLeft: theme.spacing(5)
    },
    saveButton: {
        margin: theme.spacing(3),
    },
    alert:{
        marginTop: theme.spacing(2)
    }
}));

function Favorites() {

    const classes = useStyles()
    const id = useSelector(state => state.user._id)
    const [state, setState] = useState({
        movies: false,
        tvs: false,
        actors: false
    });
    const [cards, setCards] = useState([])
    const [alert, setAlert] = useState(null)

    const onChangeSwitch = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const onClickSearch = () => {
        requestRating.search(id, state.movies, state.tvs, state.actors).then((res) => {
            setAlert(null)
            setCards(<Cards result={res.data}/>)
        }).catch(err => {
            setCards([])
            setAlert(err.response.data.message)
        })
    }

    return (
        <Grid container justify={'center'} className={classes.switchContainer}>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch size="small" checked={state.movies} onChange={onChangeSwitch} name="movies"
                                     className={classes.switch}/>}
                    label="Movies"
                />
                <FormControlLabel
                    control={<Switch size="small" checked={state.tvs} onChange={onChangeSwitch} name="tvs"
                                     className={classes.switch}/>}
                    label="TV programs"
                />
                <FormControlLabel
                    control={<Switch size="small" checked={state.actors} onChange={onChangeSwitch} name="actors"
                                     className={classes.switch}/>}
                    label="Actors"
                />
            </FormGroup>
            <Button
                variant="contained"
                color="default"
                className={classes.saveButton}
                onClick={onClickSearch}
                startIcon={<SearchIcon/>}
            >
                Search
            </Button>
            {cards}
            {alert && <Grid container justify={'center'}>
                <Grid item xs={4}>
                    <Alert severity={'error'} variant="standard" className={classes.alert}>
                        {alert}
                    </Alert>
                </Grid>
            </Grid>}
        </Grid>
    )
}

export default Favorites
