import "yup-phone";

import * as yup from 'yup';

import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { City, Country, State }  from 'country-state-city';
import { Field, Form, Formik, FormikProps } from 'formik';

import { TextField } from "formik-material-ui";
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useState } from "react";

const UpdateEmployee=(note:any)=>{
 
  const dispatch = useDispatch();
  const { openSnackbar} = bindActionCreators(actionCreators, dispatch)
  const [open, setOpen] = useState(false);
  const {updateNote } = bindActionCreators(actionCreators, dispatch)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   
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
   
  const object=note.payload;
  return (
      <>
    <Button variant="contained" color="primary" onClick={handleClickOpen}>
       Update
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Data</DialogTitle>
        <DialogContent>
    <Formik
    initialValues={{ full_name: object.full_name, address: object.address, country: object.country,state:object.state,city:object.city, contact: object.contact,designation:object.designation,experience:object.experience}}
    validationSchema={validateFields}
    validateOnChange={true}
   onSubmit={(values, actions) => {
     updateNote(1,JSON.stringify(values));
     console.log("VALIDATED",JSON.stringify(values));
     openSnackbar("success","Updated Values");
     handleClose();
  
    }}
  >

  {(props: FormikProps<any>) =>{
   
  return (
         <Form >
             
        <div className="col-md-3">
        
            <Field component={TextField} id="full_name" name="full_name" placeholder="Enter Full Name" onChange={props.handleChange}/>
        </div>
        <div className="col-3">
        <Field type="text" component={TextField} id="address" name="address" placeholder="Enter House no./Street" onChange={props.handleChange}/>
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
        </div>
       
        <div className="col-3">
        <Field as="select" name="city" id="city">
        <option value="">Select City</option>
                {City.getCitiesOfState(props.values.country,props.values.state).map((e:any, key:any) => {
							return <option value={e.name}>{e.name}</option>;
						})}
        </Field>
        </div> 
        
        <div className="col-3">
       <Field type="text" component={TextField} name="contact" id="contact" placeholder="Enter contact"/>
       
        </div>

        <div className="col-3">
     
        <Field type="text" component={TextField} name="designation" id="designation" placeholder="Enter Designation"/>
      
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
export default UpdateEmployee;