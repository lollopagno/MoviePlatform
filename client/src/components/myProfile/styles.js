import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    homeIcon: {
        marginLeft: theme.spacing(34),
    },
    bottomNavigation: {
        width: 500,
    },
}));

export {useStyles}
