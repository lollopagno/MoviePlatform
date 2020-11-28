import React, {useState} from 'react'
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {useStyles} from "./styles";
import Grid from "@material-ui/core/Grid";
import ButtonToolbar from "./utility/buttonToolbar";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import {store} from "../../redux/store";
import {signOut} from "../../redux/reducer/userReducer";
import {deleteToken} from "../../redux/reducer/tokenReducer";
import history from '../../history'

function Dashboard() {

    const classes = useStyles();
    const [cardsMovies, setCardsMovies] = useState([]);

    const onClickIcon = () => {
        store.dispatch(signOut())
        store.dispatch(deleteToken())
        history.push('/signIn')
    }

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ButtonToolbar setMovies={setCardsMovies}/>
                    <IconButton aria-label="delete" className={classes.account} onClick={onClickIcon}>
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
