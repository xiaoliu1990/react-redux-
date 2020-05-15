import React, { Component } from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import IndexRouter from './modules/index/Router';

const routes = [
  ...IndexRouter,
]
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </Router>
    )
  }
}

