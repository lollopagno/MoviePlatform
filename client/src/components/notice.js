import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Home} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {store} from "../redux/store";
import {resetUser} from "../redux/reducer/userReducer";
import {deleteToken} from "../redux/reducer/tokenReducer";
import {socket} from "../requests/socket";
import {setAlert} from "../redux/reducer/signInReducer";
import history from "../history";
import {initialState} from "../redux/reducer/socketReducer";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeIcon: {
        marginLeft: theme.spacing(1)
    },
    alertContainer: {
        marginTop: theme.spacing(4)
    },
    alert: {
        marginTop: theme.spacing(4)
    }
}));

function Notice() {

    const classes = useStyles();
    const name = useSelector(state => state.user.name)
    const notice = useSelector(state => state.socket.notice)
    const noticeList = useSelector(state => state.socket.list)._tail

    const list = () => {
        try {
            noticeList.array.map(notice =>
                <Alert variant="standard" severity="success" className={classes.alert}>
                    {"Name: " + notice.title + " - Category: " + notice.category}
                </Alert>
            )
        } catch (err) {
        } finally {
            store.dispatch(initialState())
        }
    }

    useEffect(() => {
        // todo capire dove mettere il reset notice
        // todo verificare il giusto numero di notifiche che si creano
        // todo aggiungere il pulsante account in notice e nasconderlo lato telefono
        // todo mantenere persistente le notifiche anche quando si schiaccia la home
        // todo fare un po di refactoring nel server (ti prego)
        //store.dispatch(initialState())
    }, [])

    const logOut = () => {
        store.dispatch(resetUser())
        store.dispatch(deleteToken())
        socket.disconnect()
        store.dispatch(setAlert({alert: 'Sign out completed!', isSuccess: true}))
        history.push('/signIn')
    }

    const onClickHome = () => {
        history.push('/dashboard')
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        {"Hi " + name + ", "}
                    </Typography>
                    <IconButton id="account" onClick={onClickHome} className={classes.homeIcon}>
                        <Home style={{color: 'white'}}/>
                    </IconButton>
                    <IconButton aria-label="show 11 new notifications"
                                color="inherit">
                        <Badge badgeContent={notice} color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <MeetingRoomIcon style={{color: 'white'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            {noticeList.length > 0 &&
            <Container component="main" maxWidth="xs" className={classes.alertContainer}>
                <Grid item>
                    {list}
                </Grid>
            </Container>}
            {noticeList.length === 0 &&
            <Grid container justify={"center"} className={classes.alertContainer}>
                <Grid item xs={6}>
                    <Alert variant="standard" severity="warning">
                        There aren't notifications at this time.
                    </Alert>
                </Grid>
            </Grid>}
        </div>
    )
}

export default Notice;
