import React, {useEffect} from 'react'
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
                    <div >
                        {error}
                    </div>
                ))

            }
        </>
    )
}

export default AlertStep
