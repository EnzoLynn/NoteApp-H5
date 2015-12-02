"use strict";

define(function (require, exports, module) {

	var HeadToolBar = React.createClass({
		displayName: "HeadToolBar",

		alertMsg: function alertMsg() {
			alert(111);
		},
		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"header",
					{ className: "mui-bar mui-bar-nav" },
					React.createElement("a", { className: "mui-icon mui-icon-bars mui-pull-left" }),
					React.createElement("span", { className: "mui-icon mui-icon-plusempty mui-pull-right", style: { color: '#999' },
						onClick: this.alertMsg }),
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