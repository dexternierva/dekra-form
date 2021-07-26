import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({dialog, handleClick}) {

    return (
        <div>
            <Dialog
                open={dialog.state}
                onClose={handleClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialog.header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{dialog.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick} color="primary" autoFocus>
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}