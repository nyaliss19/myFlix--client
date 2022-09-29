import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }

  componentDidMount() {
    axios
      .get('https://nyaliss-flix-27.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // passed to LoginView
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  // passed to RegistrationView
  onRegister(registered, user) {
    this.setState({
      registered,
      user,
    });
  }

  // passed to LogoutButton
  logoutUser(uselessParam) {
    this.setState({
      user: false,
      selectedMovie: null,
    });
  }

  toRegistrationView(asdf) {
    this.setState({
      registered: false,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // RegistrationView if user not registered
    if (!registered)
      return (
        <RegistrationView
          onRegister={(registered, username) =>
            this.onRegister(registered, username)
          }
        />
      );

    // LoginView if user is registered, but not logged in
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toRegistrationView={(asdf) => this.toRegistrationView(asdf)}
        />
      );

    // Empty MainView if there are no movies (or still loading)
    if (movies.length === 0)
      return <div className='main-view'>The list is empty!</div>;

    // if we get here then user is registered and logged in
    // Render list of MovieCard if no movie is selected
    // Go to MovieView if a movie is selected
    return (
      <div className='main-view'>
        {selectedMovie ? (
          <div>
            <LogoutButton
              logoutUser={(uselessParam) => this.logoutUser(uselessParam)}
            />
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </div>
        ) : (
          <div>
            <LogoutButton
              logoutUser={(uselessParam) => this.logoutUser(uselessParam)}
            />
            <h1>Movies</h1>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(movie) => {
                  this.setSelectedMovie(movie);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MainView;
