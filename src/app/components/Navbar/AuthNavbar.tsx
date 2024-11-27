import Image from "next/image";
import {FC} from "react";

export enum AuthType {
  SignUp = "SignUp",
  SignIn = "SignIn",
}

interface AuthNavbarProps {
  auth: AuthType
}

const AuthNavbar: FC<AuthNavbarProps> = ({auth}) => {
  return (
      <nav>
        <Image src={''} alt={'palette-logo-img'} />
        <div>
          <h3>Don't have an account yet?</h3>
          <div>
            {auth}
          </div>
        </div>
      </nav>
  )
}

export default AuthNavbar;
