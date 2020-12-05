import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {requestMovies} from "../../../../requests/content/movies";
import Cards from '../card'
import ListItemComponent from "./listItemToolbar";
import ConnectRefused from "../connectRefused";
import {useSelector} from "react-redux";

/**
 * Menu button
 */
const sectionsMenu = [
    {id: 0, title: 'Movies', value: 'movies'},
    {id: 1, title: 'TV programs', value: 'tv'},
    {id: 2, title: 'Actors', value: 'actors'}
];


function ButtonToolbar(props) {

    const id = useSelector(state => state.user._id)

    useEffect(() => {
        props.category("Movies Popular")
        requestMovies.popular(id).then(res => {
            props.setCards(<Cards result={res.data} category={"Movies"}/>)
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
