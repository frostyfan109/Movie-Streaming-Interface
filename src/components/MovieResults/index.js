import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CardDeck, CardColumns, Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { FaPlay, FaCircle } from 'react-icons/fa';
import Truncate from 'react-truncate';
import ReactResizeDetector from 'react-resize-detector';
import * as classNames from 'classnames';
import Loading from '../Loading';
import { Theme } from '../../constants.js';
import './MovieResults.css';

export const Hover = Object.freeze({
  ALL : 0,
  NO_TRANSITION : 1,
  OVERLAY : 2,
  NONE : 3
});

class ResultNavbar extends Component {
  static defaultProps = {
    tags: [],
    filterButton: true,
    filterButtonProps: {},
  };
  render() {
    return (
      <Row className="result-navbar m-0 mb-3">
        {
          this.props.tags.map((tag,i) => {
            return (
              <Col key={i} className={classNames(i === this.props.tags.length - 1 && "pr-0")}><div className="btn btn-primary title-block text-nowrap">{tag}</div></Col>
            )
          })
        }
        <Col className="pl-0 ml-0">
          <Button variant="secondary"
                  className={classNames("float-right", !this.props.filterButton && "d-none")}
                  onClick={this.props.toggleFilterView}
                  {...this.props.filterButtonProps}>
            {this.props.filterText}
          </Button>
        </Col>
      </Row>
    );
  }
}

export const MovieResult = withRouter(class extends Component {
  static defaultProps = {
    doHover: Hover.ALL
  };
  constructor(props) {
    super(props);

    this.state = {
      hover : false
    };

    this._transitionStarted = this._transitionStarted.bind(this);
    this._transitionCancelled = this._transitionCancelled.bind(this);

    this._ref = React.createRef();
  }

  _transitionStarted() {
    // console.log('Transition successfully started', this.props.data.id, this.hover);
    if (this.state.hover) this.props.startHover();
  }
  _transitionCancelled() {
    // console.log('Transition ended', this.props.data.id, this.hover);
    if (!this.state.hover) this.props.endHover();
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this._ref.current).addEventListener('transitionstart', this._transitionStarted);
    ReactDOM.findDOMNode(this._ref.current).addEventListener('transitionend', this._transitionCancelled);
    // ReactDOM.findDOMNode(this._ref.current).addEventListener('transitioncancel', this._transitionCancelled);
  }
  componentWillUnmount() {
    ReactDOM.findDOMNode(this._ref.current).removeEventListener('transitionstart', this._transitionStarted);
    ReactDOM.findDOMNode(this._ref.current).removeEventListener('transitionend', this._transitionCancelled);
    // ReactDOM.findDOMNode(this._ref.current).removeEventListener('transitioncancel', this._transitionCancelled);
  }

  render() {
    return (
      <Card className={classNames("movie-result position-relative")}
            ref={this._ref}
            onMouseEnter={() => {
              this.props.data.available && this.props.doHover <= Hover.OVERLAY && this.setState({ hover : true }, () => {
                if (this.props.doHover === Hover.NO_TRANSITION) {
                  this._transitionStarted();
                }
              });
            }}
            onMouseLeave={() => {
              this.props.data.available && this.props.doHover <= Hover.OVERLAY && this.setState({ hover : false }, () => {
                if (this.props.doHover === Hover.NO_TRANSITION) {
                  this._transitionCancelled();
                }
              });
            }}
            onClick={() => {
              this.props.data.available && this.props.history.push({
                pathname : `/movie/${this.props.data.id}`,
                state : { movie : this.props.data }
              });
            }}
            style={{
              zIndex : this.props.hoverZ,
              transform : this.props.doHover > Hover.ALL ? 'scale(1)' : undefined
            }}
            data-hover={this.state.hover && this.props.doHover < Hover.OVERLAY}
            data-available={this.props.data.available}
            data-overlay={this.state.hover && this.props.doHover === Hover.OVERLAY}>
        <div className="card-img-container">
          <Card.Img variant="top"
                    src={this.props.data.thumbnail}/>
          <div className="img-overlay d-flex justify-content-center align-items-end">
            <span className="fa-layers">
              <FaCircle className="circle"/>
              <FaPlay className="play"/>
            </span>
          </div>
        </div>
        <Card.Body className={classNames("py-3 px-2")}>
          <Card.Title className={classNames("text-center", ((!this.state.hover && this.props.doHover < Hover.OVERLAY) || this.props.doHover >= Hover.OVERLAY) && "mb-0")}>{!this.props.data.available && "(Unavailable) "}{this.props.data.name}</Card.Title>
        </Card.Body>
        <Card.Text className="position-absolute text-center">
          <ReactResizeDetector handleWidth>
            {(({width}) => <Truncate trimWhitespace={true} width={~~width} lines={2}>{this.props.data.description}</Truncate>)}
          </ReactResizeDetector>
        </Card.Text>
      </Card>
    );
  }
});

