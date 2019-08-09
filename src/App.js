import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import NabBar from "./components/NavBar";
import genres from "./utils/genres";
import GenreSelectionGroup from "./components/GenreSelectionGroup";

//this needed when working with first object in array
// const movie = require("./movie.json");

export default class App extends Component {
  state = {
    genresData: genres,
    movies: [],
    allMovies: [],
    isLoading: true,
    isErrored: false,
    page: 1,
    movieCat: [
      { id: 1, name: "top_rated", lable: "Top Rated" },
      { id: 2, name: "latest", lable: "Latest" },
      { id: 3, name: "now_playing", lable: "Now Playing" },
      { id: 4, name: "popular", lable: "Popular" },
      { id: 5, name: "upcoming", lable: "Upcoming" }
    ],
    defaultMovieCat: "top_rated"
  };
  componentDidMount() {
    this.getMovies();
  }
  getMovieCatergory(id) {
    console.log("Moive Catergory ID");
    console.log("Moive Catergory name");
  }
  async getMovies() {
    const api_key = "f0a2a5636159ed7a77518d40e60ef4b1";
    const url = ` https://api.themoviedb.org/3/movie/${
      this.state.defaultMovieCat
    }?api_key=${api_key}&page=${this.state.page}`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("single moviess", jsonData.results[0]);
      this.setState(
        {
          isLoading: false,
          movies: this.state.movies.concat(jsonData.results),
          page: this.state.page + 1,
          allMovies: this.state.allMovies.concat(jsonData.results)
        },
        () => this.addNumberOfMoviesToGenresArray()
      );
    } catch (error) {
      this.setState({ isLoading: false, isErrored: true });
    }
  }
  getMoreMovies() {
    this.setState({ movies: this.state.allMovies }, this.getMovies);
  }
  resetFilterdMoviesToAllMovies = () => {
    this.setState({ movies: this.state.allMovies });
  };

  filterMovie = searchTerm => {
    // console.log("filterMoviessss", searchTerm);
    const filteredMovies = this.state.allMovies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    this.setState({ movies: filteredMovies });
  };

  getMoviesByGenreId = id => {
    // console.log("GenrID: ", id);
    const moviesByGenreID = this.state.allMovies.filter(movie => {
      return movie.genre_ids.includes(id);
    });
    return moviesByGenreID;
  };

  filterMovieByGenre = id => {
    console.log("GenrID: ", id);
    const filteredMoviesByGenre = this.state.allMovies.filter(movie => {
      return movie.genre_ids.includes(id);
    });
    // const getMoviesByGenreId = getMoviesByGenreId(id);
    this.setState({
      movies: filteredMoviesByGenre
    });
    console.log("genressssss line 76 filter", this.state.genresData);
  };

  addNumberOfMoviesToGenresArray() {
    const cloneGenresData = this.state.genresData.slice(0);
    cloneGenresData.map(el => {
      return (el.num = this.getMoviesByGenreId(el.id).length);
    });
    this.setState({ genresData: cloneGenresData });
  }

  render() {
    // console.log("stateateeeeee", this.state);
    if (!this.state.isLoading) {
      return (
        <div className="App">
          <NabBar filterMovie={this.filterMovie} />
          <h1>Movie List</h1>
          <h3>{`${this.state.movies.length} movies total`}</h3>

          <button onClick={() => this.getMovieCatergory(4)}>popular</button>

          <GenreSelectionGroup
            genres={this.state.genresData}
            filterMovieByGenre={this.filterMovieByGenre}
            resetFilterdMoviesToAllMovies={this.resetFilterdMoviesToAllMovies}
          />

          <MovieList movies={this.state.movies} />
          {
            <button onClick={() => this.getMoreMovies(this.state.movieCat[4])}>
              More...
            </button>
          }
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
