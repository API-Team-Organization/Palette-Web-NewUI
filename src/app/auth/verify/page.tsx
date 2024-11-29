'use client'
import './verify.scss'
import {useRef, useState} from "react";

export default function Page () {
  const logoRef = useRef(null);
  const textBoxRef = useRef(null);
  const inputRefs = useRef([]);
  const [code, setCode] = useState(Array(6).fill(""));

  const handleKeyDown = (e) => {
    const index = inputRefs.current.indexOf(e.target);

    if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      // 현재 인풋 값 비우기
      setCode((prevOtp) => [
        ...prevOtp.slice(0, index),
        "",
        ...prevOtp.slice(index + 1),
      ]);

      // Backspace일 때 이전 인풋으로 포커스 이동
      if (e.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setCode((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleInputFocus = (e) => {
    e.target.select();
    if (logoRef.current) {
      // @ts-ignore
      logoRef.current.style.filter = 'blur(0.25rem)';
    }
    if (textBoxRef.current) {
      // @ts-ignore
      textBoxRef.current.style.filter = 'blur(0.3rem)';
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${code.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setCode(digits);
  };

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

  const resendHandler = () => {}

  return (
      <div className={`verifyContainer`}>
        <div className={'bgWrapper'}>
          <div className={`blurBox`} />
          <div className={`logo`} ref={logoRef} />
          <div className={`textBox`} ref={textBoxRef}>
            <h1>Check your Inbox</h1>
            <h3 style={{marginTop: '1rem'}}>우리가 gk7734@duck.com 으로 코드를 보냈습니다.</h3>
            <h3>코드를 입력해 주십시오.</h3>
          </div>
          <form className={`verifyForm`}>
            <div className={`inputBox`}>
              {code.map((digit, idx) => {
                return (
                    <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onPaste={handlePaste}
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                    />
                )
              })}
            </div>
            <p onClick={resendHandler}>Resend Code</p>
          </form>
        </div>
      </div>
  )
}
