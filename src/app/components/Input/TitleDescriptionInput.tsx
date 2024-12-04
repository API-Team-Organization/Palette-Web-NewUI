import '../scss/Input/TitleDescriptionInput.scss'
import {FC} from "react";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import Cookies from "js-cookie";
import useStepStore from "@/app/store/useStepStore";
import {env} from "next-runtime-env";

interface TitleDescriptionInputProps {
  type: 'Title' | 'Description';
  content: string;
  value: string;
  setValue: (value: string) => void;
}

const TitleDescriptionInput: FC<TitleDescriptionInputProps> = ({type, content, value, setValue}) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  const {step, setStep} = useStepStore();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (value.trim().length > 0) {
        await axios.post(`${env('NEXT_PUBLIC_API_URL')}/chat?roomId=${roomId}`, {
          data: {
            type: "USER_INPUT",
            input: value
          }
        }, {
          headers: {
            'x-auth-token': Cookies.get('access_token')
          }
        })
            .then((res) => {
              if (res.status === 200) {
                setValue('');
                setStep(step + 1);
              }
            })
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
      <div className={`tdModal-container`}>
        <div className={`textBox`}>
          <h1>{type}</h1>
          <h2>{content}</h2>
        </div>
        <form className={`tdFormBox`} onSubmit={submitHandler}>
          <textarea
              className={`modalInput`}
              placeholder={type === 'Title' ? `제목을 입력해주세요.` : '내용을 입력해주세요.'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
          />
          <button className={`submitBtn`} type={"submit"}>NEXT</button>
        </form>
      </div>
  )
}

export default TitleDescriptionInput;
