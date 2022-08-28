import React, { ReactElement } from "react";
import { ITrack } from "../../pages/tracks/store/track.types";
import TrackList from "../track-list/track-list";
import { useFormikContext } from "formik";

interface TrackListProps {
  tracks: ITrack[];
  token: string;
  user_id: number;
  view?: string;
  hideSearch?: boolean;
}
type formik = {
  name: "";
  artist: "";
  picture: undefined;
  tracks: Array<number>;
};
const AlbumCreateTrackListWrapper: React.FC<TrackListProps> = ({
  tracks,
  token,
  user_id,
  view,
  hideSearch,
}): ReactElement => {
  const formik = useFormikContext<formik>() as any;

  return (
    <TrackList
      tracks={tracks}
      token={token}
      user_id={user_id}
      view={view}
      hideSearch={hideSearch}
      formik={formik}
    />
  );
};

export default AlbumCreateTrackListWrapper;
