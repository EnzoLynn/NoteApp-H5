define(function(require, exports, moudle) {
	var getSpell = require('js/ChineseFirstSpell.js'); //makePy
	const KeyList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var IndexList = React.createClass({
		getInitialState: function() {
			return {
				indexes: KeyList
			};
		},
		render: function() {
			var listDom = [];
			this.state.indexes.forEach(function(item, index) {
				listDom.push(<a>{item}</a>);
			});
			return (
				<div className="mui-indexed-list-bar">{listDom}</div>
			);
		}
	});
	var ViewList = React.createClass({
		translateNumber: function(key) {
			switch (key) {
				case '1':
					return 'Y';
					break;
				case '2':
					return 'E';
					break;
				case '3':
					return 'S';
					break;
				case '4':
					return 'S';
					break;
				case '5':
					return 'W';
					break;
				case '6':
					return 'L';
					break;
				case '7':
					return 'Q';
					break;
				case '8':
					return 'B';
					break;
				case '9':
					return 'J';
					break;
				case '0':
					return 'L';
					break;
				default:
					return 'Z';
					break;
			}

		},
		componentDidMount: function() {
			var me = this;
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
				// 可通过addressbook进行通讯录操作 W
				addressbook.find(null, function(contacts) {
					contacts.forEach(function(contact) {
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

				}, function() {
					console.log("error");
				}, {
					multiple: true
				});


			}, function(e) {
				console.log("Get address book failed: " + e.message);
			});



		},
		getInitialState: function() {
			return {
				indexes: KeyList,
				A: [{
					value: 'AKU',
					tags: 'AKeSu',
					text: '阿克苏机场'
				}]
			};
		},
		render: function() {
			var me = this;
			let liList = [];
			this.state.indexes.forEach(function(item, index) {
				liList.push(<li data-group={item} className="mui-table-view-divider mui-indexed-list-group">{item}</li>);
				if (me.state[item]) {
					var temp = me.state[item];
					temp.forEach(function(li, idx) {
						liList.push(<li data-value={li.value} data-tags={li.tags}
							className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
							<input type="checkbox" />{li.text}</li>);
					});

				} else {
					liList.push(<li data-value='' data-tags=''
							className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
							<input type="checkbox" />无</li>);
				}
			});

			return (
				<div className="mui-indexed-list-inner">
					<div className="mui-indexed-list-empty-alert">没有数据</div>
					<ul  className="mui-table-view">
						{liList}
					</ul>
				</div>
			);
		}
	});
	var Contact = React.createClass({
		componentDidMount: function() {
			var header = document.querySelector('header.mui-bar');
			var list = document.getElementById('list');
			var done = document.getElementById('done');
			//calc hieght

			list.style.height = (plus.screen.resolutionHeight - header.offsetHeight - 48 - 51 + 10) + 'px';
			//create
			window.indexedList = new mui.IndexedList(list);
			//done event
			done.addEventListener('tap', function() {
				var checkboxArray = [].slice.call(list.querySelectorAll('input[type="checkbox"]'));
				var checkedValues = [];
				checkboxArray.forEach(function(box) {
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
			mui('.mui-indexed-list-inner').on('change', 'input', function() {
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
		render: function() {
			return (
				<div>
					<header className="mui-bar mui-bar-nav">
						<a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
						<h1 className="mui-title">联系人</h1>
						<a id='done' className="mui-btn mui-btn-link mui-pull-right mui-btn-blue mui-disabled">完成</a>
					</header>
					<div className="mui-content">
						<div id='list' className="mui-indexed-list">
							<div className="mui-indexed-list-search mui-input-row mui-search">
								<input type="search" className="mui-input-clear mui-indexed-list-search-input" placeholder="搜索联系人"/>
							</div>
							<IndexList />
							<div className="mui-indexed-list-alert"></div>
							<div className="mui-indexed-list-inner">
								<div className="mui-indexed-list-empty-alert">没有数据</div>
								<ul className="mui-table-view">
									<ViewList />
								</ul>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});

	mui.plusReady(function() {

		ReactDOM.render(
			<Contact />,
			mui('.container')[0]
		);

	});
});