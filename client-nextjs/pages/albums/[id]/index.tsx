import { useRouter } from "next/router";
import classes from "./[id].module.scss";
import { AlbumsAPI } from "../../../API/albumsAPI";
import { useSession } from "next-auth/client";

import AlbumInfo from "../../../components/album-info/album-info";
import AlbumComments from "../../../components/album-comments/album-comments";
import MainLayout from "../../../layouts/MainLayout";
import AlbumTrackList from "../../../components/album-track-list/album-track-list";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { NextThunkDispatch, wrapper } from "../../../store/index.reducer";
import { getBaseServerSideProps } from "../../../methods/getBaseServerSideProps";
import { setAlbum } from "./store/album-page.actions";

const AlbumPage = ({ album, token, userId }) => {
  const router = useRouter();
  const [session] = useSession() as any;
  const activeAlbum = useTypedSelector((state) => state.albumPage);

  return (
    <MainLayout
      title={"Музыкальная площадка - " + album.name + " - " + album.author}
      keywords={"Музыка, артисты," + album.name + album.author}
    >
      <div className={classes.albumId}>
        <div
          className={classes.albumId__title}
          onClick={() => router.push("/albums")}
        >
          К списку
        </div>
        <AlbumInfo album={album} token={token} />
        <AlbumTrackList
          album_id={album.id}
          tracks={activeAlbum?.tracks?.data}
          token={token}
          user_id={userId}
          hideSearch={true}
        />
        <AlbumComments session={session} token={token} />
      </div>
    </MainLayout>
  );
};

export default AlbumPage;

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const session = await getBaseServerSideProps({ ctx });
  const response = await AlbumsAPI.getOneAlbum(
    ctx.params.id,
    session.accessToken,
    1
  );
  const dispatch = ctx.store.dispatch as NextThunkDispatch;
  dispatch(setAlbum(response.data));

  return {
    props: {
      album: response.data,
      token: session.accessToken,
      userId: session.userId,
    },
  };
});
