"use strict";

define(function (require, exports, module) {

	var ListItem = require('js/ListItem.js');

	var ListContainer = React.createClass({
		displayName: "ListContainer",

		render: function render() {
			var items = [];
			this.props.items.forEach(function (item, index) {
				items.push(React.createElement(ListItem, { item: item }));
			});
			return React.createElement(
				"div",
				null,
				React.createElement(
					"ul",
					{ className: "mui-table-view" },
					items
				)
			);
		}
	});

	module.exports = ListContainer;
});