import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { withRouter, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import * as classNames from 'classnames';
import { setIndexServer, retryFetchIndexServers } from '../../../redux/actions.js';
import { WEBSITE_NAME, Theme } from '../../../constants.js';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue : ''
    };

    this._popularLink = React.createRef();
    this._searchLink = React.createRef();
  }

  componentDidMount() {
    // Index 0 is an empty string (pathname is relative to root)
    const path = this.props.location.pathname.split("/")
    if (path[1].localeCompare("SEARCH", undefined, { sensitivity : "accent" }) === 0 && path.length === 3) {
      // Doesn't seem to be a way to access the current route's actual params.
      this.setState({
        searchValue : path[2]
      });
    }
  }

  render() {
    return (
      <div className={
            classNames(
              "Header-Container sticky-top bg-light",
              this.props.theme === Theme.DARK && "navbar-dark",
              this.props.theme === Theme.LIGHT ? "text-light" : "text-dark",
              "shadow-sm mb-1"
            )}>
        <Navbar className="Header padded"
                expand="md"
                // bg={this.props.theme === Theme.LIGHT ? "light" : "dark"}
                collapseOnSelect>
          {/* Has to be positioned so strangely to avoid bugs from react-router-bootstrap*/}
          <Nav.Link className="p-0" onClick={(e)=>this._popularLink.current.click()}><Navbar.Brand>{WEBSITE_NAME}</Navbar.Brand></Nav.Link>
          <Navbar.Toggle aria-controls="header-navbar-nav" />
          <Navbar.Collapse className="header-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer exact to="/">
                <Nav.Link ref={this._popularLink}>Popular</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/new">
                <Nav.Link>New</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/genres">
                <Nav.Link>Genres</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/search/${this.state.searchValue}`} className="d-none"><Nav.Link ref={this._searchLink}/></LinkContainer>
            </Nav>
            <Form inline onSubmit={(e) => {
              e.preventDefault();
              this._searchLink.current.click();
            }}>
              <InputGroup className={classNames(this.props.theme === Theme.DARK && "border border-secondary")} style={{ borderRadius : "4px" }}>
                <Form.Control type="text"
                              placeholder="Search movies..."
                              className="bg-light text-dark"
                              value={this.state.searchValue}
                              style={this.props.theme === Theme.DARK ? {borderRight : "1px solid var(--secondary)"} : {}}
                              onChange={(e) => this.setState({ searchValue : e.target.value })}/>
                <InputGroup.Append>
                  <InputGroup.Text onClick={(e) => this._searchLink.current.click()}>
                    <FaSearch/>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {(() => {
          const loadingAlert = !this.props.indexServersLoaded;
          const emptyAlert = this.props.indexServersLoaded && this.props.indexServers.length === 0;
          let alertText;
          let button;
          if (loadingAlert) {
            alertText = <span className="loading">Loading index servers</span>;
            button = <Button className="p-0 invisible" style={{backgroundColor: "transparent"}}>&nbsp;</Button>;
          }
          else if (emptyAlert) {
            alertText = (
              <>
              <span>No index servers are currently available.&nbsp;</span>
              </>
            );
            button = (
              <Button variant="link" className="p-0 fetch-index-servers-retry-button" onClick={(e) => {
                this.props.retryFetchIndexServers();
              }}>Retry?</Button>
            );
          }
          return (
            <Alert show={loadingAlert || emptyAlert}
                   variant={loadingAlert ? "primary" : (emptyAlert ? "danger" : null)}
                   className="mb-0 p-1 d-flex justify-content-center align-items-center">
              <h6 className="m-0">{alertText}</h6>
              {button}
            </Alert>
          );
        })()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme : state.settings.theme,
    ...state.indexServers
  };
}

export default connect(
  mapStateToProps,
  { retryFetchIndexServers }
)(withRouter(Header));
