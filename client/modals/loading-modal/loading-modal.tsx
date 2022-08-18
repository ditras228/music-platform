import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import classes from './loading-modal.module.css'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {CircularProgress} from '@material-ui/core'

export default function LoadingModal() {
    const isLoading = useTypedSelector(state => state.user.isLoading)

    return (
        <Modal
            className={classes.modal}
            open={isLoading}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <CircularProgress className={classes.progress} disableShrink/>
        </Modal>
    );
}
