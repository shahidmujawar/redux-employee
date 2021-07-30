
interface AddAction{
    type:"ADD_NOTE"
    payload:string
}
interface DeleteAction{
    type:"DELETE_NOTE"
    payload:number
}
interface UpdateAction{
    type:"UPDATE_NOTE",
    index:number,
    payload:string
}
interface SnackbarOpenAction{
    type:"SNACKBAR_OPEN",
    severity:string,
    message:string
}
interface SnackbarCloseAction{
    type:"SNACKBAR_CLOSE"
}
export type Action= AddAction|DeleteAction|UpdateAction|SnackbarOpenAction|SnackbarCloseAction