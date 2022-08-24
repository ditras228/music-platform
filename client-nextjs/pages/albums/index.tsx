import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import classes from "./index.module.scss";
import AlbumList from "../../components/album-list/album-list";
import { fetchAlbums, searchAlbums } from "./store/album.actions";
import { NextThunkDispatch, wrapper } from "../../store/index.reducer";
import { getBaseServerSideProps } from "../../methods/getBaseServerSideProps";

const Index = ({ token, userId }) => {
  const router = useRouter();
  const { albums, error } = useTypedSelector((state) => state.album);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: async (values) => {
      await handleSearch(values);
    },
  });
  const handleSearch = async (values) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchAlbums(values, token));
      }, 500)
    );
  };

  if (error) {
    return (
      <MainLayout title={error}>
        <div className={classes.error}>
          <h2>{error}</h2>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout title={"Альбомы"}>
      <div className={classes.albums}>
        <div className={classes.albums__top}>
          <div className={classes.albums__top__title}> Альбомы</div>
          <div
            className={classes.albums__top__createBtn}
            onClick={() => router.push("/albums/create")}
          >
            Загрузить
          </div>
        </div>

        <AlbumList albums={albums} token={token} userId={userId} />
      </div>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getBaseServerSideProps({ ctx });
  const dispatch = ctx.store.dispatch as NextThunkDispatch;

  await dispatch(fetchAlbums(session.accessToken));

  return {
    props: {
      token: session.accessToken || null,
      userId: session.userId || null,
    },
  };
});
