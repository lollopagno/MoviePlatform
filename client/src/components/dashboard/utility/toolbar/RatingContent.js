import React, {useState} from "react";
import {requestRating} from "../../../../requests/content/rating";
import {useSelector} from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder'
import makeStyles from "@material-ui/core/styles/makeStyles";

const MOVIES = 'Movies'
const TV = 'Tv'
const ACTORS = 'Actors'

const useStyles = makeStyles((theme) => ({
    cardAction: {
        paddingLeft: theme.spacing(1.5)
    }
}));

function RatingContent(props) {

    const classes = useStyles()
    const [value, setValue] = useState(props.value);
    const userId = useSelector(state => state.user._id)

    const onChangeFavorites = (event) => {

        const contentId = event.currentTarget.name.split("-")[0]
        const name = event.currentTarget.name.split("-")[1]
        setValue(event.currentTarget.value)

        switch (name) {
            case MOVIES:
                // Update rating
                requestRating.update(contentId, userId, MOVIES, event.currentTarget.value).then(() => {
                }).catch(err => {
                    console.log(err.response.data.message)
                })

                break;

            case TV:
                break;

            case ACTORS:
                break;

            default:
                break;
        }
    }

    return (
        <CardActions disableSpacing className={classes.cardAction}>
            <Rating
                name={props.id+"-"+props.category}
                defaultValue={0}
                value={parseInt(value)}
                precision={1}
                onChange={onChangeFavorites}
                emptyIcon={<StarBorderIcon fontSize="inherit"/>}
            />
        </CardActions>
    )
}

export default RatingContent;
