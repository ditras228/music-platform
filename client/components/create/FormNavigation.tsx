import React from 'react'
import {Button} from '@material-ui/core'
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
            <Button disabled={!props.hasPrevious}  variant={'contained'} type={'button'} onClick={props.onBackClick}>Назад</Button>
            <Button type={'submit'} color={'primary'} >{props.isLastStep?'Готово    ':'Далее'}</Button>
        </div>
    )
}

export default FormNavigation