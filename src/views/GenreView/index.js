import React, { Component } from 'react';
import { connect } from 'react-redux';

class GenreView extends Component {
  render() {
    return <div>Genres</div>;
  }
}

function mapStateToProps(state) {
  return {
    indexServer : state.settings.indexServer,
    theme : state.settings.theme
  };
}

export default connect(
  mapStateToProps
)(GenreView)
