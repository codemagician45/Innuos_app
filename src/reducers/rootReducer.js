export default (state, action) => {
  switch (action.type) {
    case "albumList":
      return {
        ...state,
        albumList: action.payload
      };
    case "filterAlbumList":
      return {
        ...state,
        filteredAlbumList: action.payload
      };
    default:
      return state;
  }
};