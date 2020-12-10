import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    box:{
      marginLeft: theme.spacing(135)
    },
    bottomNavigation: {
        width: 500,
        margin: theme.spacing(4, 0, 0, 65)
    },
    divider:{
        marginTop: theme.spacing(3)
    }
}));

export {useStyles}
