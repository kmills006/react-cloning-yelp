import React, { PropTypes } from 'react';
// import ReactDOM from 'react-dom';
import { Router } from 'react-router';

// import styles from './styles.module.css';

class App extends React.Component {
  get content() {
    return (
      <Router history={this.props.history} routes={this.props.routes} />
    );
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.content}
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
};

module.exports = App;
