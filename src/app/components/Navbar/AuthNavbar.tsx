'use client'
import '../scss/Navbar/AuthNavbar.scss'
import {useRouter} from "next/navigation";
import {FC} from "react";

export interface AuthProps {
  authState?: boolean
}


const AuthNavbar: FC<AuthProps> = ({authState}) => {
  const router = useRouter();

  return (
      <nav className={`navbar`}>
        <div className={`logo`}/>
        <div className={`mainBox`}>
          <h3>Already have an account?</h3>
          <div className={`signBtn`} onClick={() => router.replace(authState ? '/auth/login' : '/auth/register')}>
            {authState ? 'SignIn' : 'SignUp'}
          </div>
        </div>
      </nav>
  )
}

export default AuthNavbar;
