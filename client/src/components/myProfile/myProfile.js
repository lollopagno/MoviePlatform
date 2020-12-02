import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Home} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FavoriteIcon from '@material-ui/icons/MeetingRoom';
import React from "react";
import {useStyles} from "./styles";
import history from '../../history'
import {store} from "../../redux/store";
import {resetUser} from "../../redux/reducer/userReducer";
import {deleteToken} from "../../redux/reducer/tokenReducer";
import {setAlert} from "../../redux/reducer/signInReducer";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox';

;

function MyProfile() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const logOut = () => {
        store.dispatch(resetUser())
        store.dispatch(deleteToken())
        store.dispatch(setAlert({alert: 'Sign out completed!', isSuccess: true}))
        history.push('/signIn')
    }

    const onClickHome = () => {
        history.push('/dashboard')
    }

    return (
        <Grid container className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.homeIcon} id="account" onClick={onClickHome}>
                        <Home style={{color: 'white'}}/>
                    </IconButton>
                    <IconButton className={classes.noticeIcon} aria-label="show 11 new notifications"
                                color="inherit">
                        <Badge badgeContent={0} /* todo imposta il numero di notifiche*/ color="secondary">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <MeetingRoomIcon style={{color: 'white'}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.bottomNavigation}
            >
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                <BottomNavigationAction label="Favorites" icon={<AddCircleOutlineIcon/>}/>
                <BottomNavigationAction label="Favorites" icon={<AccountBoxIcon/>}/>
            </BottomNavigation>
        </Grid>
    )
}

export default MyProfile;

