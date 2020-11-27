import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {requestMovies} from "../../requests/movies";
import Cards from './utility/card'

const useStyles = makeStyles((theme) => ({
    toolbarLink: {
        marginLeft: theme.spacing(2),
    }
}));

const sectionsMenu = [
    {id: 0, title: 'Movies', value: 'movies'},
    {id: 1, title: 'TV programs', value: 'tv'},
    {id: 2, title: 'Actors', value: 'actors'}
];

const sectionMovies = [
    {id: 0, value: 'Movies'},
    {id: 1, value: 'Popular'},
    {id: 2, value: 'Top Rated'},
    {id: 3, value: 'Upcoming'}
];

function ButtonToolbar(props) {

    const classes = useStyles();

    useEffect(() => {
        requestMovies.popular().then(res => {
            const movies = res.data.data.map((movie) => {
                return (
                    <Grid item xs={12} sm={6} md={2} key={movie._id}>
                        <Cards movie={movie}/>
                    </Grid>
                )
            })
            props.setMovies(movies)
        }).catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Grid container className={classes.toolbarLink}>
                {sectionsMenu.map((section, item) => (
                    <ListItemComponent item={section} key={item} setMovies={props.setMovies}/>
                ))}
            </Grid>
        </div>
    )
}

function ListItemComponent(props) {

    // State for Menu item movies
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        if (event.currentTarget.id === '1') {
            requestMovies.popular().then(res => {
                const movies = res.data.data.map((movie) => {
                    return (
                        <Grid item xs={12} sm={6} md={2} key={movie._id}>
                            <Cards movie={movie}/>
                        </Grid>
                    )
                })
                props.setMovies(movies)
            }).catch()
        } else if (event.currentTarget.id === '2') {
            requestMovies.topRated().then(res => {
                const movies = res.data.data.map((movie) => {
                    return (
                        <Grid item xs={12} sm={6} md={2} key={movie._id}>
                            <Cards movie={movie}/>
                        </Grid>
                    )
                })
                props.setMovies(movies)
            }).catch()
        } else {
            requestMovies.upcoming().then(res => {
                const movies = res.data.data.map((movie) => {
                    return (
                        <Grid item xs={12} sm={6} md={2} key={movie._id}>
                            <Cards movie={movie}/>
                        </Grid>
                    )
                })
                props.setMovies(movies)
            }).catch()
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Grid key={props.item.id}>
            <List component="nav" aria-label="Device settings" key={props.item.id}>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls={props.item.id === 0 ? "lock-menu" : null}
                    aria-label={props.item.title}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={props.item.title}/>
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={props.item.id === 0 ? anchorEl : null}
                keepMounted
                open={Boolean(props.item.id === 0 ? anchorEl : null)}
                onClose={handleClose}
            >
                {sectionMovies.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        id={option.id}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option.value}
                    </MenuItem>
                ))}
            </Menu>
        </Grid>
    )
}

export default ButtonToolbar;
