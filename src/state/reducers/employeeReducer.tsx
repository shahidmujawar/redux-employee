import { Action } from "../actions/index";
import { ActionTypes } from "../action-types";

export interface NotesState {
    notes: string[],
    snackbarMessage:string,
    snackbarOpen:boolean

  }
  
  const initialState = {
    notes: [],
    snackbarMessage:"Empty",
    snackbarOpen:false
  }
  
export const reducer=(state:NotesState = initialState,action:Action)=>{
    
    switch(action.type){
        
        case ActionTypes.ADD_NOTE:
            return {...state, notes: [...state.notes,action.payload]}
        
        case ActionTypes.DELETE_NOTE:{
            const notes=state.notes.slice(0);
            notes.splice(action.payload,1)
            return {...state, notes};
        }
   
        case ActionTypes.UPDATE_NOTE:
            {
                const notes=state.notes.slice(0);
                notes.splice(action.index,1,action.payload);
                return {...state,notes};
            }
        case ActionTypes.SNACKBAR_OPEN:
            {
                const snackbarMessage=action.message
                const snackbarSeverity=action.severity
                const snackbarOpen=true;
                return{...state,snackbarMessage,snackbarSeverity,snackbarOpen}
            }
        case ActionTypes.SNACKBAR_CLOSE:
            {
                const snackbarMessage=""
                const snackbarOpen=false;
                return{...state,snackbarMessage,snackbarOpen}
            }
            
        default:
            return state;
    }
}
export default reducer;