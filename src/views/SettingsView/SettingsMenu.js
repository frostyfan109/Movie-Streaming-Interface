import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Theme } from '../../constants.js';

class SettingsMenu extends Component {
  render() {
    return (
      <div className="settings-view">
        <Tabs defaultActiveKey="general" style={{...(this.props.theme === Theme.DARK && {borderColor: "var(--gray)"})}}>
          <Tab eventKey="general" title="General">
            {this.props.children}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
export default connect(
  (state) => ({ theme : state.settings.theme })
)(SettingsMenu);
