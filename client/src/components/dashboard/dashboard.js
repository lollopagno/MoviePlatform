import React, {useEffect, useState} from 'react'
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Home} from "@material-ui/icons";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Hidden from "@material-ui/core/Hidden";
import Account from "./utility/toolbar/account";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DrawerComponent from "./utility/toolbar/drawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "./styles";
import {useSelector} from "react-redux";
import {requestMovies} from "../../requests/content/movies";
import Cards from "./utility/cards";
import ErrorAPI from "./utility/errorAPI";
import SearchBar from "./utility/toolbar/searchBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from '@material-ui/core/CircularProgress';
import {socket} from '../../requests/socket'
import {store} from "../../redux/store";
import {eventNotice} from "../../redux/reducer/socketReducer";

function Dashboard() {

    const classes = useStyles()

    const [cards, setCards] = useState([]);
    const [category, setCategory] = useState('Movies Popular')
    const [open, setOpen] = useState(false);
    const [backDrop, setBackdrop] = useState(true)
    const id = useSelector(state => state.user._id)
    const notice = useSelector(state => state.socket.notice)

    useEffect(() => {

        socket.on('notice new content added', (id) => {
            store.dispatch(eventNotice(id))
        })

        setCategory("Movies Popular")
        requestMovies.popular(id).then(res => {
            setBackdrop(false)
            setCards(<Cards result={res.data} category={"Movies"}/>)
        }).catch((err) => {
            setBackdrop(false)
            setCards(<ErrorAPI msg={err.response.data.message}/>)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const onClickHome = () => {
        window.location.reload()
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, open && classes.appBarShift)}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer}
                            className={clsx(
                                classes.menuButton,
                                open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <IconButton edge='start' id="account" onClick={onClickHome}>
                            <Home style={{color: 'white'}}/>
                        </IconButton>
                        <IconButton edge={'end'} aria-label="show 11 new notifications" color="inherit">
                            <Badge badgeContent={notice} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <Hidden xsDown implementation="css"><Account/></Hidden>
                        <SearchBar category={category} setCategory={setCategory} setCards={setCards}/>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    {<DrawerComponent category={setCategory} setCards={setCards} setBackDrop={setBackdrop}/>}
                </Drawer>
                <div className={classes.appBarSpacer}/>
                <Grid container>
                    <Grid item xs={12} md={8} lg={9}>
                        <Typography
                            component="h2"
                            variant="h4"
                            align="center"
                            color="textPrimary"
                            className={classes.category}
                        >
                            {category}
                        </Typography>
                        <Backdrop className={classes.backdrop} open={backDrop}>
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        {cards}
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
