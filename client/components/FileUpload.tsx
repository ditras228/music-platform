import React, {useRef, useState} from 'react'
interface FileUploadProps{
    accept: string
    formik: any
}

const FileUpload: React.FC<FileUploadProps> = ({accept,formik, children, error}) => {
    const ref = useRef<HTMLInputElement>()
    const [fileName, setFileName] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onloadend = () => setFileName(file.name);
            reader.readAsDataURL(file);
        }
        if(accept==='image/*')
        formik.setFieldValue('picture', file)
        if(accept==='audio/*')
            formik.setFieldValue('audio', file)
        console.log(formik.values)
    }
    return (
        <div onClick={()=> ref.current.click()}>
            <input
                type="file"
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}


        </div>
    )
}

export default FileUpload