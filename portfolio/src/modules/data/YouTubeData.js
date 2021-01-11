/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T15:08:16-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T20:49:05-04:00
 */
import React from 'react';

class YouTubeData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isFetching: false,
      videos: []
    };
  }

  fetchVideos() {
    this.setState({ ...this.state, isFetching: true });

    fetch("http://localhost:8000/youtube", { mode: 'cors' })
      .then(response => response.json())
      .then(data => {

      this.setState({ videos: data, isFetching: false });
    });
  }

  componentDidMount() {
    this.fetchVideos();
  }

  videos() {
    let result = [];

    for(var i = 0; i < this.state.videos.length; i++){
      let video = this.state.videos[i];
      let thumbnail = video.snippet.thumbnails.medium;

      result.push((
        <div class="col-md-4 col-sm-6 col-12 mx-auto">
          <div class="card shadow p-2 m-2 text-nowrap overflow-hidden">
            <figure class="figure mx-auto" style={{ "max-width": "100%" }}>
              <img src={ thumbnail.url } class="figure-img img-fluid rounded" alt="thumbnail" />
              <figcaption class="figure-caption">{ video.snippet.title }</figcaption>
            </figure>
          </div>
        </div>
      ));
    }

    return result;
  }

  render() {
    return (
      <div class="col-12">
        <div class=" rounded p-1">
          <div class="">
            <h5 class="card-title">YouTube</h5>
            <div class="d-flex flex-row overflow-hidden">
              { this.state.isFetching ? "Fetching videos..." : this.videos() }
            </div>
            <div id="pagination" class="btn-group mt-3 mx-auto" style={{ width: "max-content", display: "block" }}>
              <button class="btn btn-outline-dark" type="button">&laquo;</button>
              <button class="btn btn-outline-dark" type="button">0...</button>
              <button class="btn btn-outline-dark" type="button" disabled>1</button>
              <button class="btn btn-outline-dark" type="button">2</button>
              <button class="btn btn-outline-dark" type="button">3</button>
              <button class="btn btn-outline-dark" type="button">...251</button>
              <button class="btn btn-outline-dark" type="button">&raquo;</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YouTubeData;
