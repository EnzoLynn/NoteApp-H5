define(function(require, exports, module) {
	

	let HeadToolBar = React.createClass({
		openAddWindow: function() {
			var me = this;
			me.setState({
				backHome: 'block',
				openAddWindow: 'block',
				completeNote: 'block'
			});
			var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
			mask.show(); //显示遮罩
			 
				 
			//及页面大小； 页面切换使用原生动画， 将最耗性能的部分交给原生实现. 
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

			//plus.webview.getWebviewById('addNoteWindow'); 
			if (ws) {
				ws.evalJS("ClearValue()");
			};
			// plus.webview.getWebviewById('addNoteWindow'); 
			mask.close(); //关闭遮罩

		},
		openShareWindow:function(){
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

		},
		render: function() {
			var me = this;
			return (
				<div>
				   <header className="mui-bar mui-bar-nav">		
				   		<a className="mui-icon-pengyouquan mui-icon  mui-pull-left sharethis" onClick={me.openShareWindow}>分享</a>  
						<a className="mui-icon mui-icon-plusempty mui-pull-right"  onClick={me.openAddWindow}></a>						
						<h1 className="mui-title">NoteApp </h1>
					</header>  
				</div>
			);
		}
	});

	module.exports = HeadToolBar;
});