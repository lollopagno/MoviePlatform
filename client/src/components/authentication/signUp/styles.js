import {makeStyles} from "@material-ui/core/styles";

const VIOLA = "#8000ff"
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: VIOLA,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(4, 10, 3),
        width: 250,
        height: 40
    },
    formPassword: {
        width: '51ch',
        margin: theme.spacing(1,1,0)
    },
    link: {
        margin: theme.spacing(0, 10.5, 0)
    },
    alert: {
        margin: theme.spacing(0, 5, 0, 7)
    }
}));

export {useStyles}
