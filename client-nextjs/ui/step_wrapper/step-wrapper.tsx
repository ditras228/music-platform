import React from 'react';
import classes from './step-wrapper.module.css'

interface StepWrapperProps {
    steps: Array<String>
    activeStep: number
}

const StepWrapper: React.FC<StepWrapperProps> = ({steps, activeStep, children}) => {
    return (
        <div>
            <div>
                {steps.map((step, index) =>
                    <div
                        key={index}
                    >
                        <div>
                            {step}
                        </div>
                    </div>
                )}
            </div>
            <div>
                <div className={classes.card}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default StepWrapper;
