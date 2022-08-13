import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from '@material-ui/core'

interface StepWrapperProps {
    steps: Array<String>
    activeStep: number
}

import classes from './StepWrapper.module.css'

const StepWrapper: React.FC<StepWrapperProps> = ({steps, activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justify={'center'} style={{margin: '70px 0', height: 270}}>
                <Card className={classes.card}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
