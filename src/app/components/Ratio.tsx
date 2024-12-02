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
  direction?: 'Horizontal' | 'Vertical';
}

const Ratio: FC<RatioProps> = ({ratio}) => {
  return (
      <div className={`ratio ${ratio}`}>
        <h1>{ratio}</h1>
      </div>
  )
}

export default Ratio;
