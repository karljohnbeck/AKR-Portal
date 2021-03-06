import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

function KyudoSuccess(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false); 
       props.handleDateChange()
    props.toggleNameEdit(true) 
    props.toggleMoreEdit(true) 
    props.toggleTeacher(true)
    };

    return (
        <div>
            <Button type="submit" variant="contained" color="primary" 
            onClick={handleClickOpen}
            style={{margin:5}}
            >
                Submit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Success! </DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        Your edits have been saved.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default  connect(mapStoreToProps)(KyudoSuccess)