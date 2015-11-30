'use strict';

define(function (require, exports, module) {
	var HeadToolBar = require('js/HeadToolBar.js');
	var first;

	mui.plusReady(function () {
		ReactDOM.render(React.createElement(NoteApp, null), mui('.container')[0]);
	});

	mui.back = function () {

		//首次按键，提示‘再按一次退出应用’
		if (!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function () {
				first = null;
			}, 1000);
		} else {
			if (new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}
	};

	var NoteApp = React.createClass({
		displayName: 'NoteApp',

		componentDidMount: function componentDidMount() {
			mui.init({
				subpages: [{
					url: 'listSubPage.html', //下拉刷新内容页面地址
					id: 'listSubPage', //内容页面标志
					styles: {
						top: '48px',
						bottom: '10px'
					}
				}]
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(HeadToolBar, null)
			);
		}
	});
});