import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import './index.scss';
import MainView from './components/main-view/main-view';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <MainView />
        </Container>
      </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
