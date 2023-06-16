import {useState} from "react";

export default function useInput (initialValue){
  const [value, setValue] = useState(initialValue);

  const onChange = e =>{
    setValue(e.target.value);
  }

  const resetField = () =>{
    setValue("");
  }

  console.log(value)
  return {
    value, onChange, resetField
  }
}