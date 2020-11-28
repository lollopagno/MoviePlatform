import {makeStyles} from "@material-ui/core/styles";

const VIOLA = "#8000ff"
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title:{
        margin: theme.spacing(1,2,0,0),
    },
    avatar: {
        margin: theme.spacing(1,2,0,0),
        backgroundColor: VIOLA,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    signIn: {
        margin: theme.spacing(-1, 9, 3),
        width: 120,
        height: 50
    },
    reset: {
        margin: theme.spacing(-1, -6, 3),
        width: 120,
        height: 50
    },
    formPassword: {
        width: '42ch',
        margin: theme.spacing(0, 0, 3, 4)
    },
    username: {
        marginLeft: theme.spacing(4)
    },
    link: {
        margin: theme.spacing(0, 12.5, 0)
    },
    alert: {
        margin: theme.spacing(0, 5.5, 4, 5),
    }
}));

export {useStyles}
