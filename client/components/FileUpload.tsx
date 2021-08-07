import React, {useRef, useState} from 'react'
import {FieldConfig, useField, useFormikContext} from 'formik'
import {Alert} from '@material-ui/lab'

interface Props extends FieldConfig{
    accept: string
    setImage?: any
    setAudio?: any

}

const FileUpload = ({accept, children, setImage, setAudio, ...props}: Props) => {
    const ref = useRef<HTMLInputElement>()
    const [fileName, setFileName] = useState("");
    const [field, meta] = useField(props)
    const { setFieldValue} = useFormikContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let file = e.target.files[0];
        let reader  = new FileReader();
        reader.onloadend = function () {
            if(accept==='image/*'){
                setImage(reader.result)
            }
            else{
                setAudio(reader.result)
            }
            setFileName(file.name)
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            if(accept==='image/*'){
                setImage('')
            }
            else{
                setAudio('none')
            }
        }
        // if(accept==='image/*'){
        //     field.value=file
        //     setFieldValue(field.name, field.value)
        // }
        if(accept==='audio/*')
            field.value=file
            setFieldValue(field.name, field.value)

    }
    return (
        <div onClick={()=> ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
                {...props}
            />
            {children}
            {meta.error
            ?<Alert severity={'error'} >{meta.error}</Alert>
            : fileName &&
                <Alert severity={'success'}>{fileName}</Alert>
            }


        </div>
    )
}

export default FileUpload