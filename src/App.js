import { useState } from "react";
import { connect } from "react-redux";
import { setAlbumAction } from "./actions/setAlbumAction";
import { setFilterAction } from "./actions/setFilterAction";
import "./App.scss";
import album_list from "./assets/albums.json";
import loadGif from "./assets/load.gif";

function App(props) {
  const [loading, setLoading] = useState(false);
  const getAlbumList = () => {
    setLoading(true);
    props.setAlbumAction(album_list);
    props.setFilterAction(album_list)
    setLoading(false);
  };
  const handleFilterChange = (e) => {
    let tab = e.target.value;
    console.log(typeof tab)
    if(tab === "all") props.setFilterAction(props.albumList);
    else if(tab === "local") {
      let filtered_list = props.albumList.filter((item) => {
        return item.source === "LOCAL";
      })
      props.setFilterAction(filtered_list)
    }
    else if(tab === "qobuz") {
      let filtered_list = props.albumList.filter((item) => {
        return item.source === "QOBUZ";
      })
      props.setFilterAction(filtered_list)
    }
  }
  return (
    <div className="App">
      {props.albumList.length === 0 ? (
        <div className="home-page item_center">
          <div className="get_album item_center">
            <button className="get_albums_btn" onClick={getAlbumList}>
              {loading ? <img src={loadGif} width={20} alt="" /> : "GET ALBUMS"}
            </button>
          </div>
        </div>
      ) : (
        <div className="albums_page">
          <div className="filter_part form-group row ml-0 item_center mb-5">
            <span className="text-white pr-3">Filter By:</span>
            <select className="filter_selector" onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="local">Local</option>
              <option value="qobuz">Qobuz</option>
            </select>
          </div>
          <div className="row">
            {props.filteredAlbumList.map((album, index) => {
              let album_image = `${process.env.REACT_APP_URL}/assets/images/undefined_album_cover.png`;
              if (album.cover)
                album_image = `${process.env.REACT_APP_URL}/assets/covers/${album.cover}`;
              return (
                <div
                  key={index}
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-xs-6 mb-5"
                >
                  <div className="position-relative">
                    <img
                      className="mb-2"
                      src={album_image}
                      width="100%"
                      alt=""
                    />
                    {album.source === "QOBUZ" && (
                      <img
                        className="music_service_banner"
                        src={`${process.env.REACT_APP_URL}/assets/images/qobuz.png`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="album_text">{album.album}</div>
                  <div className="artist_text">{album.artist}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setAlbumAction: (payload) => dispatch(setAlbumAction(payload)),
  setFilterAction: (payload) => dispatch(setFilterAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
