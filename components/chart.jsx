/** @jsx React.DOM */

var React = require('react');
var mui = require('material-ui');
var Table = mui.Table;

var Chart = React.createClass({
  getInitialState: function(rowData) {
    rowData = rowData || [];
    console.log('getInitialState')

    return {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      canSelectAll: false,
      deselectOnClickaway: true,
      // height: '300px',
      rowData: rowData
    };
  },

  componentDidMount: function () {

    //This is not getting called for some reason???
    console.log("componentDidMount")
    alert("componentDidMount")

    // Load the actual data
    var data = require('../warlords-s2-conquest.json');

    data = {
      "124856": {
        "name": "Wild Gladiator's Badge of Conquest",
        "quality": 4,
        "itemLevel": 700,
        "count": 61,
        "slot": "trinket1",
        "owners": [
          {
            "name": "Top",
            "realm": "tichondrius"
          },
          {
            "name": "Idsappdat",
            "realm": "tichondrius"
          }
        ]
      }
    };

    var rowData = [];

    for (var itemId in data) {
      var item = data[itemId];

      var href = "http://www.wowhead.com/item=" + itemId;
      var prettyName = <a target="_blank" href={href} class="q4">{item.name}</a>;

      var characters = item.owners.map(function (i) {
        return (
          <a href={'http://us.battle.net/wow/en/character/' + i.realm + '/' + i.name + '/advanced'} target="_blank">{i.name}</a>
        );
      });

      rowData.push({
        name: {content: prettyName},
        count: {content: item.count},
        slot: {content: item.slot},
        characters: {content: characters}
      })
    }

    var newState = this.getInitialState(rowData);
    this.setState(newState);
  },

  render: function() {
    // Column configuration
    var headerCols = {
      name: {
        content: 'Item',
        tooltip: 'One piece of unique gear'
      },
      count: {
        content: 'Count',
        tooltip: 'Number of people who equips this item'
      },
      slot: {
        content: 'Slot',
        tooltip: 'e.g. head, legs, weapon'
      },
      characters: {
        content: 'Players',
        tooltip: 'Player(s) with this item equipped (may be outdated)'
      }
    };
    var colOrder = ['name', 'count', 'slot', 'characters'];
    var footerCols = headerCols;

    var table = React.createElement(Table, {
      headerColumns: headerCols,
      footerColumns: footerCols,
      columnOrder: colOrder,
      rowData: this.state.rowData,
      height: this.state.height,
      fixedHeader: this.state.fixedHeader,
      fixedFooter: this.state.fixedFooter,
      stripedRows: this.state.stripedRows,
      showRowHover: this.state.showRowHover,
      selectable: this.state.selectable,
      multiSelectable: this.state.multiSelectable,
      canSelectAll: this.state.canSelectAll,
      deselectOnClickaway: this.state.deselectOnClickaway,
      onRowSelection: this._onRowSelection
    });

    return (
      table
    );
  },

  _onRowSelection: function() {
    //todo
    alert('hi');
  }

});

module.exports = Chart;
