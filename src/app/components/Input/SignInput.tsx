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
  value?: string;
  setState?: (string) => void;
}

const SignInput: FC<SignInputProps> = ({title, inputType, placeholder, value, setState}) => {
  return (
      <div className={`signInput`}>
        <label>{title}</label>
        <input type={inputType} placeholder={placeholder} value={value} onChange={(e) => setState?.(e.target.value)} />
      </div>
  )
}

export default SignInput;
