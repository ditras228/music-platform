import React, {useEffect} from 'react'
import {Alert} from '@material-ui/lab'
import {useFormikContext} from 'formik'

const AlertStep = () => {
    const formik = useFormikContext()  as any
    let errors = Array.from(formik.errors)


    for (let i = 0; i < formik.errors.length; i++) {
        errors.push(formik.errors)
    }
    useEffect(()=>{
        errors= Array.from(formik.errors)
    }, formik)
    return (
        <>
            {
                errors.map(error => (
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                ))

            }
        </>
    )
}

export default AlertStep