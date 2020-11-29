import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    media: {
        paddingTop: '56.25%', // 16:9
        height: 240
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    typography: {
        height: 70,
        marginTop: theme.spacing(2)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}));

function Cards(props) {
    const classes = useStyles();

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {props.result.data.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} key={movie._id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={movie.img}
                                title={"Img" + movie.title}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" align="left" component="p" className={classes.typography}>
                                    <strong>Language</strong>: {movie.language}<br/>
                                    <strong>Release date</strong>: {movie.date}<br/>
                                    <strong>Vote</strong>: {movie.vote}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon style={{color: 'red'}}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Cards;
