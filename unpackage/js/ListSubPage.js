'use strict';

define(function (require, exports, moudel) {
	var Guid = require('js/guid.js');

	mui.plusReady(function () {
		ReactDOM.render(React.createElement(ListSubPage, null), mui('.subpageContainer')[0]);
	});
	var NoteRow = React.createClass({
		displayName: 'NoteRow',

		alertMsg: function alertMsg(msg) {
			alert(msg);
		},
		render: function render() {
			var me = this;
			var note = this.props.note;
			note = note.length > 20 ? note.substring(0, 20) + '...' : note;
			return React.createElement(
				'li',
				{ className: 'mui-table-view-cell' },
				React.createElement(
					'div',
					{ className: 'mui-slider-right mui-disabled' },
					React.createElement(
						'a',
						{ className: 'mui-btn mui-btn-red', onClick: function () {
								me.alertMsg(11);
							} },
						'删除'
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-slider-handle' },
					React.createElement(
						'a',
						{ className: 'mui-navigate-right', onClick: function () {
								me.alertMsg(22);
							} },
						note
					)
				)
			);
		}
	});
	// 下拉刷新容器
	var ListSubPage = React.createClass({
		displayName: 'ListSubPage',

		/**
   * 下拉刷新具体业务实现
   */
		pulldownRefresh: function pulldownRefresh() {
			var met = this;
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			plus.storage.setItem(Guid.raw(), Guid.raw());
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			mui('#pullrefresh').pullRefresh().refresh(true);
		},
		/**
   * 上拉加载具体业务实现
   */
		pullupRefresh: function pullupRefresh() {
			var me = this;
			var keyNames = [];
			var values = [];
			var numKeys = plus.storage.getLength();
			for (var i = 0; i < numKeys; i++) {
				keyNames[i] = plus.storage.key(i);
				values[i] = plus.storage.getItem(keyNames[i]);
			}
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			mui('#pullrefresh').pullRefresh().endPullupToRefresh(cells.length >= numKeys); //参数为true代表没有更多数据了。

			this.setState({
				notes: values
			});
		},
		componentDidMount: function componentDidMount() {
			var me = this;
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

			setTimeout(function () {
				mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 1000);
		},
		getInitialState: function getInitialState() {
			return {
				notes: []
			};
		},
		render: function render() {
			var notes = [];
			this.state.notes.forEach(function (note, index) {
				notes.push(React.createElement(NoteRow, { note: note }));
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
							{ className: 'mui-table-view mui-table-view-chevron' },
							notes
						)
					)
				)
			);
		}
	});
});