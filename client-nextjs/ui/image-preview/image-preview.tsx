import React, { ReactElement } from "react";
import classes from "./image-preview.module.scss";
import Cropper from "../cropper/cropper";

global.atob = require("atob");

interface Props {
  src: string;
  previewCanvasRef: any;
}

export function dataURItoBlob(dataURI): Blob {
  if (!dataURI) {
    return null;
  }
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString });
}

const ImagePreview = ({ src, previewCanvasRef }: Props): ReactElement => {
  return (
    <div className={classes.grid}>
      <Cropper upImg={src} previewCanvasRef={previewCanvasRef} />
      <canvas ref={previewCanvasRef} className={classes.imageBig} />
    </div>
  );
};

export default ImagePreview;
