/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T15:08:16-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-11T19:50:44-04:00
 */
import React from 'react';

class YouTubeData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isFetching: false,
      videos: []
    };

    let params = new URLSearchParams(window.location.search);

    this.state.page = params.get("page") ? params.get("page") : 1;
    this.state.per_page = params.get("per_page") ? params.get("per_page") : 3;
  }

  fetchVideos(params="") {
    this.setState({ ...this.state, isFetching: true });

    fetch(`http://localhost:8000/youtube?${params.toString()}`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
      if(params) this.state.page = params.get("page");
      this.setState({ ...this.state, videos: data, isFetching: false });
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
      let stats = video.statistics;

      let view_count = stats.viewCount > 0 ? (<td>{ stats.viewCount } views</td>) : "";
      let like_count = stats.likeCount > 0 ? (<td>{ stats.likeCount } likes</td>) : "";
      let dislike_count = stats.dislikeCount > 0 ? (<td>{ stats.dislikeCount } dislikes</td>) : "";
      let comment_count = stats.commentCount > 0 ? (<td>{ stats.commentCount } comments</td>) : "";

      result.push((
        <div class="col-md-4 col-sm-6 col-12 mx-auto text-center">
          <div class="card shadow p-2 m-2 text-nowrap overflow-hidden">
            <figure class="figure mx-auto" style={{ "max-width": "100%" }}>
              <img src={ thumbnail.url } class="figure-img img-fluid rounded" alt="thumbnail" />
              <figcaption class="figure-caption">
                <a href="google.ca">
                  { video.snippet.title }
                </a>
              </figcaption>
            </figure>

            <table class="w-100 text-muted">
              <tr>
                { view_count }
                { like_count }
                { dislike_count }
                { comment_count }
              </tr>
            </table>
          </div>
        </div>
      ));
    }

    return result;
  }

  pagination() {
    let result = [];
    let start = Math.min(Math.max(this.state.page - 1, 1), 15-2);

    for(let i = start; i < start + 3; i++){
      result.push((
        <button
          class="btn btn-outline-dark"
          type="button"
          onClick={ e => { this.fetchVideos(new URLSearchParams({ page: i })) } }
          disabled={this.state.page == i ? true : false}>
          { i }
        </button>
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
              <button
                class="btn btn-outline-dark"
                type="button"
                onClick={ e => { this.fetchVideos(new URLSearchParams({ page: 1 })) } }>
                1...
              </button>

              { this.pagination() }

              <button class="btn btn-outline-dark" type="button"
                onClick={ e => { this.fetchVideos(new URLSearchParams({ page: 15 })) } }>...15</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YouTubeData;
