import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from './Routes.js';
import SettingsMenu from './SettingsMenu.js';
import './SettingsView.css';

class SettingsView extends Component {
  render() {
    return (
      <div className="SettingsView">
        <SettingsMenu>
          <Routes/>
        </SettingsMenu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme : state.settings.theme
  };
}

export default connect(
  mapStateToProps
)(SettingsView)
