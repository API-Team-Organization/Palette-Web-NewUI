import './register.scss'
import AuthNavbar, {AuthType} from "@/app/components/Navbar/AuthNavbar";

export default function Page() {
  return (
      <section className={`container`}>
        <AuthNavbar auth={AuthType.SignUp} />
      </section>
  )
}
