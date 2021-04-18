import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from '../../components/StepWrapper'
const Create = () => {
    return (
        <MainLayout>
            <StepWrapper activeStep={0}>
            <h1>Create track</h1>
            </StepWrapper>
        </MainLayout>
    );
};

export default Create;