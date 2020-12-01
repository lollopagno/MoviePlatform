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

function Dashboard() {

    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('Movies Popular')
    const [contentSearch, setContentSearch] = useState('')

    const onClickHome = () => {
        window.location.reload()
    }

    const onChangeSearch = (event) => {
        setContentSearch(event.target.value)
    }

    const onClickDeleteIcon = () => {
        console.log('on click delete')
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
                            placeholder={category.includes('Movies') ? 'Search movies' : category.includes('Tv') ? 'Search tv programs' : 'Search actors'}
                            onChange={onChangeSearch}
                            classes={{root: classes.inputRoot, input: classes.inputInput}}
                            value={contentSearch}
                            inputProps={{'aria-label': 'search '}}
                            endAdornment={
                                <InputAdornment position={'end'} >
                                    <IconButton size="small" onClick={onClickDeleteIcon} color={'inherit'}>
                                        <ClearIcon />
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
                <Grid item xs={3}>
                    <Typography gutterBottom variant="subtitle1" className={classes.category}>
                        {category}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={7} className={classes.divider}>
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
