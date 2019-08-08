import React, { Component } from "react";

export default class MovieCard extends Component {
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
    return (
      <div>
        <h1>{title}</h1>
        <p>{overview}</p>
        <p>
          {genre_ids.map(el => {
            return `${el} `;
          })}
        </p>
        <p>{popularity}</p>
        <p>{vote_count}</p>
        <p>{vote_average}</p>
        <p>{release_date}</p>
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${backdrop_path}?api_key=4c5b4a5e627748117d4b24082672a9b4`}
        />
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}?api_key=4c5b4a5e627748117d4b24082672a9b4`}
        />
      </div>
    );
  }
}
