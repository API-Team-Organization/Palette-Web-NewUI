import './scss/Ratio.scss';
import {FC} from "react";

export enum RatioType {
  DISPLAY = 'DISPLAY',
  PAPER = 'PAPER',
  SQUARE = 'SQUARE',
  TABLET = 'TABLET',
}

interface RatioProps {
  ratio: RatioType;
  direction?: 'Horizontal' | 'Vertical' | null;
}

const Ratio: FC<RatioProps> = ({ratio, direction}) => {
  return (
      <div className={`ratio ${ratio}`}>
        <h1>{`${ratio} ${direction !== null ? (direction === 'Horizontal' ? '+ 가로' : '+ 세로') : ''}`}</h1>
      </div>
  )
}

export default Ratio;
