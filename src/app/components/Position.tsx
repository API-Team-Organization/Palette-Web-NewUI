

import './scss/Position.scss';
import {FC, useState} from "react";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import Cookies from "js-cookie";
import useStepStore from "@/app/store/useStepStore";

interface PositionProps {
  content: string;
}

const Position: FC<PositionProps> = ({content}) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');

  const [position, setPosition] = useState<number>(0);
  const {step, setStep} = useStepStore();

  const handleChange = (e: any) => {
    setPosition(Number(e.target.value));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat?roomId=${roomId}`, {
        data: {
          type: 'GRID',
          choice: [position]
        }
      }, {
        headers: {
          'x-auth-token': Cookies.get('access_token')
        }
      })
          .then((res) => {
            if (res.status === 200) {
              setStep(step + 1);
            }
          });
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <div className={`position-container`}>
        <h1>{content}</h1>
        <form className={`positionFormBox`} onSubmit={handleSubmit}>
          <div className={`inputBox`}>
            <div className={`positionSelect`}>
              <input
                  type={"radio"}
                  name={'position'}
                  value={0}
                  checked={position === 0}
                  onChange={handleChange}
              />
              <label>Top</label>
            </div>
            <div  className={`positionSelect`}>
              <input type={"radio"}
                     name={'position'}
                     value={1}
                     checked={position === 1}
                     onChange={handleChange}
              />
              <label>Middle</label>
            </div>
            <div  className={`positionSelect`}>
              <input type={"radio"}
                     name={'position'}
                     value={2}
                     checked={position === 2}
                     onChange={handleChange}
              />
              <label>Bottom</label>
            </div>
          </div>
          <button type={"submit"} className={`submitBtn`}>NEXT</button>
        </form>
      </div>
  )
}

export default Position;
