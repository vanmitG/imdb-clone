import React, { Component } from "react";
import genres from "../utils/genres";
// console.log("redddd", genres);

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

    // console.log("genres line 21 ----", genres);
    // console.log("genre_ids line 22 ----", genre_ids);

    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    const names = filteredGenres.map(({ name }) => name);
    // const namessss = names.map(name => <h1>{name}</h1>);

    return (
      <div>
        <h1>{title}</h1>
        <p>{overview}</p>
        <p>
          {names.map(el => {
            return `${el} `;
          })}
        </p>
        <p>popularity {popularity}</p>
        <p>vote Count {vote_count}</p>
        <p>vote Average {vote_average}</p>
        <p>release date {release_date}</p>
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${backdrop_path}?api_key=f0a2a5636159ed7a77518d40e60ef4b1`}
        />
        <img
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}?api_key=f0a2a5636159ed7a77518d40e60ef4b1`}
        />
      </div>
    );
  }
}
