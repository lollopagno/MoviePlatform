import React, {useState} from "react";
import {requestMovies} from "../../../../requests/movies";
import Cards from "../card";
import {requestTV} from "../../../../requests/tv";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {requestActors} from "../../../../requests/actors";
import ConnectionRefused from "../connectionRefused";

/**
 * Sections movies
 */
const sectionsMovies = [
    {id: 0, value: 'Movies'},
    {id: 1, value: 'Popular'},
    {id: 2, value: 'Top Rated'},
    {id: 3, value: 'Upcoming'}
];

const sectionsTv = [
    {id: 0, value: 'TV programs'},
    {id: 1, value: 'Popular'},
    {id: 2, value: 'Top Rated'}
];

const MOVIES = 'Movies'
const MOVIES_POPULAR = '1', TV_POPULAR = '1'
const MOVIES_TOP_RATED = '2', TV_TOP_RATED = '2'
const MOVIES_UPCOMING = '3'
const TV = 'TV programs'
const ACTORS = 'Actors'

function ListItemComponent(props) {

    // State for Menu item toolbar
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        if (event.currentTarget.ariaLabel === MOVIES) {
            switch (event.currentTarget.id) {
                case(MOVIES_POPULAR):
                    requestMovies.popular().then(res => {
                        props.category("Movies Popular")
                        props.setCards(<Cards result={res.data}/>)
                    }).catch((err) => {
                        props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                    })
                    break;

                case(MOVIES_TOP_RATED):
                    requestMovies.topRated().then(res => {
                        props.category("Movies Top Rated")
                        props.setCards(<Cards result={res.data}/>)
                    }).catch((err) => {
                        props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                    })
                    break;

                case(MOVIES_UPCOMING):
                    requestMovies.upcoming().then(res => {
                        props.category("Movies Upcoming")
                        props.setCards(<Cards result={res.data}/>)
                    }).catch((err) => {
                        props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                    })
                    break;
                default:
                    break;
            }
        } else if (event.currentTarget.ariaLabel === TV) {
            switch (event.currentTarget.id) {
                case(TV_POPULAR):
                    requestTV.popular().then(res => {
                        props.category("Tv Popular")
                        props.setCards(<Cards result={res.data}/>)
                    }).catch((err) => {
                        props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                    })
                    break;

                case(TV_TOP_RATED):
                    requestTV.topRated().then(res => {
                        props.category("Tv Top Rated")
                        props.setCards(<Cards result={res.data}/>)
                    }).catch((err) => {
                        props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                    })
                    break;
                default:
                    break;
            }
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickListItem = (event) => {
        switch (event.currentTarget.ariaLabel) {
            case(MOVIES):
                setAnchorEl(event.currentTarget);
                break;

            case(TV):
                setAnchorEl(event.currentTarget);
                break;

            case(ACTORS):
                requestActors.popular().then(res => {
                    props.category("Actors Popular")
                    props.setCards(<Cards result={res.data}/>)
                }).catch((err) => {
                    props.setCards(<ConnectionRefused msg={err.response.data.message}/>)
                })
                break;

            default:
                break;
        }
    };

    const sections = props.item.id === 0 ? sectionsMovies : sectionsTv

    return (
        <Grid key={props.item.id}>
            <List component="nav" aria-label="Device settings" key={props.item.id}>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls={props.item.title}
                    aria-label={props.item.title}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary={props.item.title}/>
                </ListItem>
            </List>
            <Menu
                id={props.item.title}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {sections.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        id={option.id}
                        aria-label={sections[0].value}
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


export default ListItemComponent;
