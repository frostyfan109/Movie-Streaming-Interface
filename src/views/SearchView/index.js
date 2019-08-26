import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultView from '../ResultView';
import { AbortException } from '../../exception.js';
import { InputGroup, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import * as classNames from 'classnames';
import { defaultResults } from '../../redux/reducers/movieResults.js';
import { Theme } from '../../constants.js';
import * as API from '../../api';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies : defaultResults()
    }

    this._getSearchResults = this._getSearchResults.bind(this);

    this.searchCancelToken = API.cancelToken();
  }

  _getSearchResults(page) {
    new API.IndexServer(this.props.indexServer).searchMovies(this.props.match.params.query, page, { cancelToken : this.searchCancelToken.token}).then((respMovies) => {
      const { movies } = this.state;
      movies.push(respMovies);
      this.setState({ movies });
    }).catch((e) => {
      if (!(e instanceof AbortException)) {
        throw e;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.setState({ movies : defaultResults() });
      this._getSearchResults(1);
    }
  }
  componentWillUnmount() {
    this.searchCancelToken.cancel();
  }
  componentDidMount() {
    this._getSearchResults();
  }
  render() {
    return <ResultView tags={["Search for \"" + (this.props.match.params.query || "") + "\""]} movies={this.state.movies} setActiveMovieResultsPage={this._getSearchResults}/>
  }
}

function mapStateToProps(state) {
  return {
    indexServer : state.settings.indexServer,
  };
}

export default connect(
  mapStateToProps
)(SearchView);
