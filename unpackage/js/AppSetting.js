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

	var ListContainer = require('js/ListContainer.js');

	mui.plusReady(function () {
		ReactDOM.render(React.createElement(SettingContainer, null), mui('.container')[0]);
	});
	(function () {
		Date.prototype.Format = function (fmt) {
			//author: meizz
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			return fmt;
		};
	})();
	var SettingContainer = React.createClass({
		displayName: 'SettingContainer',

		getInitialState: function getInitialState() {
			var hasLocker = plus.storage.getItem('Locker');

			var switchState = false;
			if (hasLocker && hasLocker == 'enable') {
				switchState = true;
			};
			return {
				items: [{
					isNode: true,
					disName: '产品',
					items: [{
						disName: 'IOS1',
						link: 'tab-webview-subpage-setting.html'
					}, {
						disName: 'IOS',
						link: 'http://192.168.91.101:811/'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: false,
					disName: '备份到文件',

					handler: function handler() {

						var now = new Date();

						dbHelper.find(storeName, {}, true, function (mes) {
							if (mes.success) {
								var notes = mes.result;
								notes.sort(function (a, b) {
									var kA = a.id;
									var kB = b.id;
									return kA < kB ? 1 : -1;
								}); //
								if (notes.length <= 0) {
									alert('没有可备份的记录');
									return;
								};
								var ui = plus.nativeUI.showWaiting('正在备份' + notes.length + '条记录...', {
									back: 'none'
								});
								plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function (fs) {
									// 可通过fs进行文件操作
									// 可通过fs进行文件操作

									// 通过fs.root获取DirectoryEntry对象进行操作
									var fileName = now.Format("yyyy-MM-dd hh-mm-ss") + '.txt';
									var filePath = fs.root.fullPath + fileName;
									fs.root.getFile(fileName, {
										create: true
									}, function (fileEntry) {
										fileEntry.file(function (file) {
											fileEntry.createWriter(function (writer) {
												// Write data to file.
												try {
													var temp = "";
													notes.forEach(function (note, index) {
														temp += note.id + '^^^' + note.createon + '^^^' + escaper.decodeSpc(note.content) + '\r\n';
													});
													writer.write(temp.substring(0, temp.length - 3));
												} catch (e) {
													alert('备份失败');
												}

												ui.close();
												alert('备份成功:' + filePath);
											}, function (e) {
												alert(e.message);
											});
										});
									});
								}, function (e) {
									alert("Request file system failed: " + e.message);
								});
							} else {
								alert(mes.msg);
							}
							//console.log(JSON.stringify(mes));
						});
					}

				}, {
					isNode: false,
					disName: '启用手势',
					link: '#',
					items: [],
					'switch': true,
					switchState: switchState,
					handler: function handler() {

						var state = mui('.toggleLocker')[0].classList.contains('mui-active') ? 'enable' : 'disable';
						plus.storage.setItem('Locker', state);
						if (state == 'enable') {
							var pass = plus.storage.getItem('LockerPass');
							if (pass == null) {
								var curView = plus.webview.currentWebview();
								curView.loadURL('appsetting-locker.html?reset=true');
							};
						};
					}
				}, {
					isNode: false,
					disName: '设置手势',
					link: 'appsetting-locker.html?reset=true',
					hidden: true //.mui-hidden
				}]
			};
		},

		render: function render() {

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement('a', { className: 'mui-icon mui-icon-left-nav mui-pull-left' }),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'设置'
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-content' },
					React.createElement(ListContainer, { items: this.state.items })
				)
			);
		}
	});
});