import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
   if (this.props.location !== prevProps.location) {
     this.props.scrollToTop();
   }
  }
  render() {
    return null;
  }
})
