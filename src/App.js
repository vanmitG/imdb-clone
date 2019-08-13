import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import NabBar from "./components/NavBar";
import genres from "./utils/genres";
import GenreSelectionGroup from "./components/GenreSelectionGroup";
import ReactModal from "react-modal";
import YouTube from "@u-wave/react-youtube";
// import M from "materialize-css/dist/js/materialize.min.js";

//this needed when working with first object in array
// const movie = require("./movie.json");

// The gray background
const backdropStyle = {
  position: "fixed",
  top: "9vh",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  padding: 50
};

// The modal "window"
const modalStyle = {
  backgroundColor: "#fff",
  borderRadius: 5,
  width: "80vw",
  height: "80vh",
  margin: "0 auto",
  padding: 20
};

export default class App extends Component {
  state = {
    trailerKey: "",
    isOpen: false,
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
      // console.log("single moviess", jsonData.results[0]);
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
    // console.log("GenrID: ", id);
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

  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  };

  async getMoviesTrailers(id) {
    const api_key = "f0a2a5636159ed7a77518d40e60ef4b1";
    const urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f0a2a5636159ed7a77518d40e60ef4b1&language=en-US`;
    // const url = ` https://api.themoviedb.org/3/movie/${
    //   this.state.defaultMovieSource
    // }?api_key=${api_key}&page=${this.state.page}`;
    try {
      const response = await fetch(urlTrailer);
      const jsonData = await response.json();

      // const trailers = jsonData.results;
      // console.log("single trailer", trailers[0]);
      console.log("trailer", jsonData.results);
      console.log("trailer size", jsonData.results.length);
      const randomNum = this.getRandomIntInclusive(1, jsonData.results.length);
      console.log("Random Number", randomNum);
      console.log("trailer Key", jsonData.results[randomNum - 1].key);
      // jsonData.results.map(el => {
      //   if (el.type === "Trailer") {
      //     console.log("trailer Key", el.key);
      //   }
      // });

      this.setState({
        trailerKey: jsonData.results[randomNum - 1].key,
        isLoading: false
      });
    } catch (error) {
      console.log("catch error", error);
      this.setState({ isLoading: false, isErrored: true });
    }
  }

  openModal = id => {
    // console.log("Open Model online 140 - movie id:", id);
    this.getMoviesTrailers(id);
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false, trailerKey: "" });
  };

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

          <div className="section">
            <GenreSelectionGroup
              genres={this.state.genresData}
              filterMovieByGenre={this.filterMovieByGenre}
              resetFilterdMoviesToAllMovies={this.resetFilterdMoviesToAllMovies}
            />
          </div>
          <div className="row ">
            {/* <div className="SectionMarginTop">""</div> */}
            <div className="right col s12 m12 l10">
              <MovieList
                movies={this.state.movies}
                openModal={this.openModal}
              />
            </div>
          </div>

          <footer class="page-footer teal">
            <div class="container">
              <button
                class="waves-effect waves-light btn-large"
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
                © 2019 Copyright IMDB-Clone
                {/* <a class="grey-text text-lighten-4 right" href="#!">
                  More Links
                </a> */}
              </div>
            </div>
          </footer>

          <ReactModal
            /*
    Boolean describing if the modal should be shown or not.
  */
            isOpen={this.state.isOpen}
            /*
    Function that will be run after the modal has opened.
  */
            // onAfterOpen={handleAfterOpenFunc}
            /*
    Function that will be run when the modal is requested to be closed (either by clicking on overlay or pressing ESC)
    Note: It is not called if isOpen is changed by other means.
  */
            onRequestClose={() => this.closeModal()}
            /*
    Number indicating the milliseconds to wait before closing the modal.
  */
            closeTimeoutMS={0}
            /*
    Object indicating styles to be used for the modal.
    It has two keys, `overlay` and `content`.  See the `Styles` section for more details.
  */
            style={{ overlay: backdropStyle, content: modalStyle }}
            /*
    String indicating how the content container should be announced to screenreaders
  */
            contentLabel="Example Modal"
            /*
     String className to be applied to the portal.
     See the `Styles` section for more details.
  */
            portalClassName="ReactModalPortal"
            /*
     String className to be applied to the overlay.
     See the `Styles` section for more details.
  */
            overlayClassName="ReactModal__Overlay"
            /*
     String className to be applied to the modal content.
     See the `Styles` section for more details.
  */
            className="ReactModal__Content"
            /*
     String className to be applied to the document.body (must be a constant string).
     This attribute when set as `null` doesn't add any class to document.body.
     See the `Styles` section for more details.
  */
            bodyOpenClassName="ReactModal__Body--open"
            /*
     String className to be applied to the document.html (must be a constant string).
     This attribute is `null` by default.
     See the `Styles` section for more details.
  */
            htmlOpenClassName="ReactModal__Html--open"
            /*
    Boolean indicating if the appElement should be hidden
  */
            ariaHideApp={false}
            /*
    Boolean indicating if the modal should be focused after render
  */
            shouldFocusAfterRender={true}
            /*
    Boolean indicating if the overlay should close the modal
  */
            shouldCloseOnOverlayClick={true}
            /*
    Boolean indicating if pressing the esc key should close the modal
    Note: By disabling the esc key from closing the modal you may introduce an accessibility issue.
  */
            shouldCloseOnEsc={true}
            /*
    Boolean indicating if the modal should restore focus to the element that
    had focus prior to its display.
  */
            shouldReturnFocusAfterClose={true}
            /*
    String indicating the role of the modal, allowing the 'dialog' role to be applied if desired.
    This attribute is `dialog` by default.
  */
            role="dialog"
            /*
    Function that will be called to get the parent element that the modal will be attached to.
  */
            parentSelector={() => document.body}
            /*
    Additional aria attributes (optional).
  */
            // aria={{
            //   labelledby: "heading",
            //   describedby: "full_description"
            // }}
            /*
    Additional data attributes (optional).
  */
            // data={{
            //   background: "green"
            // }}
            /*
    Overlay ref callback.
  */
            // overlayRef={setOverlayRef}
            /*
    Content ref callback.
  */
            // contentRef={setContentRef}
          >
            {this.state.trailerKey ? (
              <YouTube
                width="100%"
                height="100%"
                video={this.state.trailerKey}
                autoplay
              />
            ) : (
              <h2>There is no Trailer for this movie</h2>
            )}
          </ReactModal>
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
