define(function(require, exports, module) {

	var HeadToolBar = require('js/HeadToolBar.js');
	var AddNoteForm = React.createClass({
		addNote: function() {
			var me = this;
			var val = me.refs.textarea.value;
			var date = new Date();
			if (this.state.myid!= '') {//编辑
				plus.storage.setItem(this.state.myid + '', val);

			}else{//新增
				plus.storage.setItem(date.getTime() + '', val);
			}
			
			var ws = plus.webview.getWebviewById("listSubPage");
			if (ws) {
				ws.evalJS("refreshList()");
			};



		},
		completeNote: function() {
			var me = this;
			mui.back();
			me.addNote();
		},
		 
		componentDidMount:function(){
			var me = this;
			var ws = plus.webview.getWebviewById('editNoteWindow'); 
			if (ws) {
				me.refs.textarea.value = ws.myval; 
				this.setState({
					myid:ws.myid
				});
			}
		},
		getInitialState:function(){
			return {
				myid:'' 
			};
		},
		render: function() {
			var me = this;
		 
			return (
				<div>  
					 <header className="mui-bar mui-bar-nav">
						<a className="mui-action-back mui-icon  mui-pull-left backHome">返回</a> 
						<span className="mui-pull-right completeNote" onClick={me.completeNote}>完成</span>						 
						<h1 className="mui-title">NoteApp </h1>
					</header>  
					<div className="mui-content">
						<textarea ref="textarea"   style={{height:'600px'}} placeholder="多行文本框"></textarea>
					</div> 
				</div>
			);
		}
	});

	mui.plusReady(function() {
		ReactDOM.render(
			<AddNoteForm />,
			mui('.container')[0]
		);
	});
});