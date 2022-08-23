import React from 'react'
import {FieldConfig, useField} from 'formik'
import classes from './input-field.module.scss'

interface Props extends FieldConfig {
    label: string
    rows?: number
    multiline?: boolean
}

const InputField = ({label, rows, multiline, ...props}: Props) => {
    const [field, meta] = useField(props)
    return (
        <div className={classes.input}>
            <input
                placeholder=" "
                className={classes.input__field}
                {...field}
                {...props}
            />
            <label className={classes.input__label}>{label}</label>
            <div className={classes.input__error}>
                {meta.touched && Boolean(meta.error)}
                {meta.touched && meta.error}
            </div>

        </div>

    )
}

export default InputField
