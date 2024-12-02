import '../scss/Button/QuestionnaireSelectButton.scss';

const QuestionnaireSelectButton = () => {
  return (
      <div className={`qn-container`}>
        <div className={`selectBox`}>
          <div className={`selectBtn`}>D</div>
          <div className={`selectBtn`}>P</div>
          <div className={`selectBtn`}>S</div>
          <div className={`selectBtn`}>T</div>
        </div>
        <div className={`submitBtn`}>NEXT</div>
      </div>
  )
}

export default QuestionnaireSelectButton;
