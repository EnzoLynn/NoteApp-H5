"use strict";define(function(require,exprots,module){var Navigator=React.createClass({displayName:"Navigator",componentDidMount:function(){var self=plus.webview.currentWebview(),aniShow={};this.props.subpages.forEach(function(element,index){var temp={};if(index>0){var sub=plus.webview.create(element.url,element.url,element.styles);sub.hide(),self.append(sub)}else temp[element.url]="true",mui.extend(aniShow,temp)});var activeTab=this.props.subpages[0].url;mui(".mui-bar-tab").on("tap","a",function(e){var targetTab=this.getAttribute("href");if(targetTab!=activeTab){if(mui.os.ios||aniShow[targetTab])plus.webview.show(targetTab);else{var temp={};temp[targetTab]="true",mui.extend(aniShow,temp),plus.webview.show(targetTab,"fade-in",300)}plus.webview.hide(activeTab),activeTab=targetTab}})},render:function(){var navItems=[];return this.props.subpages.forEach(function(item,index){var iconClass="mui-icon "+item.icon,tabClass="mui-tab-item";0==index&&(tabClass="mui-tab-item mui-active"),item.tip?navItems.push(React.createElement("a",{className:tabClass,href:item.url},React.createElement("span",{className:iconClass},React.createElement("span",{className:"mui-badge"},item.tip)),React.createElement("span",{className:"mui-tab-label"},item.title))):navItems.push(React.createElement("a",{className:tabClass,href:item.url},React.createElement("span",{className:iconClass}),React.createElement("span",{className:"mui-tab-label"},item.title)))}),React.createElement("nav",{className:"mui-bar mui-bar-tab"},navItems)}});module.exports=Navigator});
//# sourceMappingURL=Navigator.js.map