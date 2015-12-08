define(function(require, exports, module) {

	var AddNoteForm = React.createClass({
		addNote: function() {
			var me = this;
			var val = me.refs.textarea.value;
			val = escape(val);
			if (window.noteid != '') { //编辑
				plus.storage.setItem(window.noteid + '', val);

			} else { //新增 
			 	
				var date = new Date();
				plus.storage.setItem(date.getTime() + '', val);
				me.refs.textarea.value = '';
			}
			window.noteid = '';
			window.noteval = '';
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
						<textarea id='textarea' ref="textarea"   style={{height:'600px'}} placeholder="多行文本框"></textarea>
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