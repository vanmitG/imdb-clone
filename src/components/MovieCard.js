import React, { Component } from "react";
import genres from "../utils/genres";
import "./MovieCard.css";
import M from "materialize-css/dist/js/materialize.min.js";
// console.log("redddd", genres);

export default class MovieCard extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems);
  }

  render() {
    const {
      movie: {
        title,
        overview,
        backdrop_path,
        poster_path,
        genre_ids,
        popularity,
        release_date,
        vote_count,
        vote_average
      }
    } = this.props;

    // console.log("genres line 21 ----", genres);
    // console.log("genre_ids line 22 ----", genre_ids);

    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    const names = filteredGenres.map(({ name }) => name);
    // const namessss = names.map(name => <h1>{name}</h1>);

    return (
      <div class="col s12 m12 l3">
        <div class="card hoverable">
          <div class="card-image">
            <img
              className="responsive-img"
              alt={title}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}?api_key=f0a2a5636159ed7a77518d40e60ef4b1`}
            />
            {/* <span class="card-title">{title}</span> */}
          </div>
          <div class="card-content teal lighten-4">
            <div class="GenreSection">
              {names.map(el => {
                return (
                  <span className="movie-genre z-depth-2 teal accent-1 deep-orange-text text-darken-1">
                    <strong>{el}</strong>
                  </span>
                );
              })}
            </div>
            <div className="Section">
              <ul class="collapsible teal lighten-5">
                <li>
                  <div class="collapsible-header teal lighten-3">
                    <span className="flow-text truncate teal-text text-darken-4">
                      {title}
                    </span>
                  </div>
                  <div class="collapsible-body teal lighten-5">
                    <span className="flow-text deep-orange-text text-darken-2">
                      {title}
                    </span>
                  </div>
                </li>
                <li>
                  <div class="collapsible-header teal lighten-3 ">
                    <i class="material-icons teal-text text-darken-4">
                      description
                    </i>
                    <span className="flow-text truncate teal-text text-darken-4">
                      {overview}
                    </span>
                  </div>
                  <div class="collapsible-body teal lighten-5">
                    <span className="flow-text deep-orange-text text-darken-2">
                      {overview}
                    </span>
                  </div>
                </li>
                <li>
                  <div class="collapsible-header teal lighten-3 flow-text truncate teal-text text-darken-4">
                    <i class="material-icons">details</i>More ...
                  </div>
                  <div class="collapsible-body teal lighten-5 flow-text deep-orange-text text-darken-2">
                    <p>Popularity: {popularity}</p>
                    <p>Vote Counts: {vote_count}</p>
                    <p>Vote Average: {vote_average}</p>
                    <p>Released date: {release_date}</p>
                  </div>
                </li>
              </ul>
            </div>

            <p className="flow-text deep-orange-text text-darken-4">
              release date {release_date}
            </p>
          </div>
          <div class="card-action teal darken-3">
            <a href="#" className="deep-orange-text text-lighten-3">
              This is a link
            </a>
          </div>
        </div>
      </div>

      // <div>
      //   <h1></h1>
      //   <p></p>

      //   <p>popularity {popularity}</p>
      //   <p>vote Count {vote_count}</p>
      //   <p>vote Average {vote_average}</p>
      //   <p>release date {release_date}</p>
      //   <img
      //{`https://image.tmdb.org/t/p/w500/${backdrop_path}?api_key=f0a2a5636159ed7a77518d40e60ef4b1`}
      //   />
      //   <img
      //     alt={title}
      //     src={`https://image.tmdb.org/t/p/w500/${poster_path}?api_key=f0a2a5636159ed7a77518d40e60ef4b1`}
      //   />
      // </div>
    ); //</return>
  } //</render>
}
