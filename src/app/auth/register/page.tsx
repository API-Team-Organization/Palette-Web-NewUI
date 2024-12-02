'use client'
import './register.scss'
import AuthNavbar from "@/app/components/Navbar/AuthNavbar";
import SignInput, {InputType} from "@/app/components/Input/SignInput";
import useRegisterStore from "@/app/store/useRegisterStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const { email, password, setEmail, setPassword } = useRegisterStore();
  const router = useRouter();

  const submitHandler = (e: any) => {
    e.preventDefault()
    try {
      if (email && password) {
        router.push('/auth/register/userDetail')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
        <section className={`signup-container`}>
          <div className={'signup-wrapper'}>
            <AuthNavbar authState={true} />
            <div className={`formBox`}>
              <div className={`textBox`}>
                <h1>Welcome to Palette</h1>
                <h3>Palette와 함께 당신만의 이야기를 그려내는 창의적 여정을 시작해보세요.</h3>
              </div>
              <form className={`signup-form`} onSubmit={submitHandler}>
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
                <button className={`signupBtn`} type={"submit"}>
                  Continue
                </button>
              </form>
            </div>
          </div>
          <div className={`auth-bg`}></div>
        </section>
  )
}
