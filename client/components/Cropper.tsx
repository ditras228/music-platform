import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {useFormikContext} from "formik";
import {dataURItoBlob} from "./ImagePreview";
type props={
    upImg: any,
    previewCanvasRef: any,
}

export default function Cropper({upImg, previewCanvasRef}: props) {
    const imgRef = useRef(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 });
    const { setFieldValue} = useFormikContext();
    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);
    useEffect(()=>{
        if(previewCanvasRef.current){
            setFieldValue('picture', dataURItoBlob(previewCanvasRef.current.toDataURL()))
        }
    },[crop,completedCrop])
    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        image.crossOrigin='*'

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                style={{width:300}}
            />
    );
}
