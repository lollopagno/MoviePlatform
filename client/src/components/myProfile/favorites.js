import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, {useState} from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    switchContainer: {
        marginTop: theme.spacing(5)
    },
    switch:{
        marginLeft: theme.spacing(5)
    }
}));


function Favorites() {

    const classes = useStyles()
    const [stateSwitch, setStateSwitch] = useState({
        movies: false,
        tvs: false,
        actors: false
    });

    const handleChange = (event) => {
        setStateSwitch({...stateSwitch, [event.target.name]: event.target.checked});
    };

    return (
        <Grid container justify={'center'} className={classes.switchContainer}>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch  size="small" checked={stateSwitch.movies} onChange={handleChange} name="movies" className={classes.switch}/>}
                    label="Movies"
                />
                <FormControlLabel
                    control={<Switch  size="small" checked={stateSwitch.tvs} onChange={handleChange} name="tvs" className={classes.switch}/>}
                    label="TV programs"
                />
                <FormControlLabel
                    control={<Switch  size="small" checked={stateSwitch.actors} onChange={handleChange} name="actors" className={classes.switch}  />}
                    label="Actors"
                />
            </FormGroup>
        </Grid>
    )
}

export default Favorites
