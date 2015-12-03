'use strict';

define(function (require, exports, module) {
	var HeadToolBar = React.createClass({
		displayName: 'HeadToolBar',

		openAddWindow: function openAddWindow() {
			var me = this;
			me.setState({
				backHome: 'block',
				openAddWindow: 'block',
				completeNote: 'block'
			});
			//及页面大小； 页面切换使用原生动画， 将最耗性能的部分交给原生实现.
			mui.openWindow({
				url: "addNoteWindow.html",
				id: "addNoteWindow",
				styles: {
					top: 0, //新页面顶部位置
					bottom: 0, //新页面底部位置
					width: '100%', //新页面宽度，默认为100%
					height: '100%', //新页面高度，默认为100%
					hardwareAccelerated: true //硬件加速
				},
				extras: {
					myname: 'ttt'
					//自定义扩展参数，可以用来处理页面间传值
				},
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true
					aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
					duration: 100 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
					options: {
						//width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
						//height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度
					}
				}
			});
		},
		render: function render() {
			var me = this;
			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement('a', { className: 'mui-icon mui-icon-plusempty mui-pull-right', style: { color: '#999' },
						onClick: me.openAddWindow }),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'NoteApp '
					)
				)
			);
		}
	});

	module.exports = HeadToolBar;
});