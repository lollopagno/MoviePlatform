import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(5),
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function AddContents() {

    const classes = useStyles()
    const [valueSelect, setValueSelect] = useState('');
    const [openSelect, setOpenSelect] = useState(false);

    const onChangeSelect = (event) => {
        setValueSelect(event.target.value);
    };

    const onCloseSelect = () => {
        setOpenSelect(false);
    };

    const onOpenSelect = () => {
        setOpenSelect(true);
    };

    return (
        <Grid container>
            <Grid container justify={'center'}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openSelect}
                        onClose={onCloseSelect}
                        onOpen={onOpenSelect}
                        value={valueSelect}
                        onChange={onChangeSelect}
                    >
                        <MenuItem value={1}>Movies</MenuItem>
                        <MenuItem value={2}>Tv programs</MenuItem>
                        <MenuItem value={3}>Actors</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}


export default AddContents
