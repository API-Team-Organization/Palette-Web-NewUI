'use client'
import './userDetail.scss'
import { FaChevronRight } from "react-icons/fa6";
import UserDetailInput from "@/app/components/Input/UserDetailInput";
import {useRef} from "react";

export default function Page () {
  const logoRef = useRef(null);
  const textBoxRef = useRef(null);

  const handleInputFocus = () => {
    if (logoRef.current) {
      // @ts-ignore
      logoRef.current.style.filter = 'blur(0.25rem)';
    }
    if (textBoxRef.current) {
      // @ts-ignore
      textBoxRef.current.style.filter = 'blur(0.3rem)';
    }
  }

  const handleInputBlur = () => {
    if (logoRef.current) {
      // @ts-ignore
      logoRef.current.style.filter = 'blur(0)';
    }
    if (textBoxRef.current) {
      // @ts-ignore
      textBoxRef.current.style.filter = 'blur(0)';
    }
  }

  return (
      <div className={`userDetailContainer`}>
        <div className={'bgWrapper'}>
          <div className={`blurBox`} />
          <div className={`logo`} ref={logoRef} />
          <div className={`textBox`} ref={textBoxRef}>
            <h1>Create an Account</h1>
            <h3 style={{marginTop: '1rem'}}>새로운 사용자를 만들지 않으셨나요? </h3>
            <h3><span className={`signBack`} onClick={() => window.location.href='/auth/register'}>뒤로가</span> 다른 이메일을 사용해 보십시오.</h3>
          </div>
          <form className={`userDetailForm`}>
            <UserDetailInput inputType={'text'} placeholder={'username'} onFocus={handleInputFocus} onBlur={handleInputBlur} />
            <div className={`inputBox`}>
              <UserDetailInput inputType={'number'} placeholder={'year'} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              <UserDetailInput inputType={'number'} placeholder={'month'} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              <UserDetailInput inputType={'number'} placeholder={'day'} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              <button className={`submitBtn`}>
                <FaChevronRight size={20} className={`rightIcon`} />
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
