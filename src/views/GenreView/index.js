import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as classNames from 'classnames';
import { defaultResults } from '../../redux/reducers/movieResults.js';
import { AbortException } from '../../exception.js';
import ResultView from '../ResultView';
import Loading from '../../components/Loading';
import { Theme } from '../../constants.js';
import * as API from '../../api';
import './GenreView.css';

class GenreView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies : defaultResults()
    }

    this._getMovies = this._getMovies.bind(this);

    this.moviesCancelToken = API.cancelToken();
  }

  _getMovies(page) {
    new API.IndexServer(this.props.indexServer).getMoviesByGenre(this.props.match.params.id, page, { cancelToken : this.moviesCancelToken.token}).then((respMovies) => {
      const { movies } = this.state;
      movies.push(respMovies);
      this.setState({ movies });
    }).catch((e) => {
      if (!(e instanceof AbortException)) {
        throw e;
      }
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params.id !== prevProps.match.params.id) {
  //     this.setState({ movies : defaultResults() });
  //     this._getMovies(1);
  //   }
  // }
  componentWillUnmount() {
    this.moviesCancelToken.cancel();
  }
  componentDidMount() {
    this._getMovies();
  }
  render() {
    if (this.props.genres === null) {
      return (
        <Loading loading={true}
                 tooltip={<div className="h6 mt-4">Loading genres</div>}
                 className={classNames(this.props.theme !== Theme.DARK && "bg-light")}/>
      );
    }
    const genre = this.props.genres.filter((genre) => genre.id === this.props.match.params.id)[0];
    return <ResultView tags={[genre.name]} movies={this.state.movies} setActiveMovieResultsPage={this._getMovies}/>
  }
}

function mapStateToProps(state) {
  return {
    indexServer : state.settings.indexServer,
    theme : state.settings.theme,
    genres : state.genres
  };
}

export default connect(
  mapStateToProps
)(GenreView);
