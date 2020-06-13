import { useState } from "react";


// write your custom hook here to control your checkout form
export const useForm = (key, initialValues, cb) => {
    // handle inputs
    const [setValues, values] = useState(key, initialValues);
  
    const handleChanges = e => {
      console.log(e.target.name);
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    };
  
    // handleSubmit
    const handleSubmit = e => {
      if (e) e.preventDefault();
      cb();
    };

    // clear the form
    const clearForm = e => {
      e.preventDefault();
      setValues(initialValues);
    };


    // return the hook
    return [values, clearForm, handleSubmit, handleChanges];
  };