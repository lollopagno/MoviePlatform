import React, {useState} from "react";
import {requestRating} from "../../../../requests/content/rating";
import {useSelector} from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder'

const MOVIES = 'Movies'
const TV = 'Tv'
const ACTORS = 'Actors'

function RatingContent(props) {

    const [value, setValue] = useState(props.value);
    const userId = useSelector(state => state.user._id)

    const onChangeFavorites = (event) => {

        const contentId = event.currentTarget.name.split("-")[0]
        const name = event.currentTarget.name.split("-")[1]
        setValue(event.currentTarget.value)

        switch (name) {
            case MOVIES:
                // Update rating
                console.log(contentId)
                requestRating.update(contentId, userId, MOVIES, event.currentTarget.value).then(() => {
                }).catch(err => {
                    console.log(err.response.data.message)
                })

                // Delete favorite content
                //else{}
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
        <CardActions disableSpacing>
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
