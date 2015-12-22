define(function(require, exports, module) {
	var ListItem = React.createClass({
		 
		componentDidMount: function() {
			setTimeout(function() {
				mui('.mui-switch')['switch'](); 
			}, 1);
			//console.log(mui('.toggleLocker')[0].classList);
			//console.log(mui('.toggleLocker')[0].classList.contains('mui-active'));
		},
		render: function() {
			let isNode = this.props.item.isNode;
			let link = this.props.item.link ? this.props.item.link : '#';
			let liClass = isNode ? 'mui-table-view-cell mui-collapse' : 'mui-table-view-cell';

			let subItems = [];

			if (this.props.item.items) {
				this.props.item.items.forEach(function(element, index) {
					subItems.push(<li className='mui-table-view-cell'>
				 		<a className="mui-navigate-right" href={element.link}>{element.disName}</a>
				 	</li>);
				});
			};


			let childrens = [];
			if (isNode) {
				childrens.push(<ul className="mui-table-view mui-table-view-chevron">{subItems}</ul>);
			};
			if (this.props.item.switch) {
				return (
					<div>
						<li className={liClass}>{this.props.item.disName}
							<div  className="mui-switch mui-active toggleLocker" onClick={this.props.item.handler}>
								<div className="mui-switch-handle"></div>
							</div> 
							{childrens}
						</li>
					</div>
				);
			}
			return (
				<div>
					<li className={liClass}>
						<a className="mui-navigate-right" href={link}>{this.props.item.disName}</a>
						{childrens}
					</li>
				</div>
			);
		}
	});



	module.exports = ListItem;
});