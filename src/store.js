import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

function configureStore(state = { albumList: [], filteredAlbumList: [] }) {
  return createStore(rootReducer,state);
}
export default configureStore;