define(function(require, exports, module) {
	var IndexDBHelper = require('js/IndexDBHelper.js');
	mui.plusReady(function() {
		ReactDOM.render(
			<ListSubPage />,
			mui('.subpageContainer')[0]
		);
	});

	var dbHelper,storeName='table',databaseName='test2';
 
	// 下拉刷新容器
	var ListSubPage = React.createClass({
		componentDidMount: function() {
			var me = this;
			dbHelper = new IndexDBHelper();
			//dbHelper.distoryDatabase('test');
			dbHelper.openDatabase(databaseName, storeName, false, function(omes) {
				if (omes.success) {
					//dbHelper.add('table1', [{
					//content: '1111'
					//}], function(ames) {
					//if (ames.success) {
					dbHelper.find(storeName, {
						content:'1'
					}, true, function(mes) {
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
		add: function() {
			var me = this;
			dbHelper.add(storeName, [{
				content: '1222'
			}], function(ames) {
				if (ames.success) {
					dbHelper.find(storeName, false, false, function(mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
				};
			});
		},
		delt: function(id) {
			var me = this;
			dbHelper.deleteById(storeName, id, function(dmes) {
				if (dmes.success) {
					dbHelper.find(storeName, false, false, function(mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
				};
			});
		},
		update:function(id){
			var me = this;
			dbHelper.updateById(storeName, id,{content:'1update'}, function(dmes) {
				if (dmes.success) {
					dbHelper.find(storeName, false, false, function(mes) {
						if (mes.success) {
							me.setState({
								list: mes.result
							});
						};
					});
				};
			});
		},
		getInitialState: function() {
			return {
				list: []
			};
		},
		render: function() {
			var me = this;

			var notes = [];
			this.state.list.forEach(function(note, index) { 
				notes.push(<li onClick={()=>me.update(note.id)}>{note.content}</li>);
			});
			return (
				<div>
					<div id="pullrefresh" className="mui-content mui-scroll-wrapper">
						<div className="mui-scroll"> 
							<ul className="mui-table-view"> 
								<li onClick={this.add}>++++++</li>
								{notes}
							</ul>
						</div>
					</div>
				</div>
			);
		}
	});

});