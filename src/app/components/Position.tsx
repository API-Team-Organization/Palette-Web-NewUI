

import './scss/Position.scss';
import {FC, useState} from "react";

interface PositionProps {
  content: string;
}

const Position: FC<PositionProps> = ({content}) => {
  const [position, setPosition] = useState<number>(0);

  const handleChange = (event: any) => {
    setPosition(Number(event.target.value));
  };

  console.log(position);

  return (
      <div className={`position-container`}>
        <h1>{content}</h1>
        <form className={`positionFormBox`}>
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
