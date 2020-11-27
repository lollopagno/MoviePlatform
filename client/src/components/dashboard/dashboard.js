import React, {useState} from 'react'
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {useStyles} from "./styles";
import Grid from "@material-ui/core/Grid";
import ButtonToolbar from "./utility/buttonToolbar";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";

function Dashboard() {

    const classes = useStyles();
    const [cardsMovies, setCardsMovies] = useState([]);

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ButtonToolbar setMovies={setCardsMovies}/>
                    <IconButton aria-label="delete" className={classes.account}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {cardsMovies}
            </Grid>
        </Grid>
    );
}

export default Dashboard;
