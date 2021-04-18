import React from 'react';
import {Card, Container, Grid, Step, StepLabel, Stepper} from '@material-ui/core'
    interface StepWrapperProps {
    activeStep: number
}

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    const steps = ['Информация о треке', 'Загрузить обложку', 'Загрузить аудио']
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
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;