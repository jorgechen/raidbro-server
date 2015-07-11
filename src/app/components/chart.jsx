let React = require('react');
let mui = require('material-ui');
let Table = mui.Table;

let Chart = React.createClass({
  getInitialState: function(rowData) {
    rowData = rowData || [];

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

    // Load the actual data
    let data = require('../../../warlords-s2-conquest.json');

    var rowData = [];

    for (let itemId in data) {
      let item = data[itemId];

      let href = "http://www.wowhead.com/item=" + itemId;
      let prettyName = <a target="_blank" href={href} class="q4">{item.name}</a>;

      let characters = item.owners.map(function (i) {
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

    let newState = this.getInitialState(rowData);
    this.setState(newState);
  },

  render: function() {
    // Column configuration
    let headerCols = {
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
    let colOrder = ['name', 'count', 'slot', 'characters'];
    let footerCols = headerCols;

    return (
      <Table
        headerColumns={headerCols}
        footerColumns={footerCols}
        columnOrder={colOrder}
        rowData={this.state.rowData}
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        stripedRows={this.state.stripedRows}
        showRowHover={this.state.showRowHover}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
        canSelectAll={this.state.canSelectAll}
        deselectOnClickaway={this.state.deselectOnClickaway}
        onRowSelection={this._onRowSelection} />
    );
  },

  _onRowSelection: function() {
    //todo
  }

});

module.exports = Chart;
