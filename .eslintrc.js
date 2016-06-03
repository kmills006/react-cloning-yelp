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

    "new-cap": [2, { "capIsNewExceptions": ["GoogleApiWrapper"] }],
  },

  // To configure global variables inside of a configuration file, use the
  // globals key and indicate the global variables you want to use. Set each
  // global variable name equal to true to allow the variable to be overwritten
  // or false to disallow overwriting.
  globals: {
    // node globals
    "util": false,

    // lodash
    "_": false,

    // Tests
    "describe": false,
    "beforeEach": false,
    "it": false,

    // Env Variables
    "__GAPI_KEY__": false,
  }
};
