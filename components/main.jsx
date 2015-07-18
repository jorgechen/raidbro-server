/** @jsx React.DOM */

var React = require('react');

var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var RaisedButton = mui.RaisedButton;

var Chart = require('./chart.jsx');

var Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function () {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render: function () {

    var containerStyle = {
      textAlign: 'center',
      paddingTop: '200px'
    };

    var standardActions = [
      { text: 'Okay' }
    ];

    var button = React.createElement(RaisedButton, {
      label: "Super Secret Password",
      primary: true,
      onTouchTap: this._handleTouchTap
    });

    var chart = React.createElement(Chart);

    return (
      <div style={containerStyle}>

        <h1>material-ui</h1>
        <h2>example project</h2>
        {button}
        {chart}
      </div>
    );
  },

  _handleTouchTap: function () {
    alert('hi');
  }

});

module.exports = Main;
