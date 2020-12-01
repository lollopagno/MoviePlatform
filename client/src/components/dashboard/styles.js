import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    dividerCategory: {
        marginLeft: theme.spacing(39.5),
    },
    dividerSearchBar:{
        margin: 0.5,
        height: 20,
    },
    category: {
        marginTop: theme.spacing(4),
        fontSize: 25,
    },
    homeIcon: {
        marginLeft: theme.spacing(34),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(2),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '28ch',
        },
    },
    noticeIcon: {
        marginLeft: theme.spacing(10)
    },
    checkIcon: {
        marginLeft: theme.spacing(1)
    },
    deleteIcon: {
        marginRight: theme.spacing(1)
    }
}));

export {useStyles}
