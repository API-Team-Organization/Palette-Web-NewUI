'use client'
import './login.scss'
import AuthNavbar from "@/app/components/Navbar/AuthNavbar";
import SignInput, {InputType} from "@/app/components/Input/SignInput";
import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submitHandler = async (e: any) => {
    e.preventDefault()
    try {
      if (email && password) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          email,
          password
        }).then((res) => {
          if (res.status === 200) {
            Cookies.set('access_token', res.headers["x-auth-token"]);
            window.location.href = '/'
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <section className={`signin-container`}>
        <div className={'signin-wrapper'}>
          <AuthNavbar authState={false}/>
          <div className={`formBox`}>
            <div className={`textBox`}>
              <h1>Welcome to Palette</h1>
              <h3>Palette와 함께 당신만의 이야기를 그려내는 창의적 여정을 시작해보세요.</h3>
            </div>
            <form className={`signin-form`} onSubmit={submitHandler} >
              <SignInput
                  title={'Email Address'}
                  inputType={InputType.EMAIL}
                  placeholder={'user@example.com'}
                  value={email}
                  setState={setEmail}
              />
              <SignInput
                  title={'Password'}
                  inputType={InputType.PASSWORD}
                  placeholder={'● ● ● ● ● ● ● ●'}
                  value={password}
                  setState={setPassword}
              />
              <button className={`signinBtn`} type={"submit"}>
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={`auth-bg`}></div>
      </section>
  )
}
