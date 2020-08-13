import React, { useState } from 'react';
import { DialogActions, DialogTitle, DialogContent, Button, Select, FormControl, InputLabel, DialogContentText, Dialog, makeStyles } from '@material-ui/core';
import { setDialog } from '../../../.Store/dialog.actions';
import { connect } from 'react-redux';
import { makeGrid } from '../EditorTemplates';

const useStyles = makeStyles({
    dropDown: {
        display: 'block'
    },
    select: {
        width: '100%'
    }
})

const GridSizePrompt = (props) => {
    const classes = useStyles();
    const [columns, setColumns] = useState(null);
    const [rows, setRows] = useState(null);
    const isValid = (columns && rows);

    const handleDialogCancel = () => {
        props.setDialog(false,null,0,"",{})
    }

    const openEditorWithGrid = () => {
        const html = makeGrid(columns, rows);
        const type = 'gridtemplate'

        console.log(html);

        props.setDialog(true, type, -1, html, {})
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Choose grid size</DialogTitle>
            <DialogContent>
                <FormControl className={classes.dropDown}>
                    <InputLabel htmlFor="number-columns"># columns</InputLabel>
                    <Select
                        className={classes.select}
                        native
                        value={columns}
                        onChange={(e) => setColumns(e.target.value)}
                        inputProps={{
                            name: 'columns',
                            id: 'number-columns',
                        }}
                        >
                        <option aria-label="None" value="" />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.dropDown}>
                    <InputLabel htmlFor="number-rows"># rows</InputLabel>
                    <Select
                        className={classes.select}
                        native
                        value={rows}
                        onChange={(e) => setRows(e.target.value)}
                        inputProps={{
                            name: 'columns',
                            id: 'number-rows',
                        }}
                        >
                        <option aria-label="None" value="" />
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size='small' onClick={handleDialogCancel}>Cancel</Button>
                <Button variant="contained" size='small' disabled={!isValid} onClick={openEditorWithGrid}>Continue</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        index: state.lesson.dialog.index,
        open: state.lesson.dialog.open,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setDialog: (open,type,index,html,json) => {dispatch(setDialog(open,type,index,html,json))},
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(GridSizePrompt);