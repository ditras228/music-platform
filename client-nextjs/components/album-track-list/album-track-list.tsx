import React, { useEffect } from "react";
import classes from "./album-track-list.module.scss";
import { useDispatch } from "react-redux";
import TrackItem from "../track-item/track-item";
import { ITrack } from "../../types/track";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TrackSearch from "../track-search/track-search";
import { fetchAlbumNext } from "../../pages/albums/store/album.actions";
import { AlbumPageActionTypes } from "../../types/album-page";

interface TrackListProps {
  tracks: ITrack[];
  token: string;
  user_id: number;
  album_id: number;
  view?: string;
  hideSearch?: boolean;
}

const AlbumTrackList: React.FC<TrackListProps> = ({
  token,
  user_id,
  view,
  hideSearch,
  album_id,
}) => {
  const { tracks, isFetching } = useTypedSelector((state) => state.albumPage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", null);
    };
  }, []);

  useEffect(() => {
    if (
      tracks?.last_page &&
      isFetching === true &&
      tracks.last_page != tracks.current_page
    ) {
      dispatch(fetchAlbumNext(album_id, token, tracks.current_page + 1));
    }
  }, [isFetching]);

  const scrollHandler = (e): void => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch({ type: AlbumPageActionTypes.SET_IS_FETCHING, payload: true });
    }
  };

  return (
    <div className={classes.trackList}>
      <TrackSearch token={token} hideSearch={hideSearch}></TrackSearch>
      <div className={classes.trackList__content}>
        {tracks?.data.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            token={token}
            view={view}
            userId={user_id}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumTrackList;
