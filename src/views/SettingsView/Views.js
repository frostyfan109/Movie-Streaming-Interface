import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Card, Button } from 'react-bootstrap';
import * as classNames from 'classnames';
import { setIndexServer, setTheme, setUseCache } from '../../redux/actions.js';
import { Theme } from '../../constants.js';

const SettingsPage = connect(
  function(state) {
    return {
      theme : state.settings.theme
    }
  }
)(class extends Component {
  render() {
    return (
      <Form className={classNames("w-100", this.props.theme === Theme.DARK && "text-white")} onSubmit={(e) => {
        e.preventDefault();
      }}>
        {this.props.children}
      </Form>
    );
  }
})

const SettingsCard = connect(
  function(state) {
    return {
      theme : state.settings.theme
    }
  }
)(class extends Component {
  render() {
    return (
      <Card className={classNames("bg-light", this.props.theme === Theme.DARK && "border-secondary")}>
        <Card.Header className={classNames(this.props.theme === Theme.DARK && "border-secondary border-bottom bg-secondary")}>{this.props.header}</Card.Header>
        <Card.Body>
          {this.props.body}
        </Card.Body>
      </Card>
    );
  }
})

export const GeneralView = connect(
  function(state) {
    return {
      ...state.indexServers,
      indexServer : state.settings.indexServer,
      theme : state.settings.theme,
      useCache : state.settings.useCache
    };
  },
  { setIndexServer, setTheme, setUseCache }
)(
class extends React.Component {
  constructor(props) {
    super(props);

    this._toggleTheme = this._toggleTheme.bind(this);
    this._toggleUseCache = this._toggleUseCache.bind(this);
  }
  _toggleTheme() {
    this.props.setTheme(this.props.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  }
  _toggleUseCache() {
    this.props.setUseCache(!this.props.useCache);
  }
  render() {
    return (
      <SettingsPage>
        <SettingsCard header="Server" body={
          <>
          <Form.Group>
            <Form.Label>Index Server: </Form.Label>
            {(() => {
              if (!this.props.indexServersLoaded) {
                return <div className="form-control">Loading</div>;
              }
              else if (this.props.indexServers.length === 0) {
                return <div className="form-control">No index servers available</div>;
              }
              else {
                return (
                  <Form.Control as="select" value={this.props.indexServer} onChange={(e) => {
                    this.props.setIndexServer(e.target.value);
                  }}>
                    {
                      this.props.indexServers.map((indexServer, i) => {
                        return (
                          <option key={i}>
                          {indexServer.name}
                          </option>
                        );
                      })
                    }
                  </Form.Control>
                );
              }
            })()}
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Disable cache" checked={!this.props.useCache} onChange={this._toggleUseCache}/>
          </Form.Group>
          </>
        }/>

        <br/>
        <SettingsCard header="Theme" body={
          <>
          <Form.Group><Form.Check type="checkbox" label="Dark Theme" checked={this.props.theme === Theme.DARK} onChange={this._toggleTheme}/></Form.Group>
          </>
        }/>
      </SettingsPage>
    );
  }
});
