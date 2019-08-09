import React, { Component } from "react";
// import genres from "../utils/genres";

export default class GenreButton extends Component {
  render() {
    const { filterMovieByGenre, id, name, num } = this.props;

    return (
      <div>
        <button
          onClick={() => filterMovieByGenre(id)}
        >{`${name} (${num})`}</button>
      </div>
    );
  }
}
