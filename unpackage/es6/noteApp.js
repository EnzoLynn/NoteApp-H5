define(function(require, exports, module) { 
	var HeadToolBar = require('js/HeadToolBar.js');
	var first;

	mui.init({
		subpages: [{
			url: 'listSubPage.html', //下拉刷新内容页面地址
			id: 'listSubPage', //内容页面标志
			styles: {
				top: '48px'
			}
		}]
	});

	mui.plusReady(function() { 
		ReactDOM.render(
			<NoteApp />,
			mui('.container')[0]
		);
	});

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

	let NoteApp = React.createClass({
		componentDidMount: function() {

		},
		render: function() {
			return (
				<div> 
					<HeadToolBar />
					<div id="pullrefresh" className="mui-content  mui-scroll-wrapper" >
						<div className="mui-scroll"> 
							<ul className="mui-table-view mui-table-view-chevron">
								
							</ul>
						</div>
					</div>  
				</div>
			);
		}
	});


});