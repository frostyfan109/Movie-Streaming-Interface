import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { WEBSITE_NAME } from '../../../constants.js';
import './Footer.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Footer">
      <footer className="margin-padded pt-5 my-md-1 pt-md-4 border-top">
        <Row className="p-0">
          <Col className="col-md col-12">
            <h6>{WEBSITE_NAME}</h6>
            <small className="d-block mb-3 text-muted">
              {new Date().getFullYear()}-{new Date().getFullYear()+1}<br/><br/>
              Disclaimer: This site does not store any files on its server. All contents are provided by non-affiliated third parties.
            </small>
          </Col>
          <Col className="col-md col-6">
            <h6>About</h6>
            <ul className="list-unstyled">
              <Link to="/about"><li className="text-muted">About</li></Link>
              <Link to="/about/privacy"><li className="text-muted">Privacy</li></Link>
              <Link to="/about/terms"><li className="text-muted">Terms</li></Link>
            </ul>
          </Col>
          <Col className="col-md col-6">
          </Col>
          <Col className="col-md col-6">
          </Col>
        </Row>
      </footer>
      </div>
    );
  }
}
