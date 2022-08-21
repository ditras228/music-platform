import React, {ReactElement, useRef, useState} from 'react'
import {FieldConfig, useField, useFormikContext} from 'formik'
import classes from "./file-upload.module.scss";

export const fileFormats = {
    IMAGE: 'image/*',
    AUDIO: 'audio/*'
}

interface Props extends FieldConfig {
    accept: string
    setImage?: any
    setAudio?: any
}

interface IGetTitle{
    accept: string,
    fileName: string,
    error: string
}

const FileUpload = ({accept, children, setImage, setAudio, ...props}: Props): ReactElement => {
    const ref = useRef<HTMLInputElement>()
    const [fileName, setFileName] = useState("");
    const [field, meta] = useField(props)
    const {setFieldValue} = useFormikContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            if (accept === fileFormats.IMAGE) {
                setImage(reader.result)
            } else {
                setAudio(reader.result)
            }
            setFileName(file.name)
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            if (accept === fileFormats.IMAGE) {
                setImage('')
            } else {
                setAudio('none')
            }
        }

        if (accept === fileFormats.AUDIO) {
            field.value = file
        }
        setFieldValue(field.name, field.value)
    }
    return (
        <div onClick={() => ref.current.click()}>
            <input
                type="file"
                accept={accept}
                className={classes.fileUpload__input}
                ref={ref}
                onChange={onChange}
                {...props}
            />
            <button type={'button'} className={classes.fileUpload__btn}>
                {
                  GetTitle({accept, fileName, error: meta.error})
                }
            </button>
        </div>
    )
}

function GetTitle({accept, fileName, error}: IGetTitle): string{
    if(error){
        return error
    }

    if(fileName){
        return fileName
    }

    switch (accept){
        case fileFormats.IMAGE:{
            return 'Загрузить изображение'
        }
        case fileFormats.AUDIO:{
            return 'Загрузить аудио'
        }
        default:{
            return 'Загрузить файл'
        }
    }
}


export default FileUpload
