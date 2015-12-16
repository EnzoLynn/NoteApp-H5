'use strict';

define(function (require, exports, module) {

	var ListContainer = require('js/ListContainer.js');

	mui.plusReady(function () {
		ReactDOM.render(React.createElement(SettingContainer, null), mui('.container')[0]);
	});

	var SettingContainer = React.createClass({
		displayName: 'SettingContainer',

		getInitialState: function getInitialState() {
			return {
				items: [{
					isNode: true,
					disName: '产品',
					items: [{ disName: 'IOS', link: 'tab-webview-subpage-setting.html' }, { disName: 'IOS', link: '#' }, { disName: 'IOS', link: '#' }]
				}, {
					isNode: true,
					disName: '产品',
					items: [{ disName: 'IOS', link: '#' }, { disName: 'IOS', link: '#' }, { disName: 'IOS', link: '#' }]
				}, {
					isNode: false,
					disName: '产品',
					link: '#',
					items: []
				}]
			};
		},
		componentDidMount: function componentDidMount() {},
		render: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(ListContainer, { items: this.state.items })
			);
		}
	});
});