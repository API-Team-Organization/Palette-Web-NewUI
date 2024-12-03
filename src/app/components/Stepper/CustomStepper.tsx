import {Step, Stepper} from 'react-form-stepper';
import useStepStore from "@/app/store/useStepStore";

const ConnectorStyleProps = {
  disabledColor: '#818181',
  activeColor: '#3E4AED',
  completedColor: '#9ffa02',
  size: 2,
  stepSize: '4rem',
  style: 'solid'
}

const StepStyleProps = {
  activeBgColor: '#3E4AED',
  completedBgColor: '#4762f5',
  size: '4rem',
  activeTextColor: '#FFFFFF',
  completedTextColor: '#FFFFFF',
  inactiveBgColor: '#CCCCCC',
  inactiveTextColor: '#000000',
  circleFontSize: '1.45rem',
  labelFontSize: '1.4rem',
  borderRadius: '50%',
  fontWeight: 600,
}

const CustomStepper = () => {
  const step = useStepStore(state => state.step);

  return (
      <Stepper activeStep={step} connectorStyleConfig={ConnectorStyleProps} styleConfig={StepStyleProps}>
        <Step label="Ratio" />
        <Step label="Direction" />
        <Step label="Description" />
        <Step label="Title" />
        <Step label="Position" />
        <Step label="Complete" />
      </Stepper>
  )
}

export default CustomStepper;
