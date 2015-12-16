define(function(require,exports,module){
	var ListItem = React.createClass({
		render: function() {
			let isNode = this.props.item.isNode;
			let link = this.props.item.link?this.props.item.link:'#';
			let liClass = isNode?'mui-table-view-cell mui-collapse':'mui-table-view-cell'; 

			let subItems= [];
			 
			this.props.item.items.forEach(function(element, index){
				 subItems.push(<li className='mui-table-view-cell'>
				 		<a className="mui-navigate-right" href={element.link}>{element.disName}</a>
				 	</li>);
			}); 

			let childrens = [];
			if (isNode) {
				childrens.push(<ul className="mui-table-view mui-table-view-chevron">{subItems}</ul>);
			};
			return (
				<div>
					<li className={liClass}>
						<a className="mui-navigate-right" href="#">{this.props.item.disName}</a>
						{childrens}
					</li>
				</div>
			);
		}	
	});



	module.exports = ListItem;
});