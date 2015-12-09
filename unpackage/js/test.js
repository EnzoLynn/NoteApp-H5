'use strict';

define(function (require, exports, module) {
	var IndexDBHelper = require('js/IndexDBHelper.js');
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(ListSubPage, null), mui('.subpageContainer')[0]);
	});

	var dbHelper,
	    storeName = 'table',
	    databaseName = 'test2';

	// 下拉刷新容器
	var ListSubPage = React.createClass({
		displayName: 'ListSubPage',

		componentDidMount: function componentDidMount() {
			var me = this;
			dbHelper = new IndexDBHelper();
			//dbHelper.distoryDatabase('test');
			dbHelper.openDatabase(databaseName, storeName, false, function (omes) {
				if (omes.success) {
					//dbHelper.add('table1', [{
					//content: '1111'
					//}], function(ames) {
					//if (ames.success) {
					dbHelper.find(storeName, {
						content: '1'
					}, true, function (mes) {
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
			dbHelper.add(storeName, [{
				content: '1222'
			}], function (ames) {
				if (ames.success) {
					dbHelper.find(storeName, false, false, function (mes) {
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
			dbHelper.deleteById(storeName, id, function (dmes) {
				if (dmes.success) {
					dbHelper.find(storeName, false, false, function (mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
				};
			});
		},
		update: function update(id) {
			var me = this;
			dbHelper.updateById(storeName, id, { content: '1update' }, function (dmes) {
				if (dmes.success) {
					dbHelper.find(storeName, false, false, function (mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
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
				notes.push(React.createElement(
					'li',
					{ onClick: function () {
							return me.update(note.id);
						} },
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