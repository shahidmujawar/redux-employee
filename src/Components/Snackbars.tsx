import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { NotesState } from '../state/reducers/employeeReducer';
import Snackbar from '@material-ui/core/Snackbar';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Snackbars=()=> { 
    const object: any = useSelector((state: NotesState) => state);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const { deleteNote,closeSnackbar } = bindActionCreators(actionCreators, dispatch)
    const openSBn=object.notes.snackbarOpen;
   
    const handleClose=()=>{
      closeSnackbar();
  }
      setOpen(false);
      
    return (
        <>
       <Snackbar open={openSBn} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={object.notes.snackbarSeverity}>
            {object.notes.snackbarMessage}
          </Alert>
        </Snackbar>
        </>
        )
}

export default Snackbars;