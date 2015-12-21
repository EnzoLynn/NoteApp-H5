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
					items: [{
						disName: 'IOS1',
						link: 'tab-webview-subpage-setting.html'
					}, {
						disName: 'IOS',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: true,
					disName: '安全',
					items: [{
						disName: '手势设置',
						link: '#'
					}, {
						disName: '11',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: false,
					disName: '启用手势',
					link: '#',
					items: [],
					'switch': true
				}, {
					isNode: false,
					disName: '设置手势',
					link: 'appsetting-locker.html?reset=true',
					hidden: true //.mui-hidden
				}]
			};
		},

		render: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement('a', { className: 'mui-icon mui-icon-left-nav mui-pull-left' }),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'设置'
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-content' },
					React.createElement(ListContainer, { items: this.state.items })
				)
			);
		}
	});
});