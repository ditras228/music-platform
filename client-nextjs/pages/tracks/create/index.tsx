import ImagePreview from "../../../ui/image-preview/image-preview";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MultiStepForm, { FormStep } from "../../../ui/step-form/multi-step-form";
import InputField from "../../../ui/input-field/input-field";
import * as Yup from "yup";
import classes from "./create.module.scss";
import MainLayout from "../../../layouts/MainLayout";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import FileUpload, { fileFormats } from "../../../ui/file-upload/file-upload";
import { wrapper } from "../../../store/index.reducer";
import {
  die,
  getBaseServerSideProps,
} from "../../../methods/getBaseServerSideProps";
import { CreateTrack } from "../../store/user.actions";
import TextArea from "../../../ui/text-area/text-area";

if (typeof window !== "undefined") {
  var WaveSurfer = require("wavesurfer.js");
}

const InfoSchema = Yup.object({
  name: Yup.string().required("Обязательно"),
  artist: Yup.string().required("Обязательно"),
});

const ImageSchema = Yup.object().shape({
  picture: Yup.mixed().required("Обязательно"),
});

const AudioSchema = Yup.object({
  audio: Yup.mixed().required("Обязательно"),
});

const Index = ({ token }) => {
  const [audio, setAudio] = useState("none");
  const [image, setImage] = useState("");

  const [audioName, setAudioName] = useState("");
  const [imageName, setImageName] = useState("");

  const router = useRouter();
  const chart = useRef(null);
  const previewCanvasRef = useRef(null);
  const redirectTo = useTypedSelector((state) => state.user.redirectTo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      router.push(`/tracks/${redirectTo}`);
    }
  }, [redirectTo, router]);

  useEffect(() => {
    if (chart.current) chart.current.innerHTML = "";

    if (typeof window !== "undefined" && audio != null) {
      const wavesurfer = WaveSurfer.create({
        container: chart.current,
        barWidth: 3,
        cursorWidth: 0,
        height: 80,
        responsive: true,
        waveColor: "#007acc",
        progressColor: "#007acc",
      });
      wavesurfer.load(audio);
    }
  }, [audio]);

  return (
    <MainLayout title={"Загрузить трек"}>
      <>
        <div ref={chart} className={classes.waveSuffer} />
        <MultiStepForm
          initialValues={{
            name: "",
            artist: "",
            lyrics: "",
            picture: undefined,
            audio: undefined,
          }}
          onSubmit={(values) => {
            dispatch(CreateTrack(values, token));
          }}
        >
          <FormStep stepName={"Аудио"} validationSchema={AudioSchema}>
            <FileUpload
              accept={fileFormats.AUDIO}
              name={"audio"}
              setAudio={setAudio}
              setFileName={setAudioName}
              fileName={audioName}
            />
          </FormStep>

          <FormStep stepName={"Инфо"} validationSchema={InfoSchema}>
            <div className={classes.createContent__info}>
              <InputField name={"name"} label={"Название трека"} />
              <InputField name={"artist"} label={"Имя исполнителя"} />
              <TextArea name={"text"} label={"Слова к треку"} rows={15} />
            </div>
          </FormStep>

          <FormStep stepName={"Обложка"} validationSchema={ImageSchema}>
            <div>
              <FileUpload
                accept={"image/*"}
                name={"picture"}
                setImage={setImage}
                setFileName={setImageName}
                fileName={imageName}
              >
                <button className={classes.createContent__btn}>
                  Загрузить изображение
                </button>
              </FileUpload>
            </div>
            <ImagePreview src={image} previewCanvasRef={previewCanvasRef} />
          </FormStep>
        </MultiStepForm>
      </>
    </MainLayout>
  );
};

export default Index;
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getBaseServerSideProps({ ctx });

  if (!session) {
    return die();
  }

  return {
    props: {
      token: session.accessToken,
    },
  };
});
