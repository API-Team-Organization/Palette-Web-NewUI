'use client'
import './register.scss'
import AuthNavbar from "@/app/components/Navbar/AuthNavbar";
import SignInput, {InputType} from "@/app/components/Input/SignInput";

export default function Page() {
  return (
        <section className={`signup-container`}>
          <div className={'signup-wrapper'}>
            <AuthNavbar authState={true} />
            <div className={`formBox`}>
              <div className={`textBox`}>
                <h1>Welcome to Palette</h1>
                <h3>Palette와 함께 당신만의 이야기를 그려내는 창의적 여정을 시작해보세요.</h3>
              </div>
              <form className={`signup-form`}>
                <SignInput
                    title={'Email Address'}
                    inputType={InputType.EMAIL}
                    placeholder={'user@example.com'}
                />
                <SignInput
                    title={'Password'}
                    inputType={InputType.PASSWORD}
                    placeholder={'● ● ● ● ● ● ● ●'}
                />
                <div className={`signupBtn`}>
                  Continue
                </div>
              </form>
            </div>
          </div>
          <div className={`auth-bg`}></div>
        </section>
  )
}
