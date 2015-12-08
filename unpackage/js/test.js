'use strict';

define(function (require, exports, module) {
	var IndexDBHelper = require('js/IndexDBHelper.js');
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(ListSubPage, null), mui('.subpageContainer')[0]);
	});

	var dbHelper;

	var Row = React.createClass({
		displayName: 'Row',

		del: function del(id) {
			this.props.del(id);
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				'li',
				{ onClick: function () {
						return _this.del(_this.props.note.id);
					} },
				this.props.note.id,
				this.props.note.content
			);
		}
	});
	// 下拉刷新容器
	var ListSubPage = React.createClass({
		displayName: 'ListSubPage',

		componentDidMount: function componentDidMount() {
			var me = this;
			dbHelper = new IndexDBHelper();
			//dbHelper.distoryDatabase('test');
			dbHelper.openDatabase('test', 'table1', false, function (omes) {
				if (omes.success) {
					//dbHelper.add('table1', [{
					//content: '1111'
					//}], function(ames) {
					//if (ames.success) {
					dbHelper.find('table1', false, false, function (mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
					//};

					//});
				};
			});
		},
		add: function add() {
			var me = this;
			dbHelper.add('table1', [{
				content: '1111'
			}], function (ames) {
				if (ames.success) {
					dbHelper.find('table1', false, false, function (mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
				};
			});
		},
		delt: function delt(id) {
			var me = this;
			dbHelper.deleteById('table1', id, function (mes) {
				if (mes.success) {
					me.setState({
						list: mes.result
					});
				};
			});
		},
		getInitialState: function getInitialState() {
			return {
				list: []
			};
		},
		render: function render() {
			var me = this;

			var notes = [];
			this.state.list.forEach(function (note, index) {
				var _this2 = this;

				notes.push(React.createElement(
					'li',
					{ onClick: function () {
							return _this2.delt(note.id);
						} },
					note.id,
					note.content
				));
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
							React.createElement(
								'li',
								{ onClick: this.add },
								'++++++'
							),
							notes
						)
					)
				)
			);
		}
	});
});