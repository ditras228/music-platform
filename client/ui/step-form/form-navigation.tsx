import React from 'react'
import {FormikValues} from 'formik'
interface Props{
    hasPrevious?: boolean
    isLastStep?:boolean
    onBackClick: (values: FormikValues)=>void
}
const FormNavigation = (props: Props) => {
    return (
        <div
        style={{
            display: 'flex',
            marginTop: 50,
            justifyContent: 'space-between'
        }}>
            <button disabled={!props.hasPrevious}   type={'button'} onClick={props.onBackClick}>Назад</button>
            <button type={'submit'} color={'primary'} >{props.isLastStep?'Готово    ':'Далее'}</button>
        </div>
    )
}

export default FormNavigation
