import * as PlayerActionCreators from "../components/player/store/player.actions";
import * as PlaylistActionCreators from "../components/player/store/playlist.actions";

export default {
  ...PlayerActionCreators,
  ...PlaylistActionCreators,
};
