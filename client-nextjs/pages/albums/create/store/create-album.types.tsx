import { ITrack } from "../../../../types/track";

export interface CreateAlbumState {
  albumTracks: ITrack[];
}

export enum CreateAlbumActionTypes {
  ADD_TRACK_TO_ALBUM = "ADD_TRACK_TO_ALBUM",
  REMOVE_TRACK_FROM_ALBUM = "REMOVE_TRACK_FROM_ALBUM",
}

interface AddTrackToAlbum {
  type: CreateAlbumActionTypes.ADD_TRACK_TO_ALBUM;
  payload: ITrack;
}

interface RemoveTrackFromAlbum {
  type: CreateAlbumActionTypes.REMOVE_TRACK_FROM_ALBUM;
  payload: number;
}

export type CreateAlbumAction = AddTrackToAlbum | RemoveTrackFromAlbum;
