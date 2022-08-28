import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import classes from "./track-item.module.scss";
import PlayImage from "../play-image/play-image";
import { deleteTrack } from "../../pages/tracks/store/track.actions";
import { ITrack } from "../../pages/tracks/store/track.types";

interface TrackItemProps {
  track: ITrack;
  view?: string;
  token: string;
  userId: number;
  formik?: any;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  view,
  userId,
  token,
  formik,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecked, setChecked] = useState(false);

  const deleteOne = (e): void => {
    e.stopPropagation();
    dispatch(deleteTrack(track.id, token));
  };

  const editState = (): void => {
    if (formik) {
      if (isChecked === false) {
        formik.setFieldValue(
          "tracks",
          [...formik.values.tracks, track.id],
          true
        );
      }
      if (isChecked === true) {
        formik.setFieldValue(
          "tracks",
          [
            ...formik.values.tracks.filter(
              (thisTrack) => thisTrack !== track.id
            ),
          ],
          true
        );
      }
    }
  };

  useEffect(() => {
    if (formik) {
      const trackArray = formik?.values.tracks.filter(
        (item) => item == track.id
      );
      if (trackArray[0] == track.id) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [formik?.values]);

  return (
    <div
      className={classes.track}
      onClick={() => {
        view !== "checkbox" ? router.push("/tracks/" + track.id) : editState();
      }}
    >
      <SwitchView
        view={view}
        checked={isChecked}
        deleteOne={deleteOne}
        track={track}
        userId={userId}
        editState={editState}
      />

      <div className={classes.track__info}>
        <PlayImage track={track} list={true} token={token}></PlayImage>
        <div className={classes.track__name}>
          <div>{track.name}</div>
          <div className={classes.track__author}>{track.artist}</div>
        </div>
      </div>
    </div>
  );
};

const SwitchView = ({ view, deleteOne, checked, userId, track, editState }) => {
  const isNotOwner = userId != track.user_id;

  switch (view) {
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={checked}
          onChange={() => editState()}
          name="checkbox"
          className={classes.track__delete}
        />
      );
    default:
      return (
        <button
          disabled={isNotOwner}
          className={classes.track__delete}
          onClick={(e) => deleteOne(e)}
        ></button>
      );
  }
};
export default TrackItem;
