/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T15:08:16-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-11T21:06:32-04:00
 */
import React from 'react'

// function Comp(){
//   React.useEffect(() => {
//     function handleResize(){
//       console.log("resize");
//     }
//   });
//
//   window.addEventListener("resize", handleResize);
// }

class YouTubeData extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isFetching: false,
      videos: [],
      size: "small"
    };

    let params = new URLSearchParams(window.location.search);

    this.state.page = params.get("page") ? params.get("page") : 1;
    // this.state.per_page = params.get("per_page") ? params.get("per_page") : 3;
    // this.state.per_page = window.innerWidth < 575

    let width = parseInt(window.innerWidth);

    if(width > 767){
      this.state.per_page = 3;
      console.log("large");
    }else if(width > 575){
      this.state.per_page = 2;
      console.log("medium");
    }else{
      this.state.per_page = 1;
      console.log("small");
    }
  }

  // resize(){
  //
  //   let width = parseInt(window.innerWidth);
  //
  //   let state = this.state;
  //   if(!this.state) return;
  //
  //   if(width > 767){
  //     if(state.size !== "large"){
  //       this.setState({ ...state, size: "large" });
  //       console.log("large");
  //     }
  //   }else if(width > 575){
  //     if(state.size !== "medium"){
  //       this.setState({ ...state, size: "medium" });
  //       console.log("medium");
  //     }
  //   }else{
  //     if(state.size !== "small"){
  //       this.setState({ ...state, size: "small" });
  //       console.log("small");
  //     }
  //   }
  // }

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
        <div class="col-md-4 col-sm-6 col-12 mx-auto px-2 text-center figure-caption">
          <div class="pb-1 text-nowrap overflow-hidden">
            <a href="google.ca">
              { video.snippet.title }
            </a>
          </div>

          <figure class="figure mx-auto shadow mb-0" style={{ "max-width": "100%", "position": "relative" }}>
            <img src={ thumbnail.url } class="figure-img img-fluid rounded mb-0" alt="thumbnail" />
          </figure>

          <table class="w-100 text-secondary">
            <tr>
              { view_count }
              { like_count }
              { dislike_count }
              { comment_count }
            </tr>
          </table>
        </div>
      ));
    }

    return result;
  }

  pagination() {
    let result = [];
    let start = Math.min(Math.max(this.state.page - 1, 1), 15-2);

    for(let i = start; i < start + 5; i++){
      result.push((
        <button
          class="btn btn-outline-dark"
          type="button"
          onClick={ e => { this.fetchVideos(new URLSearchParams({ page: i })) } }
          disabled={this.state.page === i ? true : false}>
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
