import React, {useState} from 'react'
import {Toolbar} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import {useStyles} from "./styles";
import Grid from "@material-ui/core/Grid";
import ButtonToolbar from "./utility/toolbar/buttonToolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import ClearIcon from '@material-ui/icons/Clear';
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Account from "./utility/toolbar/account";
import {Home} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckIcon from '@material-ui/icons/Check';
import Paper from "@material-ui/core/Paper";
import {requestMovies} from "../../requests/content/movies";
import Cards from "./utility/card";
import {requestTV} from "../../requests/content/tv";
import {requestActors} from "../../requests/content/actors";
import ConnectRefused from "./utility/connectRefused";
import {useSelector} from "react-redux";

const MOVIES = 'Movies'
const TV = 'Tv'
const ACTORS = 'Actors'

function Dashboard() {

    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('Movies Popular')
    const [contentSearch, setContentSearch] = useState('')
    const id = useSelector(state => state.user._id)

    const onClickHome = () => {
        window.location.reload()
    }

    const onChangeSearch = (event) => {
        setContentSearch(event.target.value)
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSearch()
        }
    }

    const onClickSearch = () => {
        setContentSearch('')
        switch (true) {

            case category.includes(MOVIES):
                setCategory("Search Movies: " + contentSearch)
                requestMovies.search(contentSearch, id).then((res) => {
                    setCards(<Cards result={res.data} category={MOVIES}/>)
                }).catch((err) => {
                    setCards(<ConnectRefused msg={err.response.data.message}/>)
                })
                break;

            case category.includes(TV):
                setCategory("Search Tv programs: " + contentSearch)
                requestTV.search(contentSearch, id).then((res) => {
                    setCards(<Cards result={res.data} category={TV}/>)
                }).catch((err) => {
                    setCards(<ConnectRefused msg={err.response.data.message}/>)
                })
                break;

            case category.includes(ACTORS):
                setCategory("Search Actors: " + contentSearch)
                requestActors.search(contentSearch, id).then((res) => {
                    setCards(<Cards result={res.data} category={ACTORS}/>)
                }).catch((err) => {
                    setCards(<ConnectRefused msg={err.response.data.message}/>)
                })
                break;

            default:
                break;
        }
    }

    const onClickDeleteIcon = () => {
        setContentSearch('')
    }

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.homeIcon} id="account" onClick={onClickHome}>
                        <Home style={{color: 'white'}}/>
                    </IconButton>
                    <ButtonToolbar setCards={setCards} category={setCategory}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder={category.includes(MOVIES) ? 'Search movies' : category.includes(TV) ? 'Search tv programs' : 'Search actors'}
                            classes={{root: classes.inputRoot, input: classes.inputInput}}
                            onChange={onChangeSearch}
                            onKeyDown={onKeyDown}
                            value={contentSearch}
                            inputProps={{'aria-label': 'search '}}
                            endAdornment={
                                <InputAdornment position={'end'}>
                                    <IconButton size="small" className={classes.deleteIcon} onClick={onClickDeleteIcon}
                                                color={'inherit'}>
                                        <ClearIcon/>
                                    </IconButton>
                                    <Paper>
                                        <Divider orientation="vertical" className={classes.dividerSearchBar}/>
                                    </Paper>
                                    <IconButton size="small" className={classes.checkIcon} onClick={onClickSearch}
                                                color={'inherit'}>
                                        <CheckIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <IconButton className={classes.noticeIcon} aria-label="show 11 new notifications"
                                color="inherit">
                        <Badge badgeContent={0} /* todo imposta il numero di notifiche*/ color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <Account/>
                </Toolbar>
            </AppBar>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '10vh'}}
            >
                <Grid item xs={6}>
                    <Typography gutterBottom variant="subtitle1" className={classes.category}>
                        {category}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={7} className={classes.dividerCategory}>
                <Divider/>
            </Grid>
            <Grid
                container
                spacing={10}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {cards}
            </Grid>
        </Grid>
    );
}

export default Dashboard;
