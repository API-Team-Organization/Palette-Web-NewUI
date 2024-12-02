import '../scss/Button/QuestionnaireSelectButton.scss';
import useRatioDirectionStore from "@/app/store/useRatioDirectionStore";
import {RatioType} from "@/app/components/Ratio";
import {FC} from "react";

interface QuestionnaireSelectButtonProps {
  step: number;
}

const QuestionnaireSelectButton: FC<QuestionnaireSelectButtonProps> = ({step}) => {
  const { setRatio, setDirection } = useRatioDirectionStore();

  const clickHandler = async () => {
    if (step === 0) {
      try {
        console.log(step)
      } catch (err) {
        console.log(err)
      }
    } else {
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
                <div className={`selectBtn`} onClick={() => setDirection('Horizontal')}>가로</div>
                <div className={`selectBtn`} onClick={() => setDirection('Vertical')}>세로</div>
              </div>
          )
        }
        <div className={`submitBtn`} onClick={clickHandler}>NEXT</div>
      </div>
  )
}

export default QuestionnaireSelectButton;
