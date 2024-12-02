import {FC} from "react";

import '../scss/Input/UserDetailInput.scss'

interface UserDetailInputProps<> {
  inputType: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string | number;
  setState?: (value: string) => void;
  onChange?: (e: any) => void;
}

const UserDetailInput: FC<UserDetailInputProps> = ({inputType, placeholder, onBlur, onFocus, value, setState, onChange}) => {
  return (
      <input className={`userDetailInput`}
             type={inputType}
             placeholder={placeholder}
             onBlur={onBlur}
             onFocus={onFocus}
             value={String(value)}
             onChange={(e) => inputType === 'text' ? setState?.(e.target.value) : onChange?.(e)}
      />
  )
}

export default UserDetailInput;
