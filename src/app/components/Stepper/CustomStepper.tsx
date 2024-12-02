import {Step, Stepper} from 'react-form-stepper';

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
  return (
      <Stepper activeStep={0} connectorStyleConfig={ConnectorStyleProps} styleConfig={StepStyleProps}>
        <Step label="Ratio" />
        <Step label="Direction" />
        <Step label="Title" />
        <Step label="Description" />
        <Step label="Position" />
        <Step label="Complete" />
      </Stepper>
  )
}

export default CustomStepper;
