import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import NabBar from "./components/NavBar";
import genres from "./utils/genres";
import GenreSelectionGroup from "./components/GenreSelectionGroup";
// import M from "materialize-css/dist/js/materialize.min.js";

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
    movieSoures: [
      { id: 1, name: "top_rated", lable: "Top Rated" },
      { id: 2, name: "latest", lable: "Latest" },
      { id: 3, name: "now_playing", lable: "Now Playing" },
      { id: 4, name: "popular", lable: "Popular" },
      { id: 5, name: "upcoming", lable: "Upcoming" }
    ],
    defaultMovieSource: "top_rated"
  };
  componentDidMount() {
    this.getMovies();
  }
  getMovieCatergory = name => {
    // console.log("Moive Catergory ID", Source.id);
    console.log("Moive Catergory name", name);
    // this.getMovies();
    this.resetMoviesAllMoviesAndDefaultMovieSource(name);

    // resetMoviesAllMoviesAndDefaultMovieSource(name);
    // console.log("Moive Catergory label", Source.lable);
  };
  resetMoviesAllMoviesAndDefaultMovieSource = name => {
    this.setState(
      { movies: [], allMovies: [], defaultMovieSource: name, page: 1 },
      () => this.getMovies()
    );
  };

  async getMovies() {
    const api_key = "f0a2a5636159ed7a77518d40e60ef4b1";
    const url = ` https://api.themoviedb.org/3/movie/${
      this.state.defaultMovieSource
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
    // console.log("genressssss line 76 filter", this.state.genresData);
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
          <NabBar
            filterMovie={this.filterMovie}
            movieSoures={this.state.movieSoures}
            getMovieCatergory={this.getMovieCatergory}
          />
          {/* <h3>{`${this.state.movies.length} movies total`}</h3> */}

          <div className="fixedGenres section">
            <GenreSelectionGroup
              genres={this.state.genresData}
              filterMovieByGenre={this.filterMovieByGenre}
              resetFilterdMoviesToAllMovies={this.resetFilterdMoviesToAllMovies}
            />
          </div>
          <div className="row section">
            <div className="col s12 m12 l12">""</div>
            <div className="right col s12 m12 l10">
              <MovieList movies={this.state.movies} />
            </div>
          </div>

          <footer class="page-footer teal">
            <div class="container">
              <button
                class="waves-effect waves-light btn"
                onClick={() =>
                  this.getMoreMovies(this.state.defaultMovieSource)
                }
              >
                More...
              </button>
              <span className="right">{`${
                this.state.movies.length
              } movies total`}</span>
            </div>
            <div class="footer-copyright teal darken-4">
              <div class="container">
                © 2014 Copyright Text
                <a class="grey-text text-lighten-4 right" href="#!">
                  More Links
                </a>
              </div>
            </div>
          </footer>

          {}
        </div> //</app>
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
