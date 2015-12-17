'use strict';

define(function (require, exports, module) {
	var ListItem = React.createClass({
		displayName: 'ListItem',

		componentDidMount: function componentDidMount() {
			setTimeout(function () {
				mui('.mui-switch')['switch']();
			}, 1);
			console.log(mui('.toggleLocker')[0].classList);
			console.log(mui('.toggleLocker')[0].classList.contains('mui-active'));
		},
		render: function render() {
			var isNode = this.props.item.isNode;
			var link = this.props.item.link ? this.props.item.link : '#';
			var liClass = isNode ? 'mui-table-view-cell mui-collapse' : 'mui-table-view-cell';

			var subItems = [];

			if (this.props.item.items) {
				this.props.item.items.forEach(function (element, index) {
					subItems.push(React.createElement(
						'li',
						{ className: 'mui-table-view-cell' },
						React.createElement(
							'a',
							{ className: 'mui-navigate-right', href: element.link },
							element.disName
						)
					));
				});
			};

			var childrens = [];
			if (isNode) {
				childrens.push(React.createElement(
					'ul',
					{ className: 'mui-table-view mui-table-view-chevron' },
					subItems
				));
			};
			if (this.props.item['switch']) {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'li',
						{ className: liClass },
						this.props.item.disName,
						React.createElement(
							'div',
							{ className: 'mui-switch mui-active toggleLocker' },
							React.createElement('div', { className: 'mui-switch-handle' })
						),
						childrens
					)
				);
			}
			return React.createElement(
				'div',
				null,
				React.createElement(
					'li',
					{ className: liClass },
					React.createElement(
						'a',
						{ className: 'mui-navigate-right', href: link },
						this.props.item.disName
					),
					childrens
				)
			);
		}
	});

	module.exports = ListItem;
});