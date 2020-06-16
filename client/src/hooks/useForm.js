import { useState } from "react";
import { useLocalStorage } from './useLocalStorage';


// write your custom hook here to control your checkout form
export const useForm = (key, initialValues) => {
    // handle inputs
    const [setValue, storedValue] = useLocalStorage(key, initialValues);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleChanges = e => {
      console.log(e.target.name);
      setValue({
        ...storedValue,
        [e.target.name]: e.target.value
      });
    };
  
    // handleSubmit
    const handleSubmit = e => {
      e.preventDefault();
      
      setShowSuccessMessage(true);
    };
    

    // return the hook
    return [storedValue, handleChanges, handleSubmit, showSuccessMessage];
  };