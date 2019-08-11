import React, { Component } from "react";
import MovieCard from "./MovieCard";

export class MovieList extends Component {
  render() {
    const { movies } = this.props;
    return (
      <>
        <div className="row">
          <div className="container">
            {movies.map(movie => {
              return <MovieCard movie={movie} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default MovieList;
