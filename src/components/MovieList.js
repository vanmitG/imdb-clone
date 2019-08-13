import React, { Component } from "react";
import MovieCard from "./MovieCard";

export class MovieList extends Component {
  render() {
    const { movies, openModal } = this.props;
    return (
      <>
        <div className="row">
          <div className="container">
            {movies.map(movie => {
              return <MovieCard movie={movie} openModal={openModal} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default MovieList;
