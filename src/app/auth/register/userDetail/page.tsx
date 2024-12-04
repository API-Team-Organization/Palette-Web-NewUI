'use client'
import './userDetail.scss'
import { FaChevronRight } from "react-icons/fa6";
import {useRef} from "react";
import useRegisterStore from "@/app/store/useRegisterStore";
import UserDetailInput from "@/app/components/Input/UserDetailInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from 'js-cookie';
import {env} from "next-runtime-env";

export default function Page () {
  const logoRef = useRef(null);
  const textBoxRef = useRef(null);
  const router = useRouter();
  const { email, password, username, setUsername, birth, setDay, setMonth, setYear } = useRegisterStore();

  const handleYearChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 4) { // 최대 4자리
      setYear(value);
    }
  };

  const handleMonthChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 2 && value <= 12) { // 최대 2자리
      setMonth(value);
    }
  };

  const handleDayChange = (e: any) => {
    const value = e.target.value;
    if (value.length <= 2 && value <= 31) { // 최대 2자리
      setDay(value);
    }
  };

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

  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        setUsername('');
        setYear(0);
        setMonth(0);
        setDay(0);
        router.back();
        return;
      }

      if (username && birth.year && birth.month && birth.day) {
        await axios.post(`${env('NEXT_PUBLIC_API_URL')}/auth/register`, {
          username,
          email,
          password,
          birthDate: `${birth.year}-${birth.month}-${birth.day}`
        }).then((res) => {
          if (res.status === 200) {
            Cookies.set('access_token', res.headers["x-auth-token"]);
            router.push('/auth/verify');
          }
        });
      }
    } catch (err) {
      console.log(err)
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
            <h3><span className={`signBack`} onClick={() => window.location.href='/auth/register'}>뒤로가기</span> 눌러 다른 이메일을 사용해 보십시오.</h3>
          </div>
          <form className={`userDetailForm`} onSubmit={submitHandler}>
            <UserDetailInput
                inputType={'text'}
                placeholder={'username'}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={username}
                setState={setUsername}
            />
            <div className={`inputBox`}>
              <UserDetailInput
                  inputType={'number'}
                  placeholder={'year'}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  value={birth.year === 0 ? '' : birth.year}
                  onChange={handleYearChange}
              />
              <UserDetailInput
                  inputType={'number'}
                  placeholder={'month'}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  value={birth.month === 0 ? '' : birth.month}
                  onChange={handleMonthChange}
              />
              <UserDetailInput
                  inputType={'number'}
                  placeholder={'day'}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  value={birth.day === 0 ? '' : birth.day}
                  onChange={handleDayChange}
              />
              <button className={`submitBtn`} type={"submit"}>
                <FaChevronRight size={20} className={`rightIcon`} />
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}
