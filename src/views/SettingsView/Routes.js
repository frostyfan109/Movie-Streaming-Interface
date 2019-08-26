import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { GeneralView } from './Views.js';

export default class Routes extends Component {
  render() {
    return (
      <>
        <Route exact path="/settings" component={GeneralView} />
        <Route exact path="/settings/general" component={GeneralView} />
      </>
    );
  }
}
