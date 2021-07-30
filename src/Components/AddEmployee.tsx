import "yup-phone";

import * as yup from 'yup';

import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@material-ui/core";
import { City, Country, State }  from 'country-state-city';
import {Field, Form, Formik, FormikProps} from 'formik';
import React from "react";
import { TextField } from "formik-material-ui";
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const AddEmployee=()=>{
    
  const dispatch = useDispatch();
  const { addNote,openSnackbar} = bindActionCreators(actionCreators, dispatch)
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /////YUP/////////
   
let validateFields = yup.object().shape({
 
    full_name: yup.string()
      .min(3,"Name should be greater than 3 alphabets")
      .required("Name required"),
    address: yup.string()
      .min(3,"Address should be greater than 3 alphabets")
      .required(),  
    contact: yup.string()
      .phone(),
    designation: yup.string()
      .min(2,"Designation should be greater than 2 alphabets")
      .required(),
    experience:yup.string()
      .min(3,"Experience should be greater than 3 alphabets")
      .required()
  });
   
  /////////FORMIK/////////
  
  /////////////////////////
   
  return (
      <>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><Typography variant="h5" component="h5" align="center" color="secondary">Add Data</Typography></DialogTitle>
        <DialogContent>
    <Formik
    initialValues={{ full_name: '', address: '', country: '',state:'',city:'', contact: '',designation:'',experience:''}}
    validationSchema={validateFields}
    validateOnChange={true}
   onSubmit={(values, actions) => {
     addNote(JSON.stringify(values))
     handleClose();
     openSnackbar("success","Added employee successfully");
    }}
  >

  {(props: FormikProps<any>) =>{
   
  return (
         <Form >
             
        <div className="col-md-3">
        
            <Field component={TextField} id="full_name" name="full_name" label="Enter Full Name" onChange={props.handleChange}/>
           
        </div>
        <div className="col-3">
        <Field type="text" component={TextField} id="address" name="address" label="Enter House no./Street" onChange={props.handleChange}/>
        <br/>
        </div>
     
        <div className="col-3">
    
        <Field as="select" id="country" name="country" onChange={props.handleChange}>
             <option value="">Select Country</option>
             {Country.getAllCountries().map((e:any, key:any) => {
							return <option value={e.isoCode}>{e.name}</option>;
						})}
           </Field>
           </div>
          
          
        <div className="col-3">
        <Field as="select" name="state" id="state" onChange={props.handleChange}>
        <option value="">Select State</option>
                {State.getStatesOfCountry(props.values.country).map((e:any, key:any) => {
							return <option value={e.isoCode}>{e.name}</option>;
						})}
        </Field>
        <br/>
        </div>
       
        <div className="col-3">
        <Field as="select" name="city" id="city">
        <option value="">Select City</option>
                {City.getCitiesOfState(props.values.country,props.values.state).map((e:any, key:any) => {
							return <option value={e.name}>{e.name}</option>;
						})}
        </Field>
        <br/>
        </div> 
        
        <div className="col-3">
       <Field type="text" component={TextField} name="contact" id="contact" label="Enter contact"/>
       <br/>
        </div>
        <div className="col-3">
     
        <Field  component={TextField} name="designation" id="designation" label="Enter Designation"/>
      
        </div>

        <div className="col-3">
        <Field id="experience" component={TextField} label="Enter Experience" name="experience"  onChange={props.handleChange}/>

       

        </div>

        <div className="col-6">
        <br/>
        <Button variant="contained" type="submit" color="secondary">Save</Button></div>
      
        </Form>
       )}}
        </Formik>
        </DialogContent>
        </Dialog>
    </>
  )
        
}
export default AddEmployee;