import React, {useState} from 'react'
import SignIn from "./authentication/signIn/signIn";
import {Toolbar} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

const sections = [
    {title: 'Films', url: '#films'},
    {title: 'TV programs', url: '#programsTv'},
    {title: 'Actors', url: '#actors'}
];

function Dashboard() {

    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            {sections.map((section) => (
                <Link
                    color="inherit"
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    className={classes.toolbarLink}
                >
                    {section.title}
                </Link>
            ))}
        </Toolbar>
    );
}

export default Dashboard;
