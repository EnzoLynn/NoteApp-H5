'use strict';

define(function (require, exprots, module) {
	var Navigator = React.createClass({
		displayName: 'Navigator',

		componentDidMount: function componentDidMount() {
			var me = this;

			var self = plus.webview.currentWebview();
			var aniShow = {};
			this.props.subpages.forEach(function (element, index) {
				var temp = {};

				if (index > 0) {
					var sub = plus.webview.create(element.url, element.url, element.styles);
					sub.hide();
					self.append(sub);
				} else {
					temp[element.url] = "true";
					mui.extend(aniShow, temp);
				}
			});
			//当前激活选项
			var activeTab = this.props.subpages[0].url;
			//选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a', function (e) {
				var targetTab = this.getAttribute('href');
				if (targetTab == activeTab) {
					return;
				}

				//显示目标选项卡
				//若为iOS平台或非首次显示，则直接显示
				if (mui.os.ios || aniShow[targetTab]) {
					plus.webview.show(targetTab);
				} else {
					//否则，使用fade-in动画，且保存变量
					var temp = {};
					temp[targetTab] = "true";
					mui.extend(aniShow, temp);
					plus.webview.show(targetTab, "fade-in", 300);
				}
				//隐藏当前;
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
			});
		},
		render: function render() {
			var navItems = [];
			this.props.subpages.forEach(function (item, index) {
				var iconClass = 'mui-icon ' + item.icon;
				var tabClass = 'mui-tab-item';
				if (index == 0) {
					tabClass = 'mui-tab-item mui-active';
				};
				if (item.tip) {
					navItems.push(React.createElement(
						'a',
						{ className: tabClass,
							href: item.url },
						React.createElement(
							'span',
							{ className: iconClass },
							React.createElement(
								'span',
								{ className: 'mui-badge' },
								item.tip
							)
						),
						React.createElement(
							'span',
							{ className: 'mui-tab-label' },
							item.title
						)
					));
				} else {
					navItems.push(React.createElement(
						'a',
						{ className: tabClass,
							href: item.url },
						React.createElement('span', { className: iconClass }),
						React.createElement(
							'span',
							{ className: 'mui-tab-label' },
							item.title
						)
					));
				}
			});
			return React.createElement(
				'nav',
				{ className: 'mui-bar mui-bar-tab' },
				navItems
			);
		}
	});

	module.exports = Navigator;
});