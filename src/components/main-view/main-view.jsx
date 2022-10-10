import React from 'react';
import Axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userData: null,
      registered: true,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
      this.getUserData(accessToken, localStorage.getItem('user'));
    }
    console.log('main view mounted');
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // passed to LoginView
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    Axios.get('https://nyaliss-flix-27.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserData(token, username) {
    Axios.get('https://nyaliss-flix-27.herokuapp.com/users/${username', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          userData: response.data,
        });
        console.log(`This is the data we found: ${Object.keys(response.data)}`);
        console.log('The current state is:');
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
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
        <Row>
          <Col>
            <LogoutButton
              logoutUser={(uselessParam) => this.logoutUser(uselessParam)}
            />
          </Col>
        </Row>
        {selectedMovie ? (
          <Row>
            <Col>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          </Row>
        ) : (
          <div>
            <Row className='justify-content-md-center'>
              <Col md={4}>
                <h1 className='display-2'>Movies</h1>
              </Col>
            </Row>

            <Row className='justify-content-md-center'>
              {movies.map((movie) => (
                <Col>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(movie) => {
                      this.setSelectedMovie(movie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    );
  }
}

MainView.propTypes = {};

export default MainView;
