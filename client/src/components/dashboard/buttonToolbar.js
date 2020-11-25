import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {requestFilm} from "../../requests/movies";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
    toolbarLink: {
        marginLeft: theme.spacing(140),
    },
    link: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1.5),
        flexShrink: 0,
    },
    media: {
        height: 150,
        paddingTop: '56.25%', // 16:9
    },
    card: {
        maxWidth: 150,
    },
    typography: {
        height: 70
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

    // State for Menu item movies
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        if (event.currentTarget.id === '1') {
            requestFilm.popular().then(res => {
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
            requestFilm.topRated().then(res => {
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
            requestFilm.upcoming().then(res => {
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
        <Grid container className={classes.toolbarLink}>
            {sectionsMenu.map((section, i) => (
                <Grid key={section.id}>
                    <List component="nav" aria-label="Device settings" key={section.id}>
                        <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label={section.title}
                            className={classes.link}
                            onClick={handleClickListItem}
                        >
                            <ListItemText
                                primary={section.title}/>
                        </ListItem>
                    </List>
                    {section.id === 0 && <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
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
                    }
                </Grid>
            ))}
        </Grid>
    )
}

function Cards(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={props.movie.img}
                title={"Img" + props.movie.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p"
                            className={classes.typography}>
                    <strong>Name</strong>: {props.movie.title}<br/><strong>Language</strong>: {props.movie.language}<br/><strong>Release
                    date</strong>: {props.movie.date}<br/><strong>Vote</strong>: {props.movie.vote}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}


export default ButtonToolbar;
