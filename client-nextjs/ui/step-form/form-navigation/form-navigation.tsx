import React from 'react'
import {FormikValues} from 'formik'
import classes from './form-navigation.module.scss'

interface Props{
    hasPrevious?: boolean
    isLastStep?:boolean
    onBackClick: (values: FormikValues)=>void
}

const FormNavigation = (props: Props) => {
    return (
        <div className={classes.formNavigation}>
            <button className={classes.formNavigation__button}  type={"button"} disabled={!props.hasPrevious}  onClick={props.onBackClick}>Назад</button>
            <button className={classes.formNavigation__button} type={'submit'} color={'primary'} >{props.isLastStep?'Готово    ':'Далее'}</button>
        </div>
    )
}

export default FormNavigation
