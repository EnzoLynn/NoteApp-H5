'use strict';

define(function (require, exports, moudle) {
	var getSpell = require('js/ChineseFirstSpell.js'); //makePy
	var KeyList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var IndexList = React.createClass({
		displayName: 'IndexList',

		getInitialState: function getInitialState() {
			return {
				indexes: KeyList
			};
		},
		render: function render() {
			var listDom = [];
			this.state.indexes.forEach(function (item, index) {
				listDom.push(React.createElement(
					'a',
					null,
					item
				));
			});
			return React.createElement(
				'div',
				{ className: 'mui-indexed-list-bar' },
				listDom
			);
		}
	});
	var ViewList = React.createClass({
		displayName: 'ViewList',

		translateNumber: function translateNumber(key) {
			var temp = '';
			switch (key) {
				case '1':
					temp = 'Y';
					break;
				case '2':
					temp = 'E';
					break;
				case '3':
					temp = 'S';
					break;
				case '4':
					temp = 'S';
					break;
				case '5':
					temp = 'W';
					break;
				case '6':
					temp = 'L';
					break;
				case '7':
					temp = 'Q';
					break;
				case '8':
					temp = 'B';
					break;
				case '9':
					temp = 'J';
					break;
				case '0':
					temp = 'L';
					break;
				default:
					temp = 'Z';
					break;
			}
			return temp;
		},
		componentDidMount: function componentDidMount() {
			var me = this;
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function (addressbook) {
				// 可通过addressbook进行通讯录操作 W
				addressbook.find(null, function (contacts) {
					contacts.forEach(function (contact) {
						var strArr = getSpell.makePy(contact.displayName);
						var val = strArr[0].toUpperCase();
						var key = val.substring(0, 1).toUpperCase();
						//判断是否数字
						//是则重新判断
						var regex = /^\d+$/;
						if (regex.test(key)) {
							key = me.translateNumber(key);
						};
						if (typeof me.state[key] == 'undefined') {
							me.state[key] = [];
						}

						me.state[key].push({
							value: val,
							tags: val,
							text: contact.displayName
						});

						console.log(JSON.stringify(contact));
					});
					me.forceUpdate();
				}, function () {
					console.log("error");
				}, {
					multiple: true
				});
			}, function (e) {
				console.log("Get address book failed: " + e.message);
			});
		},
		getInitialState: function getInitialState() {
			return {
				indexes: KeyList,
				A: [{
					value: 'AKU',
					tags: 'AKeSu',
					text: '阿克苏机场'
				}]
			};
		},
		render: function render() {
			var me = this;
			var liList = [];
			this.state.indexes.forEach(function (item, index) {
				liList.push(React.createElement(
					'li',
					{ 'data-group': item, className: 'mui-table-view-divider mui-indexed-list-group' },
					item
				));
				if (me.state[item]) {
					var temp = me.state[item];
					temp.forEach(function (li, idx) {
						liList.push(React.createElement(
							'li',
							{ 'data-value': li.value, 'data-tags': li.tags,
								className: 'mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left' },
							React.createElement('input', { type: 'checkbox' }),
							li.text
						));
					});
				} else {
					liList.push(React.createElement(
						'li',
						{ 'data-value': '', 'data-tags': '',
							className: 'mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left' },
						React.createElement('input', { type: 'checkbox' }),
						'无'
					));
				}
			});

			return React.createElement(
				'div',
				{ className: 'mui-indexed-list-inner' },
				React.createElement(
					'div',
					{ className: 'mui-indexed-list-empty-alert' },
					'没有数据'
				),
				React.createElement(
					'ul',
					{ className: 'mui-table-view' },
					liList
				)
			);
		}
	});
	var Contact = React.createClass({
		displayName: 'Contact',

		componentDidMount: function componentDidMount() {
			var header = document.querySelector('header.mui-bar');
			var list = document.getElementById('list');
			var done = document.getElementById('done');
			//calc hieght

			list.style.height = plus.screen.resolutionHeight - header.offsetHeight - 48 - 51 + 10 + 'px';
			//create
			window.indexedList = new mui.IndexedList(list);
			//done event
			done.addEventListener('tap', function () {
				var checkboxArray = [].slice.call(list.querySelectorAll('input[type="checkbox"]'));
				var checkedValues = [];
				checkboxArray.forEach(function (box) {
					if (box.checked) {
						checkedValues.push(box.parentNode.innerText);
					}
				});
				if (checkedValues.length > 0) {
					mui.alert('你选择了: ' + checkedValues);
				} else {
					mui.alert('你没选择任何项目');
				}
			}, false);
			mui('.mui-indexed-list-inner').on('change', 'input', function () {
				var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
				var value = count ? "完成(" + count + ")" : "完成";
				done.innerHTML = value;
				if (count) {
					if (done.classList.contains("mui-disabled")) {
						done.classList.remove("mui-disabled");
					}
				} else {
					if (!done.classList.contains("mui-disabled")) {
						done.classList.add("mui-disabled");
					}
				}
			});
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement('a', { className: 'mui-action-back mui-icon mui-icon-left-nav mui-pull-left' }),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'联系人'
					),
					React.createElement(
						'a',
						{ id: 'done', className: 'mui-btn mui-btn-link mui-pull-right mui-btn-blue mui-disabled' },
						'完成'
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-content' },
					React.createElement(
						'div',
						{ id: 'list', className: 'mui-indexed-list' },
						React.createElement(
							'div',
							{ className: 'mui-indexed-list-search mui-input-row mui-search' },
							React.createElement('input', { type: 'search', className: 'mui-input-clear mui-indexed-list-search-input', placeholder: '搜索联系人' })
						),
						React.createElement(IndexList, null),
						React.createElement('div', { className: 'mui-indexed-list-alert' }),
						React.createElement(
							'div',
							{ className: 'mui-indexed-list-inner' },
							React.createElement(
								'div',
								{ className: 'mui-indexed-list-empty-alert' },
								'没有数据'
							),
							React.createElement(
								'ul',
								{ className: 'mui-table-view' },
								React.createElement(ViewList, null)
							)
						)
					)
				)
			);
		}
	});

	mui.plusReady(function () {

		ReactDOM.render(React.createElement(Contact, null), mui('.container')[0]);
	});
});