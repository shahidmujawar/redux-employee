import { Action } from "../actions/index";
import { ActionTypes } from "../action-types";
import { Dispatch } from "redux";

export const addNote=(title:string)=>{
    return{
       
            type:ActionTypes.ADD_NOTE,
            payload:title
         
    }
}

export const deleteNote=(amount:number)=>{
    return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.DELETE_NOTE,
            payload:amount

        })
    }
}

export const updateNote=(index:number,newTitle:string)=>{
        return(dispatch:Dispatch<Action>)=>{
        dispatch({
            type:ActionTypes.UPDATE_NOTE,
            index:index,
            payload:newTitle
        })
    }
}
export const openSnackbar = (severity:string,message:string) => {
    return(dispatch:Dispatch<Action>)=>{
      dispatch({
           type: ActionTypes.SNACKBAR_OPEN,
           severity:severity,
           message:message,
           });
    };
  };
  
export const closeSnackbar = () => {
    return(dispatch:Dispatch<Action>)=>{
      dispatch({
           type: ActionTypes.SNACKBAR_CLOSE
           });
    };
  };