import React from 'react'
import {FieldConfig, useField} from 'formik'
import {TextField} from '@material-ui/core'

interface Props extends FieldConfig{
    label: string
    rows?: number
    multiline?:boolean
}
const InputField = ({label, rows, multiline, ...props}: Props) => {
    const [field, meta] = useField(props)
    return (
        <TextField
            fullWidth
            label={label}
            rows={rows || 1}
            multiline={multiline || false}
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
        />
    )
}

export default InputField