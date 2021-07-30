import { Button } from "@material-ui/core";
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch } from "react-redux";

const DeleteEmployee=(index:any)=>{
    const dispatch = useDispatch();

    const { deleteNote,openSnackbar } = bindActionCreators(actionCreators, dispatch)

    const handleDelete=()=>{
        deleteNote(index);
        openSnackbar("error","Deleted Employee successfully");
    }
    return(
        <>
         <Button variant="contained" color="secondary" onClick={handleDelete}>
                                    Delete
                                </Button>
        </>
    )
}
export default DeleteEmployee;