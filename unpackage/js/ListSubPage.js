'use strict';

define(function (require, exports, module) {
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(ListSubPage, null), mui('.subpageContainer')[0]);
	});

	var NoteRow = React.createClass({
		displayName: 'NoteRow',

		delNote: function delNote(e, key) {
			e.stopPropagation();
			var me = this;
			var li = me.refs.muiLi;
			setTimeout(function () {
				mui.swipeoutClose(li);
			}, 0);
			plus.storage.removeItem(key);
			me.props.afterdel1();
		},
		editNote: function editNote(e, key) {
			e.stopPropagation();
			var me = this;
			var val = plus.storage.getItem(key);
			if (val == null) {
				val = '';
			};
			var ws = mui.openWindow({
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
					// myid:key,
					// myval:val
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
			//plus.webview.getWebviewById('addNoteWindow');
			if (ws) {

				ws.evalJS("PushValue('" + key + "','" + val + "')");
			};
		},
		openShareWindow: function openShareWindow(key) {
			var me = this;
			//及页面大小； 页面切换使用原生动画， 将最耗性能的部分交给原生实现.
			var ws = mui.openWindow({
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
			});
			if (ws) {
				var val = plus.storage.getItem(key);
				if (val == null) {
					val = '';
				};
				ws.evalJS('ShareText(\'' + val + '\')');
			};
		},
		render: function render() {
			var _this = this;

			var me = this;
			var note = this.props.note;
			if (note.val == null) {
				note.val = '';
			};

			var deNote = unescape(note.val);
			var val = deNote.length > 14 ? deNote.substring(0, 15) + '...' : deNote;

			return React.createElement(
				'li',
				{ ref: 'muiLi', className: 'mui-table-view-cell listCell' },
				React.createElement(
					'div',
					{ className: 'mui-slider-right mui-disabled ' },
					React.createElement(
						'a',
						{ className: 'mui-btn mui-btn-blue', onClick: function () {
								return _this.openShareWindow(note.key);
							} },
						'分享'
					),
					React.createElement(
						'a',
						{ className: 'mui-btn mui-btn-red', onClick: function (e) {
								return _this.delNote(e, note.key);
							} },
						'删除'
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-slider-handle', onClick: function (e) {
							return _this.editNote(e, note.key);
						} },
					React.createElement(
						'a',
						{ className: 'mui-navigate-right' },
						val
					)
				)
			);
		}
	});
	window.getNoteList = function (scope) {

		var me = scope;
		var keyNames = [];
		var values = [];
		var numKeys = plus.storage.getLength();
		var notes = [];
		for (var i = 0; i < numKeys; i++) {
			var key = keyNames[i] = plus.storage.key(i);
			var val = values[i] = plus.storage.getItem(keyNames[i]);
			if (val == '') {
				val = '';
			}
			notes.push({
				key: key,
				val: val
			});
		}
		notes.sort(function (a, b) {
			var kA = a.key;
			var kB = b.key;
			return kA < kB ? 1 : -1;
		}); //
		me.setState({
			notes: notes
		});
	};

	// 下拉刷新容器
	var ListSubPage = React.createClass({
		displayName: 'ListSubPage',

		/**
   * 下拉刷新具体业务实现
   */
		pulldownRefresh: function pulldownRefresh() {
			var me = this;
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			me.getList();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			mui('#pullrefresh').pullRefresh().refresh(true);
		},
		/**
   * 上拉加载具体业务实现
   */
		pullupRefresh: function pullupRefresh() {
			var me = this;

			var numKeys = plus.storage.getLength();

			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			mui('#pullrefresh').pullRefresh().endPullupToRefresh(cells.length >= numKeys); //参数为true代表没有更多数据了。
			me.getList();
		},
		getList: function getList() {
			var me = this;
			window.getNoteList(me);
		},
		componentDidMount: function componentDidMount() {
			var me = this;
			window.scope = me;
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
						callback: me.pulldownRefresh
					},
					up: {
						contentdown: "上拉可以加载",
						contentover: "释放立即加载",
						contentrefresh: '正在加载...',
						callback: me.pullupRefresh
					}
				}
			});
			//window.getNoteList(me);
			setTimeout(function () {
				window.getNoteList(me);
				//mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 1);
		},
		getInitialState: function getInitialState() {
			return {
				notes: null //[]
			};
		},
		render: function render() {
			var me = this;
			if (this.state.notes == null) {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ id: 'pullrefresh', className: 'mui-content mui-scroll-wrapper' },
						React.createElement(
							'div',
							{ className: 'mui-scroll' },
							React.createElement(
								'ul',
								{ className: 'mui-table-view' },
								React.createElement(
									'li',
									{ ref: 'muiLi', className: 'mui-table-view-cell listCell' },
									'正在加载...'
								)
							)
						)
					)
				);
			};
			var notes = [];
			this.state.notes.forEach(function (note, index) {
				notes.push(React.createElement(NoteRow, { note: note, afterdel1: me.getList }));
			});
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ id: 'pullrefresh', className: 'mui-content mui-scroll-wrapper' },
					React.createElement(
						'div',
						{ className: 'mui-scroll' },
						React.createElement(
							'ul',
							{ className: 'mui-table-view' },
							notes
						)
					)
				)
			);
		}
	});
});