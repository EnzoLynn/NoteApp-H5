'use strict';

define(function (require, exports, module) {
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(Locker, null), mui('.container')[0]);
	});
	var Locker = React.createClass({
		displayName: 'Locker',

		componentDidMount: function componentDidMount() {
			mui('.mui-locker').locker();
			var marginTop = (plus.screen.resolutionHeight - 300) / 2 - 20;
			var holder = mui('.holder')[0],
			    alert = mui('.alert')[0],
			    record = [];
			var reCount = 0;
			holder.style.margin = marginTop + 'px auto 10px auto';
			//处理事件
			holder.addEventListener('done', function (event) {
				var rs = event.detail;
				if (rs.points.length < 4) {
					alert.innerText = '手势太简单了';
					record = [];
					rs.sender.clear();
					return;
				}
				record.push(rs.points.join(''));
				var search = window.location.search;
				if (search.indexOf('reset=true') != -1) {
					//重设密码
					if (record.length >= 2) {
						if (record[0] == record[1]) {
							plus.storage.setItem('LockerPass', record[0]);
							alert.innerText = '手势设定完成';
							var curView = plus.webview.currentWebview();

							curView.back();
						} else {
							alert.innerText = '两次手势设定不一致';
						}
						rs.sender.clear();
						record = [];
					} else {
						alert.innerText = '请确认手势设定';
						rs.sender.clear();
					}
				} else {
					//登录
					var pass = plus.storage.getItem('LockerPass');
					if (record[0] == pass) {
						alert.innerText = '手势正确';
						var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
						mask.show(); //显示遮罩
						setTimeout(function () {
							mask.close(); //关闭遮罩
							plus.webview.close('locker-dom');
						}, 1000);
					} else {
						reCount++;
						alert.innerText = '手势错误';
						record = [];
						rs.sender.clear();
						if (reCount >= 4) {
							console.log(reCount);
							mui('.forgotPass')[0].classList.remove('mui-hidden');
						};
					}
				}
			});
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				'div',
				{ className: 'mui-content' },
				React.createElement('div', { className: 'mui-locker holder', 'data-locker-options': '{"ringColor":"rgba(210,210,210,1)","fillColor":"#ffffff","pointColor":"rgba(0,136,204,1)","lineColor":"rgba(0,136,204,1)"}',
					'data-locker-width': '300', 'data-locker-height': '300' }),
				React.createElement('div', { className: 'alert' }),
				React.createElement(
					'div',
					{ className: 'forgotPassContainer' },
					React.createElement(
						'a',
						{ className: 'mui-hidden forgotPass', onClick: function (e) {
								return _this.forgotPass(e);
							} },
						'忘记密码?'
					)
				)
			);
		},
		forgotPass: function forgotPass(e) {
			e.preventDefault();
			mui.prompt('请输入解锁码:', function (e) {
				if (e.index == 0) {
					if (e.value == '888') {
						plus.webview.close('locker-dom');
					} else {
						alert('无效的解锁码');
					}
				}
			});
		}
	});
});