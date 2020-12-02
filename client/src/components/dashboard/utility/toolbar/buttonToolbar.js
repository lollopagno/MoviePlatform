import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {requestMovies} from "../../../../requests/movies";
import Cards from '../card'
import ListItemComponent from "./listItemToolbar";
import ConnectRefused from "../connectRefused";

/**
 * Menu button
 */
const sectionsMenu = [
    {id: 0, title: 'Movies', value: 'movies'},
    {id: 1, title: 'TV programs', value: 'tv'},
    {id: 2, title: 'Actors', value: 'actors'}
];


function ButtonToolbar(props) {

    useEffect(() => {
        requestMovies.popular().then(res => {
            props.category("Movies Popular")
            props.setCards(<Cards result={res.data}/>)
        }).catch((err) => {
            props.setCards(<ConnectRefused msg={err.response.data.message}/>)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Grid container>
                {sectionsMenu.map((section, item) => (
                    <ListItemComponent item={section} key={item} setCards={props.setCards} category={props.category}/>
                ))}
            </Grid>
        </div>
    )
}
export default ButtonToolbar;
