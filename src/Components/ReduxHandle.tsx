import {Grid, Typography} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import AddEmployee from './AddEmployee';
import { Alert } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DeleteEmployee from './DeleteEmployee';
import { NotesState } from '../state/reducers/employeeReducer';
import Snackbar from "@material-ui/core/Snackbar";
import UpdateEmployee from './UpdateEmployee';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';

const ReduxHandle = () => {

    const object: any = useSelector((state: NotesState) => state);
    
    const dispatch = useDispatch();
    const { closeSnackbar } = bindActionCreators(actionCreators, dispatch)
    
    console.log("OBJECT",object.notes.snackbarOpen)
    const openSBn=object.notes.snackbarOpen;
    const handleClose=()=>{
        closeSnackbar();
    }
   
    return (
        <div className="App">
             <Snackbar open={openSBn} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={object.notes.snackbarSeverity}>
            {object.notes.snackbarMessage}
          </Alert>
        </Snackbar>
            <div className="content-container">
                <div className="container-fluid"></div>
                <br />
                <Typography component="h2" align="center" variant="h4" color="secondary">Employee Management</Typography>
                <AddEmployee />

                <div className="d-flex justify-content-center">
                <Grid container spacing={1} justifyContent="center">
                 
                        {(object.notes.notes.length < 1) ? <h1>No data present! Please add some data</h1> :
                            <>

                                {object && object.notes.notes.map((note: any, index = 1) => (
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                
                                    <Card variant="outlined">
                                        <CardContent style={{backgroundColor: (index%2===0)?"coral":"violet"}}>
                                    <Typography variant="h5" component="h5"> Name:{JSON.parse(note).full_name}<Typography variant="subtitle1" component="h5">ID:  ({index})</Typography></Typography>
                                    <Typography variant="subtitle1">Designation:{JSON.parse(note).designation} ({JSON.parse(note).experience})</Typography>
                                    <Typography variant="subtitle1">Address:{JSON.parse(note).address}, {JSON.parse(note).city}, {JSON.parse(note).state}, {JSON.parse(note).country}</Typography>
                                    <Typography variant="subtitle1">Contact:{JSON.parse(note).contact}</Typography>
                                    <DeleteEmployee key={index}/>
                                <UpdateEmployee payload={JSON.parse(note)}/> 
                                    </CardContent>
                                    </Card>
                                    </Grid>
                                ))
                                }
                            </>

                        }
                        </Grid>
                    </div>
                </div>
        
        </div>
    );
}
export default ReduxHandle;