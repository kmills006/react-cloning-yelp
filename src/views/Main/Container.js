import React, { PropTypes } from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';
import { searchNearby } from 'utils/googleApiHelpers';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: null,
      places: [],
    };

    this.onReady = this.onReady.bind(this);
  }

  onReady(mapProps, map) {
    const { google } = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe'],
    };

    searchNearby(google, map, opts)
    .then((results, pagination) => {
      this.setState({
        pagination,
        places: results,
      });
    }).catch(status => {
      console.log('ERROR STATUS: ', status);
    });
  }

  render() {
    return (
      <div>
        <Map
          onReady={this.onReady}
          google={this.props.google}
        />
      </div>
    );
  }
}

Container.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__,
})(Container);
