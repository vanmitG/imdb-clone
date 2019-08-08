import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import genre from "./utils/genre";

console.log("genrreeee", genre);
//this needed when working with first object in array
// const movie = require("./movie.json");
export default class App extends Component {
  state = {
    movies: [],
    isLoading: true,
    isErrored: false,
    page: 1
  };
  componentDidMount() {
    this.getMovies();
    console.log("hehehehe");
  }
  async getMovies() {
    const api_key = "4c5b4a5e627748117d4b24082672a9b4";
    // const imgUrl = `https://image.tmdb.org/t/p/w500/${
    //   this.movies.backdrop_path
    // }?api_key=${api_key}`;
    const url = ` https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&page=${
      this.state.page
    }`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("single moviess", jsonData.results[0]);
      this.setState({
        isLoading: false,
        movies: this.state.movies.concat(jsonData.results),
        page: this.state.page + 1
      });
    } catch (error) {
      this.setState({ isLoading: false, isErrored: true });
    }
  }
  clickMore() {
    console.log("ClickMoreere");
    this.getMovies();
  }

  render() {
    console.log("stateateeeeee", this.state);
    if (!this.state.isLoading) {
      return (
        <div>
          <h1>Movie List</h1>
          <button onClick={() => this.clickMore()}>See More</button>
          {/* this block of code replaced by <MovieList/>>
          {this.state.movies.map(movie => {
            return <MovieCard movie={movie} />;
          })} */}
          <MovieList movies={this.state.movies} />
        </div>
      );
    } else {
      return (
        <div>
          <h1>I'm loading</h1>
        </div>
      );
    }
  }
}
