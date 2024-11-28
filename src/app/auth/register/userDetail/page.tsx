import './userDetail.scss'

export default function Page () {
  return (
      <div className={`userDetailContainer`}>
        <div className={'bgWrapper'}>
          <div className={`blurBox`} />
          <div className={`logo`} />
          <div className={`textBox`}>
            <h1>Create an Account</h1>
            <h3 style={{marginTop: '1rem'}}>새로운 사용자를 만들지 않으셨나요? </h3>
            <h3><span className={`signBack`}>뒤로가기</span> 다른 이메일을 사용해 보십시오.</h3>
          </div>
        </div>
      </div>
  )
}
