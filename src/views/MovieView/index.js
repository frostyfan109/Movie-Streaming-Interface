import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import * as classNames from 'classnames';
import Plyr from 'react-plyr';
import ReactStars from 'react-stars';
import Loading from '../../components/Loading';
import * as API from '../../api';
import ErrorPage from '../../components/ErrorPage';
import MovieResults, { Hover } from '../../components/MovieResults';
import { AbortException, APIException } from '../../exception.js';
import { Theme } from '../../constants.js';
import 'plyr/dist/plyr.css';
import './MovieView.css';

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie : null,
      similarMovies : null,
      activeServer : null,
      streamData : {
        loading : false,
        data : null
      }
    };

    this._initialize = this._initialize.bind(this);
    this._setMovie = this._setMovie.bind(this);
    this._loadStreamData = this._loadStreamData.bind(this);
    this._resetStreamData = this._resetStreamData.bind(this);

    this.movieCancelToken = API.cancelToken();
    this.similarMoviesCancelToken = API.cancelToken();
    this.embedURLsCancelToken = API.cancelToken();
    this.getStreamDataCancelToken = API.cancelToken();
  }
  _setMovie(movie) {
    this.embedURLsCancelToken.cancel();
    this.similarMoviesCancelToken.cancel();

    this.embedURLsCancelToken = API.cancelToken();
    this.similarMoviesCancelToken = API.cancelToken();
    // Force plyr to refresh by setting to null first.
    this.setState({ movie : null, similarMovies : null }, () => {
      // Set servers to null to indicate loading
      movie.servers = null;
      this.setState({ movie });

      const indexServer = new API.IndexServer(this.props.indexServer);

      indexServer.getEmbedURLs(movie.url, { cancelToken : this.embedURLsCancelToken.token }).then((embedURLs) => {
        const { movie } = this.state;
        movie.servers = embedURLs;
        this.setState({ movie, activeServer: this.state.activeServer || movie.servers[0].name }, () => {
          this._loadStreamData();
        });
      }).catch((e) => {
        if (!(e instanceof AbortException)) {
          throw e;
        }
      });

      indexServer.getSimilarMovies(movie.id, 1, { cancelToken : this.similarMoviesCancelToken.token }).then((movies) => {
        this.setState({ similarMovies : movies });
      }).catch((e) => {
        if (!(e instanceof AbortException)) {
          throw e;
        }
      });
    });
  }
  _loadStreamData() {
    this._resetStreamData();
    this.setState({}, () => {
      this.setState({}, () => {
        this.getStreamDataCancelToken.cancel();
        this.getStreamDataCancelToken = API.cancelToken();
        this.setState({ streamData : { ...this.state.streamData, loading : true } });
        const server = new API.Server(this.state.activeServer);

        const embedURL = this.state.movie.servers.filter((server) => server.name === this.state.activeServer)[0].embed_url;

        server.getStreamData(embedURL, { cancelToken : this.getStreamDataCancelToken.token }).then((streamData) => {
          this.setState({ streamData : { data : streamData, loading : false } });
        }).catch((e) => {
          if (e instanceof APIException) {
            if (e.status === 404) {
              this.setState({ streamData : { data : { notFound : e }, loading : false } });
            }
          }
        });
      });
    });
  }
  _resetStreamData() {
    const { movie } = this.state;
    this.setState({ movie : null, streamData : {loading : false, data : null} }, () => {
      this.setState({ movie : movie });
    });
  }
  _initialize() {
    if (this.props.location.state) {
      this._setMovie(this.props.location.state.movie);
    }
    else {
      this.movieCancelToken.cancel();
      this.movieCancelToken = API.cancelToken();
      new API.IndexServer(this.props.indexServer, { cancelToken : this.movieCancelToken.token }).getMovieById(this.props.match.params.movieId).then((movie) => {
        this._setMovie(movie);
      });
    }
  }
  componentDidUpdate(prevProps) {
    const currentLocation = {...this.props.location.state};
    const prevLocation = {...prevProps.location.state};
    if (currentLocation.movie !== prevLocation.movie) {
      this._initialize();
    }
  }
  componentDidMount() {
    this._initialize();
  }
  componentWillUnmount() {
    this.movieCancelToken.cancel();
    this.similarMoviesCancelToken.cancel();
    this.embedURLsCancelToken.cancel();
    this.getStreamDataCancelToken.cancel();
  }
  render() {
    const movie = this.state.movie;
    if (!movie || movie.servers === null) {
      return (
        <Loading loading={true}
                 tooltip={<div className="h6 mt-4">Loading movie info</div>}
                 className={classNames(this.props.theme !== Theme.DARK && "bg-light")}/>
      );
    }
    if (movie.servers.length === 0) {
      return (
        <ErrorPage className={classNames(this.props.theme !== Theme.DARK && "bg-light")}>
          No valid servers.
        </ErrorPage>
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
          ` + (false && !this.state.streamData.loading && this.state.streamData.data !== null && this.state.streamData.data.notFound ? `
          .plyr::after {
            content: '${this.state.streamData.data.notFound.message}';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
          }
          .plyr > * {
            visibility: hidden;
          }
          ` : "")
        }
        </style>
        <div className="position-relative">
          <Plyr type="video"
                url={!this.state.streamData.loading && this.state.streamData.data !== null ? this.state.streamData.data.stream_url : null}
                ratio="16:9"
                controls={[ 'play-large', 'play', 'progress', 'current-time',
                            'mute', 'volume', 'captions', 'settings', 'pip',
                            'airplay', 'fullscreen' ]}
                poster={movie.poster}/>
          {
            !this.state.streamData.loading && this.state.streamData.data !== null && this.state.streamData.data.notFound && (
              <div className={
                    classNames("d-flex justify-content-center align-items-center flex-column w-100 h-100 position-absolute")
                  } style={{
                    top: 0,
                    left: 0,
                    zIndex: 3,
                    backgroundColor: this.props.theme === Theme.DARK ? "var(--light)" : "var(--white)"
                  }}>
                <div className="h2 text-info">
                  {this.state.streamData.data.notFound.status}
                </div>
                <div className="h6 text-info">{this.state.streamData.data.notFound.message}</div>
              </div>
            )
          }
        </div>
        <ButtonGroup style={{width: "100%"}}>
          {
            movie.servers.map((server) => {
              return (
                <Button variant={server.name === this.state.activeServer ? "primary" : "secondary"}
                        onClick={() => {
                          this.setState({ activeServer : server.name });
                          this._loadStreamData();
                        }}
                        size="sm"
                        key={server.name}>
                  {server.name}
                </Button>
              );
            })
          }
        </ButtonGroup>
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
                    {/*<div className="d-flex align-items-center">
                      <ButtonGroup vertical>
                        {
                          movie.servers.map((server) => {
                            return (
                              <Button variant={server.name === this.state.activeServer ? "primary" : "secondary"}
                                      onClick={() => this.setState({ activeServer : server.name })}
                                      size="sm"
                                      key={server.name}>
                                {server.name}
                              </Button>
                            );
                          })
                        }
                      </ButtonGroup>
                    </div>*/}
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
