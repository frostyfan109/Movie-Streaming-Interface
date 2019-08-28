import React, { Component } from 'react';
import * as classNames from 'classnames';

export default class ErrorPage extends Component {
  render() {
    return (
      <div className={classNames("Error-page d-flex justify-content-center align-items-center", this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}
