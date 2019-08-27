import React, { Component } from 'react';
import MovieResults from '../../components/MovieResults';

export default class ResultView extends Component {
  static defaultProps = {
    tags : []
  };
  constructor(props) {
    super(props);

    this.state = {
      activePage : 1
    };

    this._setActiveMovieResultsPage = this._setActiveMovieResultsPage.bind(this);
  };

  _setActiveMovieResultsPage(page) {
    this.setState({ activePage : page });
    if (this.props.movies.filter((pageResults) => pageResults.page === page).length === 0) {
      this.props.setActiveMovieResultsPage(page);
    }
  }

  render() {
    const { movies : pages } = this.props;
    const { results, total_pages : totalPages, page : pageNumber } = pages.filter((pageResults) => pageResults.page === this.state.activePage)[0] || {};
    return (<MovieResults tags={this.props.tags}
                         doHover={this.props.doHover}
                         maxRows={this.props.maxRows}
                         noFilter={this.props.noFilter}
                         setActiveMovieResultsPage={this._setActiveMovieResultsPage}
                         totalPages={totalPages}
                         pageNumber={pageNumber}>{results}</MovieResults>);
  }
}