class MovieResults extends Component {
  static defaultProps = {
  };
  constructor(props) {
    super(props);

    this.state = {
      hoverPriority : [],
      filterView : false,
      filterSettings : {
        hideGenres: [],
        showUnavailableMovies : false
      }
    };

    this._addHover = this._addHover.bind(this);
    this._removeHover = this._removeHover.bind(this);

    this._toggleGenre = this._toggleGenre.bind(this);
    this._toggleShowUnavailableMovies = this._toggleShowUnavailableMovies.bind(this);
    this._updateSettings = this._updateSettings.bind(this);

    this._applyFilters = this._applyFilters.bind(this);
  }

  _addHover(key) {
    let { hoverPriority } = this.state;
    hoverPriority = hoverPriority.filter((id) => id !== key).concat(key);
    this.setState({ hoverPriority });
  }
  _removeHover(key) {
    let { hoverPriority } = this.state;
    hoverPriority = hoverPriority.filter((id) => id !== key);
    this.setState({ hoverPriority });
  }

  _toggleGenre(genre, checked) {
    const { filterSettings } = this.state;
    if (checked) {
      filterSettings.hideGenres.push(genre);
    }
    else {
      const index = filterSettings.hideGenres.indexOf(genre);
      index !== -1 && filterSettings.hideGenres.splice(index, 1);
    }
    this._updateSettings(filterSettings);
  }
  _toggleShowUnavailableMovies() {
    const { filterSettings } = this.state;
    filterSettings.showUnavailableMovies = !filterSettings.showUnavailableMovies;
    this._updateSettings(filterSettings);
  }

  _updateSettings(filterSettings) {
    this.setState({ filterSettings });
    localStorage.setItem('filterSettings', JSON.stringify(filterSettings));
  }

