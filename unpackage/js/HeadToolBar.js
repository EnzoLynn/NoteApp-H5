"use strict";

define(function (require, exports, module) {

	var HeadToolBar = React.createClass({
		displayName: "HeadToolBar",

		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "mui-bar mui-bar-nav" },
					React.createElement("a", { className: "mui-icon mui-icon-bars mui-pull-left" }),
					React.createElement("a", { className: "mui-icon mui-icon-info-filled mui-pull-right", style: { color: '#999' } }),
					React.createElement(
						"h1",
						{ className: "mui-title" },
						"NoteApp "
					)
				)
			);
		}
	});

	module.exports = HeadToolBar;
});