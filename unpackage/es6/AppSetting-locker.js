define(function(require, exports, module) {
	mui.plusReady(function() {
		ReactDOM.render(
			<Locker />,
			mui('.container')[0]
		); 
	});
	var Locker = React.createClass({
		componentDidMount: function() {
			mui('.mui-locker').locker();
			var marginTop = (plus.screen.resolutionHeight-300)/2 - 20;
			console.log(marginTop);
			var holder = mui('.holder')[0],
				alert = mui('.alert')[0],
				record = [];
			holder.style.margin = `${marginTop}px auto 10px auto`;
			//处理事件
			holder.addEventListener('done', function(event) {
				console.log(window.location.search);
				var rs = event.detail;
				if (rs.points.length < 4) {
					alert.innerText = '设定的手势太简单了';
					record = [];
					rs.sender.clear();
					return;
				}
				console.log(rs.points.join(''));
				record.push(rs.points.join(''));
				if (record.length >= 2) {
					if (record[0] == record[1]) {
						alert.innerText = '手势设定完成';						
						plus.webview.close('locker-dom');
					} else {
						alert.innerText = '两次手势设定不一致';
					}
					rs.sender.clear();
					record = [];
				} else {
					alert.innerText = '请确认手势设定';
					rs.sender.clear();
				}
			});
		},
		render: function() {
			return (
				<div className="mui-content">
					<div  className="mui-locker holder" data-locker-options='{"ringColor":"rgba(210,210,210,1)","fillColor":"#ffffff","pointColor":"rgba(0,136,204,1)","lineColor":"rgba(0,136,204,1)"}' 
						data-locker-width='300' data-locker-height='300'></div>
					<div className='alert'></div>
				</div>
			);
		}
	});

});