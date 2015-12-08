define(function(require, exports, module) {
	var IndexDBHelper = require('js/IndexDBHelper.js');
	mui.plusReady(function() {
		ReactDOM.render(
			<ListSubPage />,
			mui('.subpageContainer')[0]
		);
	});

	var dbHelper;

	var Row = React.createClass({
		del:function(id){
			this.props.del(id);
		},
		render: function() {
			return (
				<li onClick={()=>this.del(this.props.note.id)}>{this.props.note.id}{this.props.note.content}</li>
			);
		}
	});
	// 下拉刷新容器
	var ListSubPage = React.createClass({
		componentDidMount: function() {
			var me = this;
			dbHelper = new IndexDBHelper();
			//dbHelper.distoryDatabase('test');
			dbHelper.openDatabase('test', 'table1', false, function(omes) {
				if (omes.success) {
					//dbHelper.add('table1', [{
					//content: '1111'
					//}], function(ames) {
					//if (ames.success) {
					dbHelper.find('table1', false, false, function(mes) {
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
			dbHelper.add('table1', [{
				content: '1111'
			}], function(ames) {
				if (ames.success) {
					dbHelper.find('table1', false, false, function(mes) {
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
			dbHelper.deleteById('table1', id, function(dmes) {
				if (dmes.success) {
					dbHelper.find('table1', false, false, function(mes) {
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
				notes.push(<li onClick={()=>me.delt(note.id)}>{note.id}{note.content}</li>);
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