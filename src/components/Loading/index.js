import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import ReactLoading from 'react-loading';
import './Loading.css';

export default class Loading extends Component {
  static defaultProps = {
    style : {},
    className : '',
    loadProps : {},
    tooltip: null
  };
  render() {
    if (!this.props.loading) return null;
    return (
      <div className={classNames("Loading w-100 h-100 d-flex flex-column", this.props.className)} style={this.props.style}>
        <ReactLoading type="spin" color="#999" {...this.props.loadProps}/>
        {this.props.tooltip}
      </div>
    );
  }
}
