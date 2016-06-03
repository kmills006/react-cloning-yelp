import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>
          <i className="fa fa-star"></i>
          Environment: {__NODE_ENV__}
        </h1>
      </div>
    );
  }
}

module.exports = App;
