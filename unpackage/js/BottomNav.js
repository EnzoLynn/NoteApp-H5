"use strict";

define(function (require, exprots, module) {
	var Navigator = React.createClass({
		displayName: "Navigator",

		render: function render() {
			return React.createElement(
				"nav",
				{ "class": "mui-bar mui-bar-tab" },
				React.createElement(
					"a",
					{ id: "defaultTab", "class": "mui-tab-item mui-active", href: "tab-webview-subpage-about.html" },
					React.createElement("span", { "class": "mui-icon mui-icon-home" }),
					React.createElement(
						"span",
						{ "class": "mui-tab-label" },
						"首页"
					)
				),
				React.createElement(
					"a",
					{ "class": "mui-tab-item", href: "tab-webview-subpage-chat.html" },
					React.createElement(
						"span",
						{ "class": "mui-icon mui-icon-email" },
						React.createElement(
							"span",
							{ "class": "mui-badge" },
							"9"
						)
					),
					React.createElement(
						"span",
						{ "class": "mui-tab-label" },
						"消息"
					)
				),
				React.createElement(
					"a",
					{ "class": "mui-tab-item", href: "tab-webview-subpage-contact.html" },
					React.createElement("span", { "class": "mui-icon mui-icon-contact" }),
					React.createElement(
						"span",
						{ "class": "mui-tab-label" },
						"通讯录"
					)
				),
				React.createElement(
					"a",
					{ "class": "mui-tab-item", href: "tab-webview-subpage-setting.html" },
					React.createElement("span", { "class": "mui-icon mui-icon-gear" }),
					React.createElement(
						"span",
						{ "class": "mui-tab-label" },
						"设置"
					)
				)
			);
		}
	});

	module.exports = Navigator;
});