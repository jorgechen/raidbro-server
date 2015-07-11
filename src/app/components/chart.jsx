let React = require('react');
let mui = require('material-ui');
let Table = mui.Table;

let async = require('async');
let bnet = require('battlenet-api')();


let Chart = React.createClass({
  getInitialState: function() {
    // Get the list of characters

    async.waterfall(
      [
        function getTopRbgCharacters(finishCallback) {
          var characters = [];
          finishCallback(null, characters);
        },
      ],
      function (error, result) {

      }
    );


    // Get the items of each character


    // Count up all the items



    let rowData = [
      {selected: true, id: {content: '1'}, name: {content: 'John Smith'}, status: {content: 'Employed'}},
      {id: {content: '2'}, name: {content: 'Randal White'}, status: {content: 'Unemployed'}},
      {selected: true, id: {content: '3'}, name: {content: 'Stephanie Sanders'}, status: {content: 'Employed'}},
      {id: {content: '4'}, name: {content: 'Steve Brown'}, status: {content: 'Employed'}},
      {id: {content: '5'}, name: {content: 'Joyce Whitten'}, status: {content: 'Employed'}},
      {id: {content: '6'}, name: {content: 'Samuel Roberts'}, status: {content: 'Unemployed'}},
      {id: {content: '7'}, name: {content: 'Adam Moore'}, status: {content: 'Employed'}},
      {id: {content: '8'}, name: {content: 'Robert Brown'}, status: {content: 'Employed'}},
      {id: {content: '9'}, name: {content: 'Elizabeth Stevenson'}, status: {content: 'Employed'}},
      {id: {content: '10'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}},
      {id: {content: '11'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}}
    ];


    // this.state
    return {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      canSelectAll: false,
      deselectOnClickaway: true,
      height: '300px',
      rowData: rowData
    };
  },


  render: function() {
    // Column configuration
    let headerCols = {
      id: {
        content: 'Item',
        tooltip: 'One piece of unique gear'
      },
      name: {
        content: 'Count',
        tooltip: 'Number of people who equips this item'
      },
      status: {
        content: 'Type',
        tooltip: 'Cloth, leather'
      }
    };
    let colOrder = ['id', 'name', 'status'];
    // Footer column content can also be specified as [ 'ID', 'Name', 'Status'].
    let footerCols = {id: {content: 'ID'}, name: {content: 'Name'}, status: {content: 'Status'}};

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

});

module.exports = Chart;
