define(function(require,exports,module){
 
	var ListItem = require('js/ListItem.js');

	var ListContainer = React.createClass({

		render: function() { 			 
			let items=[];
			this.props.items.forEach(function(item, index){
				items.push(<ListItem item={item}/>);
			});
			return (
				<div>
					<ul className="mui-table-view">
						{items}
					</ul>
				</div>
			);
		}	
	});
 

	module.exports = ListContainer;
});