import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    account: {
        marginLeft: theme.spacing(76),
    },
    category:{
        marginTop: theme.spacing(4)
    }
}));

export {useStyles}
