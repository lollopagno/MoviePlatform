import React from 'react'
import {Toolbar} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import {requestFilm} from '../requests/films'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar : {
        color: '#fb7a74'
    },
    toolbarLink: {
        marginLeft: 'auto',
    },
    link: {
        padding: theme.spacing(1),
        marginRight: theme.spacing(1.5),
        flexShrink: 0,
    },
}));

const sections = [
    {title: 'Films', url: '#films', value: 'films'},
    {title: 'TV programs', url: '#programsTv', value: 'tv'},
    {title: 'Actors', url: '#actors', value: 'actors'}
];

function Dashboard() {

    const classes = useStyles();

    const onClickLink = (event, data) => {

        if(data.value === 'films'){
            requestFilm.popular().then(r => console.log(r))
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.toolbarLink}>
                        {sections.map((section) => (
                            <Link
                                color="inherit"
                                noWrap
                                key={section.title}
                                variant="body2"
                                href={section.url}
                                value={section.value}
                                className={classes.link}
                                onClick={(e) => onClickLink(e, section)}
                            >
                                {section.title}
                            </Link>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Dashboard;
