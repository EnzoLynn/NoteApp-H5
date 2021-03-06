'use strict';

define(function (require, exports, module) {
	var HeadToolBar = require('js/HeadToolBar.js');
	var Navigator = require('js/Navigator.js');

	var first;

	mui.plusReady(function () {

		ReactDOM.render(React.createElement(NoteApp, null), mui('.container')[0]);
	});

	var NoteApp = React.createClass({
		displayName: 'NoteApp',

		componentDidMount: function componentDidMount() {
			var me = this;
			var hasLocker = plus.storage.getItem('Locker');
			var subpages = [{
				url: 'listSubPage.html', //下拉刷新内容页面地址
				id: 'listSubPage', //内容页面标志
				styles: {
					top: '48px',
					bottom: '51px'
				}
			}];
			if (hasLocker && hasLocker == 'enable') {
				subpages.push({
					url: 'subpages/appsetting-locker.html', //下拉刷新内容页面地址
					id: 'locker-dom', //内容页面标志
					styles: {
						top: '0px',
						bottom: '0px'
					}
				});
			};
			mui.init({
				keyEventBind: {
					backbutton: false //关闭back按键监听
				},
				subpages: subpages,
				preloadPages: [{
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
						//自定义扩展参数，可以用来处理页面间传值
					},
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						autoShow: true, //页面loaded事件发生后自动显示，默认为true
						aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
						duration: 1 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
						options: {
							//width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
							//height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度
						}
					}
				}, {
					url: "Share.html",
					id: "Share",
					styles: {
						top: 0, //新页面顶部位置
						bottom: 0, //新页面底部位置
						width: '100%', //新页面宽度，默认为100%
						height: '100%', //新页面高度，默认为100%
						hardwareAccelerated: true //硬件加速
					},
					extras: {
						//自定义扩展参数，可以用来处理页面间传值
					},
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					show: {
						autoShow: true, //页面loaded事件发生后自动显示，默认为true
						aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
						duration: 1 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
						options: {
							//width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
							//height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度
						}
					}
				}],

				beforeback: function beforeback() {
					//首次按键，提示‘再按一次退出应用’
					if (!first) {
						first = new Date().getTime();
						mui.toast('再按一次退出应用');
						setTimeout(function () {
							first = null;
						}, 1000);
						return false;
					} else {
						if (new Date().getTime() - first < 1000) {
							plus.runtime.quit();
						}
					}
					return true;
				}
			});
		},
		getInitialState: function getInitialState() {
			var subpage_style = {
				top: '0px',
				bottom: '51px'
			};
			return {
				subpages: [{
					url: 'listSubPage.html',
					icon: 'mui-icon-home',
					title: '首页',
					styles: {
						top: '48px',
						bottom: '51px'
					}
				}, {
					url: 'subpages/tab-webview-subpage-chat.html',
					icon: 'mui-icon-email',
					title: '消息',
					//tip: 9,
					styles: subpage_style
				}, {
					url: 'subpages/Contact.html',
					icon: 'mui-icon-contact',
					title: '通讯录',
					styles: subpage_style
				}, {
					url: 'subpages/appsetting.html',
					icon: 'mui-icon-gear',
					title: '设置',
					styles: subpage_style
				}]
			};
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(HeadToolBar, { currpage: 'home' }),
				React.createElement(Navigator, { subpages: this.state.subpages })
			);
		}
	});
});