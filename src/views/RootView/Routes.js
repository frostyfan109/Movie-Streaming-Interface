import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { Hover } from '../../components/MovieResults';
import * as Views from '../';
import { setPopularMovies, setNewMovies } from '../../redux/actions.js';


class Routes extends Component {
  render() {
    return (
      <>
        <Route exact path="/" render={(props) => (
          <Views.ResultView tags={["Popular"]} movies={this.props.popularMovies} setActiveMovieResultsPage={this.props.setPopularMovies}/>
        )} />
        <Route path="/new" render={(props) => (
          <Views.ResultView tags={["New"]} movies={this.props.newMovies} setActiveMovieResultsPage={this.props.setNewMovies}/>
        )} />
        <Route path="/genres" component={Views.GenresView} />
        <Route path="/genre/:id" component={Views.GenreView} />
        <Route path="/search/:query?" component={Views.SearchView} />
        <Route path="/settings" component={Views.SettingsView} />

        <Route exact path="/about" component={Views.AboutView} />
        <Route path="/about/privacy" component={Views.PrivacyView} />
        <Route path="/about/terms" component={Views.TermsOfUseView} />

        <Route path="/movie/:movieId" component={Views.MovieView} />
      </>
    );
  }
}
export default connect(
  (state) => ({
    ...state.movieResults
  }),
  {
    setPopularMovies,
    setNewMovies
  }
)(Routes);
