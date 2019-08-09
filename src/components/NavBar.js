import React, { Component } from "react";

export default class NavBar extends Component {
  render() {
    const { filterMovie } = this.props;
    return (
      <div className="navbar-fixed">
        <nav className="nav-extended teal darken-1">
          <div class="nav-wrapper teal darken-1">
            <a href="#!" class="brand-logo">
              IMDB-Clone
            </a>
            <ul class="left">
              <li>
                <a class="waves-effect waves-light btn">Button</a>
              </li>
              <li>
                <a class="waves-effect waves-light btn">
                  Button <i class="material-icons right">cloud</i>
                </a>
              </li>
              <li>
                <a class="waves-effect waves-light btn-large">Large Button</a>
              </li>
            </ul>
            <form className="right">
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
          </div>
        </nav>
      </div>
    );
  }
}
