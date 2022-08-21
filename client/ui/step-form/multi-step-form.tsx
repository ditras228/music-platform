import React, {useState} from 'react'
import {Form, Formik, FormikConfig, FormikHelpers, FormikValues} from 'formik'
import FormNavigation from './form-navigation/form-navigation'
import classes from './multi-step-form.module.scss'

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

    const next = (values: FormikValues): void => {
        setStepNumber(stepNumber + 1)
        setSnapshot(values)
    }
    const previous = (values: FormikValues): void => {
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
                    <div className={classes.stepForm__top}>{
                        steps.map(currentStep => {
                            const label = currentStep.props.stepName

                            return <div className={classes.stepForm__top__item} key={label}>
                                {label}
                            </div>
                        })
                    }</div>
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
