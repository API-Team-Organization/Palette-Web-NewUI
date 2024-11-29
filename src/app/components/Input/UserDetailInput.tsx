import {FC} from "react";

import '../scss/Input/UserDetailInput.scss'

interface UserDetailInputProps {
  inputType: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const UserDetailInput: FC<UserDetailInputProps> = ({inputType, placeholder, onBlur, onFocus}) => {
  return (
      <input className={`userDetailInput`} type={inputType} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} />
  )
}

export default UserDetailInput;
