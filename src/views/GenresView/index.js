import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as classNames from 'classnames';
import Loading from '../../components/Loading';
import { Theme } from '../../constants.js';
import './GenresView.css';

class GenresView extends Component {
  render() {
    return (
      <div className={classNames("Genres-view", this.props.genres === null && "d-flex justify-content-center align-items-center")}>
        {
          this.props.genres === null ? (
            <Loading loading={true}
                     tooltip={<div className="h6">Loading genres</div>}
                     className={classNames(this.props.theme !== Theme.DARK && "bg-light")}/>
          ) : this.props.genres.map((genre, i) => {
            return (
              <Button variant="primary"
                      className="w-auto h-auto"
                      key={genre.id}
                      onClick={() => {
                        this.props.history.push("/genre/" + genre.id);
                      }}>
                {genre.name}
              </Button>
            );
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme : state.settings.theme,
    genres : state.genres
  };
}

export default connect(
  mapStateToProps
)(withRouter(GenresView))
