import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {requestMovies} from "../../../requests/movies";
import Cards from './card'
import ListItemComponent from "./listItemToolbar";

const useStyles = makeStyles((theme) => ({
    toolbarLink: {
        marginLeft: theme.spacing(33),
    }
}));

/**
 * Menu button
 */
const sectionsMenu = [
    {id: 0, title: 'Movies', value: 'movies'},
    {id: 1, title: 'TV programs', value: 'tv'},
    {id: 2, title: 'Actors', value: 'actors'}
];


function ButtonToolbar(props) {

    const classes = useStyles();

    useEffect(() => {
        requestMovies.popular().then(res => {
            props.category("movies popular")
            props.setCards(<Cards result={res.data}/>)
        }).catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Grid container className={classes.toolbarLink}>
                {sectionsMenu.map((section, item) => (
                    <ListItemComponent item={section} key={item} setCards={props.setCards} category={props.category}/>
                ))}
            </Grid>
        </div>
    )
}
export default ButtonToolbar;
