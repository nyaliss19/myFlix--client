import React from 'react';
import Axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
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

  // passed to LogoutButton
  logoutUser(uselessParam) {
    this.setState({
      user: false,
      selectedMovie: null,
    });
    localStorage.clear();
    window.location.href = '/';
  }

  toRegistrationView(asdf) {
    this.setState({
      registered: false,
    });
  }

  receiveUpdatedUserDataFromMovieView(userData) {
    this.setState({
      userData,
    });
  }

  render() {
    const { movies, user, registered } = this.state;

    // RegistrationView if user not registered
    if (!registered) return <RegistrationView />;

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
      <Router>
        <Row>
          <Col>
            <LogoutButton
              logoutUser={(user) => {
                this.logoutUser(user);
              }}
            />
          </Col>
        </Row>

        {/* this is what renders by default after logging in */}
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path='/'
            render={() => {
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path='/movies/:movieId'
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.back()}
                    userData={this.state.userData}
                    sendUpdatedUserDataToMainView={(userData) => {
                      this.receiveUpdatedUserDataFromMovieView(userData);
                    }}
                  />
                </Col>
              );
            }}
          />

          {/* this route is linked to from MovieCard */}
          <Route
            path='/director/:name'
            render={({ match }) => {
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.back()}
                    movies={movies}
                  />
                </Col>
              );
            }}
          />

          {/*this route is linked to from main movie list page,
          MovieView, DirectorView, and GenreView */}
          <Route
            exact
            path='/profile'
            render={() => {
              return (
                <ProfileView
                  user={user}
                  movies={movies}
                  userData={this.state.userData}
                  sendUpdatedUserDataToMainView={(userData) => {
                    this.receiveUpdatedUserDataFromMovieView(userData);
                  }}
                />
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

export default MainView;
