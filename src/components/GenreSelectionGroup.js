import React, { Component } from "react";
import GenreButton from "./GenreButton";
import "./MovieCard.css";

export default class GenreSelectionGroup extends Component {
  render() {
    const {
      filterMovieByGenre,
      genres,
      resetFilterdMoviesToAllMovies
    } = this.props;
    return (
      <div className="row">
        <div className="marginTopGenre">
          {" "}
          <div className="col s12 m12 hide-on-large-only">
            <div class="card-panel teal lighten-3 ">
              <div className="genresDisplay">
                <button
                  className="waves-effect waves-light btn"
                  onClick={() => resetFilterdMoviesToAllMovies()}
                >
                  All
                </button>
                {genres.map(el => {
                  return (
                    <GenreButton
                      filterMovieByGenre={filterMovieByGenre}
                      id={el.id}
                      name={el.name}
                      num={el.num}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="fixedGenres">
          <div className="col h3 hide-on-med-and-down">
            <div class="card-panel teal lighten-3 ">
              <button
                className="waves-effect waves-light btn"
                onClick={() => resetFilterdMoviesToAllMovies()}
              >
                All
              </button>
              {genres.map(el => {
                return (
                  <GenreButton
                    filterMovieByGenre={filterMovieByGenre}
                    id={el.id}
                    name={el.name}
                    num={el.num}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function GenreSelectionGroup(props) {
//   return (
//     <div className="genresDisplay">

//     </div>
//   );
// }
