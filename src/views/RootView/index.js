import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { createBrowserHistory } from 'history';
import Header from './Header';
import Footer from './Footer';
import Routes from './Routes.js';
import Loading from '../../components/Loading';
import ScrollToTop from '../../components/ScrollToTop';
import { fetchIndexServers, setIndexServer } from '../../redux/actions.js';
import { WEBSITE_NAME, Theme } from '../../constants.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RootView.css';

class RootView extends Component {
  constructor(props) {
    super(props);

    this._ref = React.createRef();
  }
  componentDidMount() {
    if (!this.props.indexServersLoaded) {
      this.props.fetchIndexServers();
    }
    if (this.props.indexServer !== null) {
      // Populate movie results on page load (as long as there is an active index server)
      this.props.setIndexServer(this.props.indexServer);
    }
  }
  render() {
    return (
      <div className={classNames("App", this.props.theme === Theme.LIGHT && "bg-light")} ref={this._ref}>
        <Router history={createBrowserHistory()}>

        <Helmet>
          <title>{WEBSITE_NAME}</title>
          <link rel="stylesheet"
                href={`${process.env.PUBLIC_URL}/bootstrap-cyborg.min.css`}
                {...(this.props.theme !== Theme.DARK ? {disabled : true} : {})}/>
          <style>
            {`
              html {
                font-size: 16px;
              }
            `}
          </style>
        </Helmet>

        <ScrollToTop scrollToTop={() => this._ref.current.scrollTo(0, 0)}/>

        <Header/>

        <div className={classNames("main-content padded", this.props.theme === Theme.LIGHT && "bg-light")}>
          <div className="h-100">
            <div className="py-3 h-100">
              <Routes/>
            </div>
          </div>
        </div>

        <Footer/>

        </Router>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    indexServer : state.settings.indexServer,
    theme : state.settings.theme,
    ...state.indexServers
  }),
  { fetchIndexServers, setIndexServer }
)(RootView);
