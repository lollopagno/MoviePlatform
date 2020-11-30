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

function Dashboard() {

    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('')
    const [contentSearch, setContentSearch] = useState('')

    const onChangeSearch = (event) => {
        setContentSearch(event.target.value)
    }

    const onClickDeleteIcon = () => {
        setContentSearch('')
    }

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ButtonToolbar setCards={setCards} category={setCategory}/>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <IconButton size="small" className={classes.deleteIcon} onClick={onClickDeleteIcon}>
                            <ClearIcon style={{color: 'white'}}/>
                        </IconButton>
                        <InputBase
                            placeholder={category.includes('movies')? 'Search movies' : category.includes('tv')? 'Search tv programs' : 'Search actors'}
                            onChange={onChangeSearch}
                            classes={{root: classes.inputRoot, input: classes.inputInput}}
                            inputProps={{ 'aria-label': 'search '}}
                        />
                    </div>
                    <IconButton className={classes.iconNotice} aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={0} /* todo imposta il numero di notifiche*/ color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Account />
                </Toolbar>
            </AppBar>
            <Grid container justify={'center'}>
                <Typography gutterBottom variant="h5" className={classes.category}>
                    <strong>{category.toUpperCase()}</strong>
                </Typography>
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
