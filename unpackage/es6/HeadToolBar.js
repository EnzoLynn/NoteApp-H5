define(function(require, exports, module) {

	let HeadToolBar = React.createClass({
		render: function() { 
			return (
				<div> 
				   <header className="mui-bar mui-bar-nav">
						<a className="mui-icon mui-icon-bars mui-pull-left"></a>
						<a className="mui-icon mui-icon-info-filled mui-pull-right" style={{color: '#999'}}></a>
						<h1 className="mui-title">NoteApp </h1>
					</header> 
				</div>
			);
		}
	});

	module.exports = HeadToolBar;
});