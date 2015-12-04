define(function(require, exports, module) {
	var shares = null,
		bhref = false;
	var Intent = null,
		File = null,
		Uri = null,
		pic=null,
		main = null;
	/**
	 * 更新分享服务
	 */
	function updateSerivces() {
		plus.share.getServices(function(s) {
			shares = {};
			for (var i in s) {
				var t = s[i];
				shares[t.id] = t;
			}
		}, function(e) {
			alert("获取分享服务列表失败：" + e.message);
		});
	}
	mui.plusReady(function() {
		updateSerivces();
		if (plus.os.name == "Android") {
			Intent = plus.android.importClass("android.content.Intent");
			File = plus.android.importClass("java.io.File");
			Uri = plus.android.importClass("android.net.Uri");
			main = plus.android.runtimeMainActivity();
		}
	});

	// 打开分享
	function shareShow() {
		bhref = false;
		var ids = [{
				id: "weixin",
				ex: "WXSceneSession"
			}, {
				id: "weixin",
				ex: "WXSceneTimeline"
			}],
			bts = [{
				title: "发送给微信好友"
			}, {
				title: "分享到微信朋友圈"
			}];
		if (plus.os.name == "iOS") {
			ids.push({
				id: "qq"
			});
			bts.push({
				title: "分享到QQ"
			});
		}
		plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			},
			function(e) {
				var i = e.index;
				if (i > 0) {
					shareAction(ids[i - 1].id, ids[i - 1].ex);
				}
			}
		);
	};
	/**
	 * 分享操作
	 * @param {String} id
	 */
	function shareAction(id, ex) {
		var s = null;
		if (!id || !(s = shares[id])) {
			alert("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			alert("---已授权---");
			shareMessage(s, ex);
		} else {
			alert("---未授权---");
			s.authorize(function() {
				shareMessage(s, ex);
			}, function(e) {
				alert("认证授权失败：" + e.code + " - " + e.message);
			});
		}
	};
	/**
	 * 发送分享消息
	 * @param {plus.share.ShareService} s
	 */
	function shareMessage(s, ex) {
		alert('---分享---');
		var msg = {
			content: '这是一个非常好用的东东',
			extra: {
				scene: ex
			}
		};
		alert(bhref);
		if (bhref) {
			msg.href = sharehref.value;
			//if (sharehrefTitle && sharehrefTitle.value != "") {
			msg.title = "test"; // sharehrefTitle.value;
			//}
			//if (sharehrefDes && sharehrefDes.value != "") {
			msg.content = 'ddddd'; //sharehrefDes.value;
			//}
			msg.thumbs = ["./dist/image/4-108.png"];
		} else {
			if (pic && pic.realUrl) {
				msg.pictures = [pic.realUrl];
			}
		}
		alert(JSON.stringify(msg));
		//outLine(JSON.stringify(msg));
		s.send(msg, function() {
			alert("分享到\"" + s.description + "\"成功！ ");
		}, function(e) {
			alert("分享到\"" + s.description + "\"失败: " + e.code + " - " + e.message);
		});
	};
	// 
	// 分析链接
	function shareHref() {
		bhref = true;
		var ids = [{
				id: "weixin",
				ex: "WXSceneSession"
			}, {
				id: "weixin",
				ex: "WXSceneTimeline"
			}],
			bts = [{
				title: "发送给微信好友"
			}, {
				title: "分享到微信朋友圈"
			}];
		if (plus.os.name == "iOS") {
			ids.push({
				id: "qq"
			});
			bts.push({
				title: "分享到QQ"
			});
		}
		plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: bts
			},
			function(e) {
				var i = e.index;
				if (i > 0) {
					shareAction(ids[i - 1].id, ids[i - 1].ex);
				}
			}
		);
	}
	let HeadToolBar = React.createClass({
		openAddWindow: function() {
			var me = this;
			me.setState({
				backHome: 'block',
				openAddWindow: 'block',
				completeNote: 'block'
			});
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


		},
		render: function() {
			var me = this;
			return (
				<div>
				   <header className="mui-bar mui-bar-nav">		
				   		<a className="mui-icon-pengyouquan mui-icon  mui-pull-left sharethis" onClick={shareShow}>分 享</a>
						<a className="mui-icon mui-icon-plusempty mui-pull-right" style={{color: '#999'}}
						 onClick={me.openAddWindow}></a>						
						<h1 className="mui-title">NoteApp </h1>
					</header>  
				</div>
			);
		}
	});

	module.exports = HeadToolBar;
});