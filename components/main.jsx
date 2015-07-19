/** @jsx React.DOM */

var React = require('react');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var SelectField = mui.SelectField;
var TextField = mui.TextField;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;


var Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState: function() {
    return {regionSelectValue: 'us'}
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

    // var regionSelectField = React.createElement(SelectField, {
    //   value: 'us', //this.state.regionSelectValue,
    //   floatingLabelText: 'Region',
    //   hintText: 'Select the region',
    //   menuItems: ['us', 'eu', 'cn', 'kr', 'tw']
    // });

    var guildTextField = React.createElement(TextField, {
      hintText: 'Guild name'
    });

    var realmTextField = React.createElement(TextField, {
      hintText: 'hint text',
      defaultValue: 'Emerald Dream',
      floatingLabelText: 'floatingLabelText'
    });

    return (
      <div style={containerStyle}>
        <h1>RaidBro</h1>
        <h2>Find your guild</h2>
        {guildTextField}
        {realmTextField}
        {button}
      </div>
    );
  },

  _handleTouchTap: function () {
    alert('hi');
  }

});

module.exports = Main;
