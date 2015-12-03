define(function(require, exports, module) {
	var $ = require('jquery');
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
			setTimeout(function() {
				mui.swipeoutClose(li);
			}, 0);
			plus.storage.removeItem(key);
			me.props.afterdel1();
		},
		editNote: function(e, key) {
			e.stopPropagation();
			var me = this;
			var val = plus.storage.getItem(key);
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
				ws.evalJS("PushValue('" + key + "','" + val + "')");
			};
		},
		render: function() {
			var me = this;
			var note = this.props.note;
			if (note.val == null) {
				note.val = '';
			};
			var val = note.val.length > 25 ? note.val.substring(0, 25) + '...' : note.val;
			return (

				<li ref="muiLi" className='mui-table-view-cell listCell'>	
				 	
					<div className="mui-slider-right mui-disabled "> 	
						<a  className="mui-btn mui-btn-red"  onClick={(e)=>this.delNote(e,note.key)}>删除</a>
					</div> 
					
					<div className="mui-slider-handle" onClick={(e)=>this.editNote(e,note.key)}> 
						<a className="mui-navigate-right" >
							 {val} 	 
						</a>
					</div>
					
				</li>
			);
		}
	});
	window.getNoteList = function(scope) {
		var me = scope;
		var keyNames = [];
		var values = [];
		var numKeys = plus.storage.getLength();
		var notes = [];
		for (var i = 0; i < numKeys; i++) {
			var key = keyNames[i] = plus.storage.key(i);
			var val = values[i] = plus.storage.getItem(keyNames[i]);
			if (val == '') {
				val = 'ww';
			}
			notes.push({
				key: key,
				val: val
			});
		}
		notes.sort(function(a, b) {
			var kA = a.key;
			var kB = b.key;
			return kA < kB ? 1 : -1
		}); //
		me.setState({
			notes: notes
		});
	};
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

			var numKeys = plus.storage.getLength();

			var table = document.body.querySelector('.mui-table-view');
			var cells = document.body.querySelectorAll('.mui-table-view-cell');

			mui('#pullrefresh').pullRefresh().endPullupToRefresh(cells.length >= numKeys); //参数为true代表没有更多数据了。
			me.getList();


		},
		getList: function() {
			var me = this;
			window.getNoteList(me);
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

			window.getNoteList(me);
			// setTimeout(function() {
			// 	mui('#pullrefresh').pullRefresh().pullupLoading();
			// }, 1000);

		},
		getInitialState: function() {
			return {
				notes: []
			};
		},
		render: function() {
			var me = this;
			var notes = [];
			this.state.notes.forEach(function(note, index) {
				notes.push(<NoteRow note={note}  afterdel1={me.getList}/>);
			});
			return (
				<div>
					<div id="pullrefresh" className="mui-content mui-scroll-wrapper">
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