import './scss/Position.scss';
import {FC} from "react";

interface PositionProps {
  content: string;
}

const Position: FC<PositionProps> = ({content}) => {
  return (
      <div className={`position-container`}>
        <h1>{content}</h1>
        <form className={`positionFormBox`}>
          <div className={`inputBox`}>
            <div className={`positionSelect`}>
              <input type={"radio"}/>
              <label>상</label>
            </div>
            <div  className={`positionSelect`}>
              <input type={"radio"}/>
              <label>중</label>
            </div>
            <div  className={`positionSelect`}>
              <input type={"radio"}/>
              <label>하</label>
            </div>
          </div>
          <button type={"submit"}>NEXT</button>
        </form>
      </div>
  )
}

export default Position;
