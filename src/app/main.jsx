
import 'rxjs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './containers/AppContainer';

const MOUNT_NODE = document.getElementById('root');

class AppContainera extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
}

// let render = () => {
  ReactDOM.render(
    <AppContainera />,
    MOUNT_NODE
  );
// };

// render();
