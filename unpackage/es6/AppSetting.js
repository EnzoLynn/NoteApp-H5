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
					disName: '产品',
					items: [{
						disName: 'IOS',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}, {
						disName: 'IOS',
						link: '#'
					}]
				}, {
					isNode: false,
					disName: '产品',
					link: '#',
					items: []
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