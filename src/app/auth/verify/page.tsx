'use client'
import './verify.scss'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useRegisterStore from "@/app/store/useRegisterStore";

export default function Page() {
  const logoRef = useRef<HTMLDivElement | null>(null);
  const textBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // HTMLInputElement 배열로 설정
  const [code, setCode] = useState(Array(6).fill(""));
  const email = useRegisterStore(state => state.email);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const index = inputRefs.current.indexOf(e.target as HTMLInputElement); // 명시적으로 캐스팅

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
      setCode((prevOtp) => [
        ...prevOtp.slice(0, index),
        "",
        ...prevOtp.slice(index + 1),
      ]);

      if (e.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1]?.focus(); // 안전한 접근
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setCode((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < code.length - 1) {
        inputRefs.current[index + 1]?.focus(); // 안전한 접근
      }
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    if (logoRef.current) {
      logoRef.current.style.filter = "blur(0.25rem)";
    }
    if (textBoxRef.current) {
      textBoxRef.current.style.filter = "blur(0.3rem)";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
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
      logoRef.current.style.filter = "blur(0)";
    }
    if (textBoxRef.current) {
      textBoxRef.current.style.filter = "blur(0)";
    }
  };

  const confirmVerify = async () => {
    try {
      await axios
          .post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
              {
                code: code.join(""),
              },
              {
                headers: { "x-auth-token": Cookies.get("access_token") },
              }
          )
          .then((res) => {
            if (res.status === 200) {
              window.location.href = "/";
            }
          });
    } catch (err) {
      console.log(err);
    }
  };

  const resendHandler = async () => {
    try {
      await axios
          .post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/resend`,
              {},
              {
                headers: { "x-auth-token": Cookies.get("access_token") },
              }
          )
          .then((res) => {
            if (res.status === 200) {
              alert(`정상적으로 코드가 재발송이 되었습니다.`);
            }
          });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (code[code.length - 1] !== "") {
      confirmVerify();
    }
  }, [code]);

  return (
      <div className={`verifyContainer`}>
        <div className={"bgWrapper"}>
          <div className={`blurBox`} />
          <div className={`logo`} ref={logoRef} />
          <div className={`textBox`} ref={textBoxRef}>
            <h1>Check your Inbox</h1>
            <h3 style={{ marginTop: "1rem" }}>
              우리가 {email || 'user@example.com'} 으로 코드를 보냈습니다.
            </h3>
            <h3>코드를 입력해 주십시오.</h3>
          </div>
          <form className={`verifyForm`}>
            <div className={`inputBox`}>
              {code.map((digit, idx) => (
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
                        inputRefs.current[idx] = el; // 반환값 제거
                      }}
                  />
              ))}
            </div>
            <p onClick={resendHandler}>Resend Code</p>
          </form>
        </div>
      </div>
  );
}
