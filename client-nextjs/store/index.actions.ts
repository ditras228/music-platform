import * as PlayerActionCreators from "../components/player/store/player.actions";
import * as PlaylistActionCreators from "../components/playlist/store/playlist.actions";
import * as NavbarActionCreators from "../components/navbar/store/navbar.actions";

export default {
  ...PlayerActionCreators,
  ...PlaylistActionCreators,
  ...NavbarActionCreators,
};
