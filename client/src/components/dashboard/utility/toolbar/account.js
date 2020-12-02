import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {store} from "../../../../redux/store";
import {resetUser} from "../../../../redux/reducer/userReducer";
import {deleteToken} from "../../../../redux/reducer/tokenReducer";
import history from "../../../../history";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {setAlert} from "../../../../redux/reducer/signInReducer";

const useStyles = makeStyles((theme) => ({
    account: {
        marginLeft: theme.spacing(1),
    }
}))

const sectionsLogin = [
    {id: 0, value: 'Account'},
    {id: 1, value: 'My Profile'},
    {id: 2, value: 'Logout'}
];

const ID_MY_PROFILE = '1'
const ID_LOG_OUT = '2'

function Account() {

    const classes = useStyles();

    // State for Menu item account
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const onClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);

        if (event.currentTarget.id === ID_MY_PROFILE) {
            history.push('/myProfile')
        } else if (event.currentTarget.id === ID_LOG_OUT) {
            store.dispatch(resetUser())
            store.dispatch(deleteToken())
            store.dispatch(setAlert({alert: 'Sign out completed!', isSuccess: true}))
            history.push('/signIn')
        }
    }

    return (
        <div>
            <IconButton className={classes.account} id="account" onClick={onClick}>
                <AccountCircle style={{color: 'white'}}/>
            </IconButton>
            <Menu
                id="account"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {sectionsLogin.map((option, index) => (
                    <MenuItem
                        key={option.id}
                        id={option.id}
                        aria-label={sectionsLogin[0].value}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {option.value}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default Account;
