import React, { Component } from "react";
import MovieCard from "./MovieCard";

export class MovieList extends Component {
  render() {
    const { movies } = this.props;
    return (
      <>
        <div className="row">
          {movies.map(movie => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      </>
    );
  }
}

export default MovieList;
