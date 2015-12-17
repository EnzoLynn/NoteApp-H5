define(function(require, exports, module) {


	var ListContainer = require('js/ListContainer.js');

	mui.plusReady(function() {
		ReactDOM.render(
			<SettingContainer />,
			mui('.container')[0]
		);

	});

	var SettingContainer = React.createClass({
		getInitialState: function() {
			return {
				items: [{
					isNode: true,
					disName: '产品',
					items: [{
						disName: 'IOS1',
						link: 'tab-webview-subpage-setting.html'
					}, {
						disName: 'IOS',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: true,
					disName: '安全',
					items: [{
						disName: '手势设置',
						link: '#'
					}, {
						disName: '11',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: false,
					disName: '启用手势',
					link: '#',
					items: [],
					switch: true
				},{
					isNode:false,
					disName:'设置手势',
					link: 'locker-dom.html',
					hidden:true//.mui-hidden
				}]
			};
		},

		render: function() {

			return (
				<div>
					 <header className="mui-bar mui-bar-nav">
						<a className="mui-icon mui-icon-left-nav mui-pull-left"></a>
						<h1 className="mui-title">设置</h1>
					</header>
					<div className="mui-content">
						 <ListContainer items={this.state.items}/>		
					</div>			 
				</div>
			);
		}
	});
});