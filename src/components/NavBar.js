import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { jsxFragment } from "@babel/types";
import "./MovieCard.css";
export default class NavBar extends Component {
  componentDidMount() {
    var elem = document.querySelectorAll(".sidenav");
    var instance = M.Sidenav.init(elem);
  }

  render() {
    const { filterMovie, movieSoures, getMovieCatergory } = this.props;
    return (
      <>
        <nav>
          <div class="nav-wrapper teal darken-2">
            <a href="#!" class="brand-logo hide-on-large-only">
              IMDB-Clone
            </a>
            <a
              href="#!"
              class="left brand-logo show-on-large hide-on-med-and-down"
            >
              IMDB-Clone
            </a>
            <a href="#" data-target="slide-out" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
            <form className="right hide-on-small-only">
              <div class="input-field">
                <input
                  onChange={e => filterMovie(e.target.value)}
                  type="search"
                  id="search"
                  required
                />
                <label class="label-icon" for="search">
                  <i class="material-icons">search</i>
                </label>
                <i class="material-icons">close</i>
              </div>
            </form>
            <ul class="right hide-on-med-and-down">
              {movieSoures.map(el => {
                return (
                  <li>
                    <a onClick={() => getMovieCatergory(el.name)}>
                      <strong className="white-text">{`${el.lable}`}</strong>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <ul
          id="slide-out"
          class="sidenav collection with-header teal lighten-1 "
        >
          <li class="collection-header">
            <h5 className="teal-text text-darken-2">
              <strong>Movies Catergories</strong>
            </h5>
          </li>
          {movieSoures.map(el => {
            return (
              <>
                <li className="collection-item teal darken-1">
                  <a onClick={() => getMovieCatergory(el.name)}>
                    <strong className="white-text">{`${el.lable}`}</strong>
                  </a>
                </li>
              </>
            );
          })}
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger" />
      </>
    );
  }
}
