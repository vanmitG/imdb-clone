import React, { Component } from "react";
import GenreButton from "./GenreButton";

export default class GenreSelectionGroup extends Component {
  render() {
    const {
      filterMovieByGenre,
      genres,
      resetFilterdMoviesToAllMovies
    } = this.props;
    return (
      <div className="genresDisplay">
        <button onClick={() => resetFilterdMoviesToAllMovies()}>All</button>

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
    );
  }
}

// function GenreSelectionGroup(props) {
//   return (
//     <div className="genresDisplay">

//     </div>
//   );
// }
