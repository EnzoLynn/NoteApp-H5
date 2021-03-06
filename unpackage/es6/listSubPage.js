define(function(require, exports, module) {
	var escaper = require('js/escaper.js');
	var limitDate = new Date(),
		limitStep = 3; 
	limitDate = new Date(limitDate.setMonth(limitDate.getMonth() - limitStep));
	//limitDate = new Date(limitDate.setDate(limitDate.getDate() - limitStep)); 
	limitDate.setHours(0, 0, 0, 0); 
	var IndexDBHelper = require('js/IndexDBHelper.js');
	var dbHelper, storeName = 'Notes',
		databaseName = 'NoteApp';
	dbHelper = new IndexDBHelper();
	dbHelper.openDatabase(databaseName, storeName, false, function(omes) {
		if (omes.success) {

		} else {
			alert(omes.msg);
		}
	});
	window.refreshList = function() {
		getNoteList(window.scope);
	}

	mui.plusReady(function() {
		ReactDOM.render(
			<ListSubPage />,
			mui('.subpageContainer')[0]
		);

	});


	let NoteRow = React.createClass({
		delNote: function(e, key) {
			e.stopPropagation();
			var me = this;
			var li = me.refs.muiLi;

			dbHelper.deleteById(storeName, key, function(dmes) {
				if (dmes.success) {
					mui.swipeoutClose(li);
					me.props.afterdel1();
				} else {
					alert(dmes.msg);
				}
			});
			//plus.storage.removeItem(key);

		},
		editNote: function(e, key) {
			e.stopPropagation();
			var me = this;
			//var val = plus.storage.getItem(key);
			dbHelper.getById(storeName, key, function(mes) {
				if (mes.success) {
					var val = mes.result.content;
					if (val == null) {
						val = '';
					};
					var ws = mui.openWindow({
						url: "addNoteWindow.html",
						id: "addNoteWindow",
						styles: {
							top: 0, //新页面顶部位置
							bottom: 0, //新页面底部位置
							width: '100%', //新页面宽度，默认为100%
							height: '100%', //新页面高度，默认为100% 
							hardwareAccelerated: true //硬件加速
						},
						extras: {
							// myid:key,
							// myval:val
							//自定义扩展参数，可以用来处理页面间传值
						},
						createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
						show: {
							autoShow: true, //页面loaded事件发生后自动显示，默认为true
							aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
							duration: 100 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						},
						waiting: {
							autoShow: true, //自动显示等待框，默认为true
							title: '正在加载...', //等待对话框上显示的提示内容
							options: {
								//width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
								//height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度 
							}
						}
					});
					//plus.webview.getWebviewById('addNoteWindow'); 
					if (ws) {
						//跨页面调用方法：
						//1.evalJS 获取跨页面窗口调用function
						//2.mui.fire //获得主页面的webview
						//var main = plus.webview.currentWebview().parent();
						//触发主页面的gohome事件
						//mui.fire(main,'gohome');
						ws.evalJS("PushValue('" + key + "','" + val + "')");
					};
				} else {
					alert(mes.msg);
				}
			});

		},
		openShareWindow: function(key) {
			var me = this;
			//及页面大小； 页面切换使用原生动画， 将最耗性能的部分交给原生实现. 
			var ws = mui.openWindow({
				url: "Share.html",
				id: "Share",
				styles: {
					top: 0, //新页面顶部位置
					bottom: 0, //新页面底部位置
					width: '100%', //新页面宽度，默认为100%
					height: '100%', //新页面高度，默认为100% 
					hardwareAccelerated: true //硬件加速
				},
				extras: {
					//自定义扩展参数，可以用来处理页面间传值
				},
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				show: {
					autoShow: true, //页面loaded事件发生后自动显示，默认为true
					aniShow: "slide-in-right", //页面显示动画，默认为”slide-in-right“；
					duration: 1 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
					options: {
						//width: waiting - dialog - widht, //等待框背景区域宽度，默认根据内容自动计算合适宽度
						//height: waiting - dialog - height, //等待框背景区域高度，默认根据内容自动计算合适高度 
					}
				}
			});
			if (ws) {
				dbHelper.getById(storeName, key, function(mes) {
					if (mes.success) {
						var val = mes.result.content;
						if (val == null) {
							val = '';
						};
						ws.evalJS(`ShareText('${val}')`);
					} else {
						alert(mes.msg);
					}
				});
				// var val = plus.storage.getItem(key);
				// if (val == null) {
				// 	val = '';
				// };
				// ws.evalJS(`ShareText('${val}')`);

			};
		},
		render: function() {
			var me = this;
			var note = this.props.note;
			if (note.content == null) {
				note.content = '';
			};

			var deNote = unescape(note.content);
			deNote = escaper.decodeSpc(deNote);
			var val = deNote.length > 15 ? deNote.substring(0, 15) + '...' : deNote;

			return (

				<li ref="muiLi" className='mui-table-view-cell listCell'>	
				 	
					<div className="mui-slider-right mui-disabled "> 												
						<a  className="mui-btn mui-btn-blue"  onClick={()=>this.openShareWindow(note.id)}>分享</a>
						<a  className="mui-btn mui-btn-red"  onClick={(e)=>this.delNote(e,note.id)}>删除</a>	
					</div> 
					
					<div className="mui-slider-handle" onClick={(e)=>this.editNote(e,note.id)}> 
						<a className="mui-navigate-right" >
							{val} 
							<p className='mui-ellipsis'>{note.createon}</p> 
						</a>
					</div>
					
				</li>
			);
		}
	});

	window.getNoteList = function(scope, sval, callback) {

		var me = scope;
		var searchVal = sval ? sval : (me.refs.searchInput ? me.refs.searchInput.value : '');
		//var keyNames = [];
		//var values = [];
		// var numKeys = plus.storage.getLength();
		//var notes = [];
		// for (var i = 0; i < numKeys; i++) {
		// 	var key = keyNames[i] = plus.storage.key(i);
		// 	var val = values[i] = plus.storage.getItem(keyNames[i]);
		// 	if (val == '') {
		// 		val = '';
		// 	}
		// 	notes.push({
		// 		key: key,
		// 		val: val
		// 	});
		// }
		// notes.sort(function(a, b) {
		// 	var kA = a.key;
		// 	var kB = b.key;
		// 	return kA < kB ? 1 : -1
		// }); // 
		// 
		if (searchVal && searchVal != '') { 
			dbHelper.find(storeName, {
				content: escaper.encodeSpc(searchVal), //escape(searchVal)
				// createon: {
				// 	type: 'date',
				// 	value: limitDate
				// }
			}, true, function(mes) {
				if (mes.success) {
					var notes = mes.result;
					notes.sort(function(a, b) {
						var kA = a.id;
						var kB = b.id;
						return kA < kB ? 1 : -1
					}); // 
					me.setState({
						notes: notes
					});
				} else {
					alert(mes.msg);
				}
				if (callback) {
					callback(mes);
				};
			});
		} else { 
			dbHelper.find(storeName, {
				createon: {
					type: 'date',
					value: limitDate
				}
			}, false, function(mes) {
				if (mes.success) {
					var notes = mes.result;
					notes.sort(function(a, b) {
						var kA = a.id;
						var kB = b.id;
						return kA < kB ? 1 : -1
					}); // 
					me.setState({
						notes: notes
					});
				} else {
					alert(mes.msg);
				}
				if (callback) {
					callback(mes);
				};
			});
		}


	};

	let loading = false;
	// 下拉刷新容器
	var ListSubPage = React.createClass({
		/**
		 * 下拉刷新具体业务实现
		 */
		pulldownRefresh: function() {
			var me = this;
			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			me.getList();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed 
			mui('#pullrefresh').pullRefresh().refresh(true);
		},
		/**
		 * 上拉加载具体业务实现
		 */
		pullupRefresh: function() {
			var me = this;


			if (!loading) {
				loading = true;				 
				limitDate = new Date(limitDate.setDate(limitDate.getDate() - limitStep)); 

				window.getNoteList(me, me.refs.searchInput.value, function(mes) {
					if (mes.success) {
						var numKeys = mes.result.length; 
						var table = document.body.querySelector('.mui-table-view');
						var cells = document.body.querySelectorAll('.mui-table-view-cell');

						mui('#pullrefresh').pullRefresh().endPullupToRefresh(cells.length >= mes.total); //参数为true代表没有更多数据了。

					}
					loading = false;
				});


			} else {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			}


		},
		getList: function() {
			var me = this;
			window.getNoteList(me, me.refs.searchInput.value);
		},
		searchList: function(e) {
			var me = this;
			if (e.keyCode == 13) {
				window.getNoteList(me, me.refs.searchInput.value);
				me.refs.searchInput.blur();
			};
		},
		componentDidMount: function() {
			var me = this;
			window.scope = me;
			mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
						contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
						contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容 
						callback: me.pulldownRefresh
					},
					up: {
						contentdown: "上拉可以加载",
						contentover: "释放立即加载",
						contentrefresh: '正在加载...',
						callback: me.pullupRefresh
					}
				}
			});

			setTimeout(function() {
				window.getNoteList(me);
				//mui('#pullrefresh').pullRefresh().pullupLoading();
			}, 1);
			//window.getNoteList(me); 


		},
		getInitialState: function() {
			return {
				notes: null //[]
			};
		},
		render: function() {
			var me = this;
			if (this.state.notes == null) {

				return (
					<div>						 
						<div id="pullrefresh" className="mui-content mui-scroll-wrapper">	 
							<div className="mui-scroll"> 
								<ul className="mui-table-view"> 
									<li ref="muiLi" className='mui-table-view-cell listCell'>	
				 	 						正在加载...
									</li>
								</ul>
							</div>
						</div>
					</div>
				);
			};
			var notes = [];
			this.state.notes.forEach(function(note, index) {
				notes.push(<NoteRow note={note}  afterdel1={me.getList}/>);
			});
			setTimeout(function() {
				mui('.mui-input-row input').input();

			}, 1);
			return (
				<div>					
					<div id="pullrefresh" className="mui-content mui-scroll-wrapper">	
						 <div className="mui-input-row mui-search">
					        <input type="search" ref='searchInput' className="mui-input-clear searchNotes" onKeyDown={(e)=>this.searchList(e)}  placeholder="输入搜索内容" />
					    </div>										
						<div className="mui-scroll"> 						
							<ul className="mui-table-view">  
								{notes}
							</ul>
						</div>
					</div>
				</div>
			);
		}
	});

});