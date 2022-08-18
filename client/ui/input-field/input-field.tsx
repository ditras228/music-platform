import React from 'react'
import {FieldConfig, useField} from 'formik'

interface Props extends FieldConfig{
    label: string
    rows?: number
    multiline?:boolean
}
const InputField = ({label, rows, multiline, ...props}: Props) => {
    const [field, meta] = useField(props)
    return (
        <input
            {...field}
            {...props}
            // error={meta.touched && Boolean(meta.error)}
            // helperText={meta.touched && meta.error}
        />
    )
}

export default InputField
