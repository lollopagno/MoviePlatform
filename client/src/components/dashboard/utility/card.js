import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
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

export default Cards;
