import '../scss/Input/SignInput.scss'
import {FC} from "react";

export enum InputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password"
}

interface SignInputProps {
  title: string;
  inputType: InputType;
  placeholder?: string;
}

const SignInput: FC<SignInputProps> = ({title, inputType, placeholder}) => {
  return (
      <div className={`signInput`}>
        <label>{title}</label>
        <input type={inputType} placeholder={placeholder}/>
      </div>
  )
}

export default SignInput;
