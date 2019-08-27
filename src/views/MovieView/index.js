import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import * as classNames from 'classnames';
import Plyr from 'react-plyr';
import ReactStars from 'react-stars';
import Loading from '../../components/Loading';
import * as API from '../../api';
import MovieResults, { Hover } from '../../components/MovieResults';
import { AbortException } from '../../exception.js';
import { Theme } from '../../constants.js';
import 'plyr/dist/plyr.css';
import './MovieView.css';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie : null,
      similarMovies : null
    };

    this._initialize = this._initialize.bind(this);
    this._setMovie = this._setMovie.bind(this);

    this.movieCancelToken = API.cancelToken();
    this.similarMoviesCancelToken = API.cancelToken();
  }
  _setMovie(movie) {
    this.movieCancelToken.cancel();
    this.similarMoviesCancelToken.cancel();
    this.setState({ movie : null, similarMovies : null }, () => {
      // Force plyr to refresh
      this.setState({ movie });

      this.similarMoviesCancelToken = API.cancelToken();
      new API.IndexServer(this.props.indexServer).getSimilarMovies(movie.id, 1, { cancelToken : this.similarMoviesCancelToken.token }).then((movies) => {
        this.setState({ similarMovies : movies });
      }).catch((e) => {
        if (!(e instanceof AbortException)) {
          throw e;
        }
      });
    });
  }
  _initialize() {
    if (this.props.location.state) {
      this._setMovie(this.props.location.state.movie);
    }
    else {
      this.movieCancelToken = API.cancelToken();
      new API.IndexServer(this.props.indexServer, { cancelToken : this.movieCancelToken.token }).getMovieById(this.props.match.params.movieId).then((movie) => {
        this._setMovie(movie);
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.state.movie !== prevProps.location.state.movie) {
      console.log('Initializing');
      this._initialize();
    }
  }
  componentDidMount() {
    this._initialize();
  }
  componentWillUnmount() {
    this.movieCancelToken.cancel();
    this.similarMoviesCancelToken.cancel();
  }
  render() {
    const movie = this.state.movie;
    if (!movie) {
      return (
        <Loading loading={true}
                 tooltip={<div className="h6 mt-4">Loading movie info</div>}
                 className={classNames(this.props.theme !== Theme.DARK && "bg-light")}/>
      );
    }
    return (
      <div className="Movie">
        <style>
        {
          /* Styling that will only apply when MovieView is mounted */
          `
          @media (max-width: 575.98px) {
            .padded {
              padding-left: 5% !important;
              padding-right: 5% !important;
            }
          }
          `
        }
        </style>
        <Plyr type="video"
              url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              ratio="16:9"
              controls={[ 'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen' ]}
              poster={console.log(movie.poster)||movie.poster}/>
        <Container className="px-0">
          <div className="d-flex align-items-stretch info-container">
            <Container className="pt-4 px-0">
              <div className="h5 mb-3">{movie.name}{movie.year && " (" + movie.year + ")"}</div>
              <Container className="px-0 additional-info">
                <div>{movie.description}</div>
                <div className="first-additional">
                    <div>
                      <span>Rating:&nbsp;</span><ReactStars count={5} value={movie.rating/2} edit={false} size={24} className="movie-rating"/>
                    </div>
                    <div>
                      <span>Runtime: {movie.runtime} minutes</span>
                    </div>
                    <div>
                      <span>Genre: {movie.genres.map((genre) => {
                        return <Link to={`/genre/${genre.id}`} key={genre.id}>{genre.name}</Link>;
                      }).reduce((prev, cur) => [prev, ', ', cur])}</span>
                    </div>
                </div>
                {
                  this.state.similarMovies != null && this.state.similarMovies.results.length > 0 && (
                    <MovieResults className="mt-4" tags={["Similar"]} doHover={Hover.OVERLAY} maxRows={1} noFilter={true}>{this.state.similarMovies.results}</MovieResults>
                  )
                }
              </Container>
            </Container>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(
  (state) => ({ indexServer : state.settings.indexServer, theme : state.settings.theme })
)(MovieView);
