let Chart = require('./chart.jsx');

let React = require('react');
let mui = require('material-ui');
let RaisedButton = mui.RaisedButton;
let ThemeManager = new mui.Styles.ThemeManager();
let Colors = mui.Styles.Colors;

let Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },

  render: function() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px'
    };

    return (
      <div style={containerStyle}>
        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />

        <Chart />


      </div>
    );
  },

  _handleTouchTap: function() {
    alert('1-2-3-4-5');
  }

});

module.exports = Main;
