import '../scss/Button/QuestionnaireSelectButton.scss';
import useRatioDirectionStore from "@/app/store/useRatioDirectionStore";
import {RatioType} from "@/app/components/Ratio";
import {FC} from "react";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import useStepStore from "@/app/store/useStepStore";
import Cookies from "js-cookie";

interface QuestionnaireSelectButtonProps {
  step: number;
}

const QuestionnaireSelectButton: FC<QuestionnaireSelectButtonProps> = ({step}) => {
  const { ratio, direction, setRatio, setDirection } = useRatioDirectionStore();
  const setStep = useStepStore(state => state.setStep);
  const searchParams = useSearchParams()
  const room = searchParams.get('room');

  const clickHandler = async () => {
    if (step === 0) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat?roomId=${room}`, {
          data: { type: "SELECTABLE", choiceId: ratio }
        }, {
          headers: { 'x-auth-token': Cookies.get('access_token') }
        })
            .then((res) => {
              if (res.status === 200) {
                setStep(1);
              }
            })
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat?roomId=${room}`, {
          data: { type: "SELECTABLE", choiceId: direction?.toUpperCase() }
        }, {
          headers: { 'x-auth-token': Cookies.get('access_token') }
        })
            .then((res) => {
              if (res.status === 200) {
                setStep(2);
              }
            });
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
      <div className={`qn-container`}>
        {
          step === 0 ? (
              <div className={`selectBox`}>
                <div className={`selectBtn`} onClick={() => setRatio(RatioType.DISPLAY)}>D</div>
                <div className={`selectBtn`} onClick={() => setRatio(RatioType.PAPER)}>P</div>
                <div className={`selectBtn`} onClick={() => setRatio(RatioType.SQUARE)}>S</div>
                <div className={`selectBtn`} onClick={() => setRatio(RatioType.TABLET)}>T</div>
              </div>
          ) : (
              <div className={`selectBox`}>
                <div className={`selectDirBtn`} onClick={() => setDirection('Horizontal')}>가로</div>
                <div className={`selectDirBtn`} onClick={() => setDirection('Vertical')}>세로</div>
              </div>
          )
        }
        <div className={`submitBtn`} onClick={clickHandler}>NEXT</div>
      </div>
  )
}

export default QuestionnaireSelectButton;
