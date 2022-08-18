import React, {useState} from 'react'
import {Form, Formik, FormikConfig, FormikHelpers, FormikValues} from 'formik'
import FormNavigation from './form-navigation'
import {Step, StepLabel, Stepper} from '@material-ui/core'

interface Props extends FormikConfig<FormikValues> {
    children: React.ReactNode
}

const MultiStepForm = ({children, initialValues, onSubmit}: Props) => {
    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children) as React.ReactElement[]
    const step = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1
    const [snapShot, setSnapshot] = useState(initialValues)

    const next = (values: FormikValues):void => {
        setStepNumber(stepNumber + 1)
        setSnapshot(values)
    }
    const previous = (values: FormikValues):void => {
        setStepNumber(stepNumber - 1)
        setSnapshot(values)

    }
    const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        if (step.props.onSubmit) {
            await step.props.onSubmit(values)
        }
        if (isLastStep) {
            return onSubmit(values, actions)

        } else {
            actions.setTouched({})
            next(values)
        }
    }

    return <div>
        <Formik
            initialValues={snapShot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}>
            {(formik) =>
                <Form>
                    <Stepper activeStep={stepNumber}>{
                        steps.map(currentStep => {
                            const label = currentStep.props.stepName

                            return <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        })
                    }</Stepper>
                    {step}
                    <FormNavigation
                        isLastStep={isLastStep}
                        hasPrevious={stepNumber > 0}
                        onBackClick={() => previous(() => formik.values)}/>
                </Form>}
        </Formik>
    </div>
}
export const FormStep = ({stepName = '', children}: any) => children
export default MultiStepForm
