'use strict';

define(function (require, exports, module) {
	var $ = require('jquery');
	var HeadToolBar = require('js/HeadToolBar.js');
	var first;
	mui.init();

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
	// H5 plus事件处理ddd
	function plusReady() {

		// 弹出系统选择按钮框
		plus.nativeUI.actionSheet({
			title: "Plus is ready!",
			cancel: "取消",
			buttons: [{
				title: "1"
			}, {
				title: "2"
			}]
		}, function (e) {
			console.log("User pressed: " + e.index);
		});
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	var NoteApp = React.createClass({
		displayName: 'NoteApp',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(HeadToolBar, null),
				React.createElement(
					'div',
					{ 'class': 'mui-content' },
					React.createElement(
						'ul',
						{ className: 'mui-table-view' },
						React.createElement(
							'li',
							{ className: 'mui-table-view-cell mui-media' },
							React.createElement(
								'a',
								{ href: 'javascript:;' },
								React.createElement('img', { className: 'mui-media-object mui-pull-left', src: '../images/shuijiao.jpg' }),
								React.createElement(
									'div',
									{ className: 'mui-media-body' },
									'幸福',
									React.createElement(
										'p',
										{ className: 'mui-ellipsis' },
										'能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？'
									)
								)
							)
						),
						React.createElement(
							'li',
							{ className: 'mui-table-view-cell mui-media' },
							React.createElement(
								'a',
								{ href: 'javascript:;' },
								React.createElement('img', { className: 'mui-media-object mui-pull-left', src: '../images/muwu.jpg' }),
								React.createElement(
									'div',
									{ className: 'mui-media-body' },
									'木屋',
									React.createElement(
										'p',
										{ className: 'mui-ellipsis' },
										'想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.'
									)
								)
							)
						),
						React.createElement(
							'li',
							{ className: 'mui-table-view-cell mui-media' },
							React.createElement(
								'a',
								{ href: 'javascript:;' },
								React.createElement('img', { className: 'mui-media-object mui-pull-left', src: '../images/cbd.jpg' }),
								React.createElement(
									'div',
									{ className: 'mui-media-body' },
									'CBD',
									React.createElement(
										'p',
										{ className: 'mui-ellipsis' },
										'烤炉模式的城，到黄昏，如同打翻的调色盘一般.'
									)
								)
							)
						)
					)
				)
			);
		}
	});
	$(function () {
		ReactDOM.render(React.createElement(NoteApp, null), $('.container').get(0));
	});
});