  _applyFilters(results) {
    if (this.props.noFilter) {
      return results.filter((movieResult) => movieResult.available);
    }
    return results.filter((movieResult) => {
      return (
        movieResult.genres.every((genre) => {
          return !this.state.filterSettings.hideGenres.includes(genre.id);
        }) &&
        (this.state.filterSettings.showUnavailableMovies || movieResult.available)
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.genres !== prevProps.genres && prevProps.genres !== null) {
      // If the genres changed and were not null before, then the index server changed.
      if (localStorage.hasOwnProperty('filterSettings')) {
        const filterSettings = localStorage.getItem('filterSettings');
        filterSettings.hideGenres = [];
        localStorage.setItem('filterSettings',filterSettings);
      }
    }
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty('filterSettings')) {
      this.setState({ filterSettings : JSON.parse(localStorage.getItem('filterSettings')) });
    }
  }

  render() {
    if (this.props.children === undefined) {
      return (
        <Loading loading={true}
                 tooltip={<div className="h6 mt-4">Loading movies</div>}
                 className={classNames(this.props.theme !== Theme.DARK && "bg-light")}/>
      );
    }
    /*else if (this.props.children.length === 0) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          No movies found
        </div>
      )
    }*/
    return (
      <div className={classNames("MovieResults d-flex flex-column", this.props.className)}>
        {
          this.props.maxRows !== undefined && (
            <style>
              {
                `
                @media (max-width: 575.98px) {
                  .MovieResults .movie-result-container > *:nth-of-type(1n + ${(this.props.maxRows * 1) + 1}) {
                    display: none !important;
                  }
                }
                @media (max-width: 767.98px) {
                  .MovieResults .movie-result-container > *:nth-of-type(1n + ${(this.props.maxRows * 3) + 1}) {
                    display: none !important;
                  }
                }
                @media (max-width: 991.98px) {
                  .MovieResults .movie-result-container > *:nth-of-type(1n + ${(this.props.maxRows * 4) + 1}) {
                    display: none !important;
                  }
                }
                @media (max-width: 1199.98px) {
                  .MovieResults .movie-result-container > *:nth-of-type(1n + ${(this.props.maxRows * 5) + 1}) {
                    display: none !important;
                  }
                }
                .MovieResults .movie-result-container > *:nth-of-type(1n + ${(this.props.maxRows * 6) + 1}) {
                  display: none !important;
                }
                `
              }
            </style>
          )
        }
        <ResultNavbar tags={this.props.tags}
                      filterButton={!this.props.noFilter}
                      toggleFilterView={() => this.setState({ filterView : !this.state.filterView})}
                      filterText={this.state.filterView ? "Back" : "Filter"}
                      filterButtonProps={this.props.filterButtonProps}/>
        {
          this.state.filterView ? (
            <Form className={classNames("flex-grow-1 mt-2 d-flex flex-column filter-form", this.props.theme === Theme.DARK && "text-white")}>
              <Form.Group>
                <Card className={classNames("bg-light genre-card", this.props.theme === Theme.DARK && "border-secondary")}>
                  <Card.Header className={classNames(this.props.theme === Theme.DARK && "border-secondary border-bottom bg-secondary")}>Genre</Card.Header>
                  <Card.Body>
                    {
                      this.props.genres === null ? (
                        <span className="loading d-flex justify-content-center align-items-center">Loading genres</span>
                      ) : (
                        <Form.Group className="genre-grid">
                        {
                          this.props.genres.map((genre) => (
                            <Form.Check key={genre.id}
                            type="checkbox"
                            checked={!this.state.filterSettings.hideGenres.includes(genre.id)}
                            onChange={(e) => this._toggleGenre(genre.id, !e.target.checked)}
                            label={genre.name}/>
                          ))
                        }
                        </Form.Group>
                      )
                    }
                  </Card.Body>
                </Card>
                <Card className={classNames("bg-light miscellaneous-card", this.props.theme === Theme.DARK && "border-secondary")}>
                  <Card.Header className={classNames(this.props.theme === Theme.DARK && "border-secondary border-bottom bg-secondary")}>Miscellaneous</Card.Header>
                  <Card.Body>
                    <Form.Group className="px-2">
                      <Form.Check type="checkbox"
                                  checked={this.state.filterSettings.showUnavailableMovies}
                                  onChange={this._toggleShowUnavailableMovies}
                                  className="show-unavailable-movies-checkbox"
                                  label="Show unavailable movies"/>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Form.Group>
            </Form>
          ) : (
            <div className="movie-result-container flex-grow-1 m-0">
              {
                this._applyFilters(this.props.children).map((movieResult, i) => {
                  return (
                    <div key={movieResult.id}>
                      <MovieResult startHover={() => this._addHover(movieResult.id)}
                                   endHover={() => this._removeHover(movieResult.id)}
                                   hoverZ={this.state.hoverPriority.indexOf(movieResult.id) + 5001}
                                   doHover={this.props.doHover}
                                   data={movieResult}/>
                      </div>
                  );
                })
              }
            </div>
          )
        }
        {
          this.props.totalPages > 1 && (
            <Pagination innerClass="pagination mt-3 mb-0 justify-content-center align-items-center"
                        itemClass="page-item"
                        linkClass="page-link"
                        itemClassPrev="page-item-prev"
                        itemClassNext="page-item-next"
                        nextPageText="»"
                        prevPageText="«"
                        firstPageText="First"
                        lastPageText="Last"
                        activePage={this.props.pageNumber}
                        itemsCountPerPage={1}
                        totalItemsCount={this.props.totalPages}
                        pageRangeDisplayed={5}
                        onChange={this.props.setActiveMovieResultsPage}/>
          )
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    theme : state.settings.theme,
    genres : state.genres
  })
)(MovieResults);
