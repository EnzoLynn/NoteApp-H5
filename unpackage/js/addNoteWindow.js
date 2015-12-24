'use strict';

define(function (require, exports, module) {
	var escaper = require('js/escaper.js');
	var IndexDBHelper = require('js/IndexDBHelper.js');
	var dbHelper,
	    storeName = 'Notes',
	    databaseName = 'NoteApp';

	dbHelper = new IndexDBHelper();
	dbHelper.openDatabase(databaseName, storeName, false, function (omes) {
		if (omes.success) {} else {
			alert(omes.msg);
		}
	});

	var AddNoteForm = React.createClass({
		displayName: 'AddNoteForm',

		getWeek: function getWeek() {
			var date = new Date();
			var day = date.getDay();
			if (day == 0) return "日";
			if (day == 1) return "一";
			if (day == 2) return "二";
			if (day == 3) return "三";
			if (day == 4) return "四";
			if (day == 5) return "五";
			if (day == 6) return "六";
			return 'no week';
		},
		preZeroFill: function preZeroFill(num, size) {
			if (num >= Math.pow(10, size)) {
				//如果num本身位数不小于size位
				return num.toString();
			} else {
				var _str = Array(size + 1).join('0') + num;
				return _str.slice(_str.length - size);
			}
		},
		getDateTime: function getDateTime(time) {
			var me = this;
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();
			//"" + year + "年" +
			var str = month + "月" + day + "日 " + me.preZeroFill(hours, 2) + ":" + me.preZeroFill(minutes, 2) + ":" + me.preZeroFill(seconds, 2) + "";
			var week = me.getWeek();
			return year + '/' + month + '/' + day + ' ' + me.preZeroFill(hours, 2) + ":" + me.preZeroFill(minutes, 2) + ":" + me.preZeroFill(seconds, 2);
			// let arr = [];
			// arr.push(me.preZeroFill(hours, 2));
			// arr.push(me.preZeroFill(minutes, 2));
			// arr.push(week);
			// return arr;
		},
		addNote: function addNote(callback) {
			var me = this;
			var val = me.refs.textarea.value;

			//val = escape(val);
			val = escaper.encodeSpc(val);
			var date = me.getDateTime();
			if (window.noteid != '') {
				//编辑
				var id = parseInt(window.noteid);
				//plus.storage.setItem(window.noteid + '', val);
				dbHelper.updateById(storeName, id, {
					content: val,
					createon: date
				}, function (dmes) {
					if (dmes.success) {
						window.noteid = '';
						window.noteval = '';
						var ws = plus.webview.getWebviewById("listSubPage");
						if (ws) {
							ws.evalJS("refreshList()");
						};
						if (callback) {
							callback();
						};
					} else {
						alert(dmes.msg);
					}
				});
			} else {
				//新增 
				//var date = new Date();
				//plus.storage.setItem(date.getTime() + '', val);

				dbHelper.add(storeName, [{
					content: val,
					createon: date
				}], function (ames) {
					if (ames.success) {
						me.refs.textarea.value = '';
						window.noteid = '';
						window.noteval = '';
						var ws = plus.webview.getWebviewById("listSubPage");

						if (ws) {
							ws.evalJS("refreshList()");
						};
						if (callback) {
							callback();
						};
					} else {
						alert(ames.msg);
					}
				});
			}
		},
		completeNote: function completeNote() {
			var me = this;
			var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
			mask.show(); //显示遮罩
			me.addNote(function () {

				mui.back();
				mask.close(); //关闭遮罩
			});
		},
		componentDidMount: function componentDidMount() {
			var me = this;
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
	window.PushValue = function (id, val) {
		var esval = unescape(val);
		esval = escaper.decodeSpc(esval);
		window.noteid = id;
		window.noteval = esval;
		mui('#textarea')[0].value = esval;
	};
	window.ClearValue = function () {
		window.noteid = '';
		window.noteval = '';
		mui('#textarea')[0].value = '';
	};
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(AddNoteForm, null), mui('.container')[0]);
	});
});