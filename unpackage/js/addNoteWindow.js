'use strict';

define(function (require, exports, module) {

	var AddNoteForm = React.createClass({
		displayName: 'AddNoteForm',

		addNote: function addNote() {
			var me = this;
			var val = me.refs.textarea.value;

			var date = new Date();
			if (window.noteid != '') {
				//编辑
				plus.storage.setItem(window.noteid + '', val);
			} else {
				//新增
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
		completeNote: function completeNote() {
			var me = this;
			mui.back();
			me.addNote();
		},

		render: function render() {
			var me = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement(
						'a',
						{ className: 'mui-action-back mui-icon  mui-pull-left backHome' },
						'返回'
					),
					React.createElement(
						'span',
						{ className: 'mui-pull-right completeNote', onClick: me.completeNote },
						'完成'
					),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'NoteApp '
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-content' },
					React.createElement('textarea', { id: 'textarea', ref: 'textarea', style: { height: '600px' }, placeholder: '多行文本框' })
				)
			);
		}
	});

	mui.plusReady(function () {
		ReactDOM.render(React.createElement(AddNoteForm, null), mui('.container')[0]);
	});
});