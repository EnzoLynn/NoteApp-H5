define(function(require, exports, module) {
	var $ = require('jquery');
	var HeadToolBar = require('js/HeadToolBar.js');
	var first;
	mui.init();

	mui.back = function() {

		//首次按键，提示‘再按一次退出应用’
		if (!first) {
			first = new Date().getTime();
			mui.toast('再按一次退出应用');
			setTimeout(function() {
				first = null;
			}, 1000);
		} else {
			if (new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}
	};
	// H5 plus事件处理ddd
	function plusReady() {


		// 弹出系统选择按钮框
		plus.nativeUI.actionSheet({
			title: "Plus is ready!",
			cancel: "取消",
			buttons: [{
				title: "1"
			}, {
				title: "2"
			}]
		}, function(e) {
			console.log("User pressed: " + e.index);
		});
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
	let NoteApp = React.createClass({
		render: function() {
			return (
				<div>
					<HeadToolBar />
					<div class="mui-content">
						<ul className="mui-table-view">
							<li className="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<img className="mui-media-object mui-pull-left" src="../images/shuijiao.jpg" />
									<div className="mui-media-body">
										幸福
										<p className='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
									</div>
								</a>
							</li>
							<li className="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<img className="mui-media-object mui-pull-left" src="../images/muwu.jpg" />
									<div className="mui-media-body">
										木屋
										<p className='mui-ellipsis'>想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
									</div>
								</a>
							</li>
							<li className="mui-table-view-cell mui-media">
								<a href="javascript:;">
									<img className="mui-media-object mui-pull-left" src="../images/cbd.jpg" />
									<div className="mui-media-body">
										CBD
										<p className='mui-ellipsis'>烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			);
		}
	});
	$(function() {
		ReactDOM.render(
			<NoteApp />,
			$('.container').get(0)
		);

	});
});