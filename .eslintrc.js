module.exports = {
  // Following AirBnB's lead
  "extends": "airbnb",

  parserOptions: {
    ecmaVersion: 6,
  },

  // And overriding where necessary
  "rules": {
    // Meteor refers to ids with `_id`
    "no-underscore-dangle": 0,

    // Meteor build tool aliases "/" to the project root, which causes the
    // resolver to complain
    "import/no-unresolved": 0,

    // These configurations reflect our specific workflow with ReactTerminator
    "jsx-a11y/img-has-alt": 0,
    "react/jsx-first-prop-new-line": 0,

    // Lots of callback constructs shouldn't necessarily have a return value,
    // particularly callbacks associated with Meteor.subscribe.
    "consistent-return": 0,

    // We prefer to allow alerts/confirms because they function as desired 
    // across platforms (especially mobile)
    "no-alert": 0,
  },

  // To configure global variables inside of a configuration file, use the
  // globals key and indicate the global variables you want to use. Set each
  // global variable name equal to true to allow the variable to be overwritten
  // or false to disallow overwriting.
  globals: {
    // node globals
    "util": false,

    // Meteor core
    "Meteor": false,
    "DDP": false,
    "Mongo": false, //Meteor.Collection renamed to Mongo.Collection
    "Session": false,
    "Accounts": false,
    "Template": false,
    "Blaze": false,  //UI is being renamed Blaze
    "UI": false,
    "Match": false,
    "check": false,
    "Tracker": false, //Deps renamed to Tracker
    "Deps": false,
    "ReactiveVar": false,
    "EJSON": false,
    "HTTP": false,
    "Email": false,
    "Assets": false,
    "Handlebars": false,
    "Package": false,
    "App": false, //mobile-config.js
    "Future": false,

    // Meteor internals
    "DDPServer": false,
    "global": false,
    "Log": false,
    "MongoInternals": false,
    "process": false,
    "WebApp": false,
    "WebAppInternals": false,

    // globals useful when creating Meteor packages
    "Npm": false,
    "Tinytest": false,

    // common Meteor packages
    "Random": false,
    "lodash": false,
    "_": true,                // Set to true to allow redefining to Lodash.
    "$": false,               // jQuery
    "Router": false,          // iron-router
    "FlowRouter": false,      // flow-router
    "React": false,           // React
    "ReactLayout": false,     // ReactLayout
    "ReactRouter": false,
    "ReactDOM": false,
    "ReactMeteorData": false,

    // App packages
    "SimpleSchema": false,
    "Roles": false,

    // Collections
    // PUT YOUR APP'S COLLECTION GLOBALS HERE
  }
};
