"use strict";define(function(require,exports,module){var HeadToolBar=React.createClass({displayName:"HeadToolBar",openAddWindow:function(){var me=this;me.setState({backHome:"block",openAddWindow:"block",completeNote:"block"});var mask=mui.createMask();mask.show();var ws=mui.openWindow({url:"addNoteWindow.html",id:"addNoteWindow",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}});ws&&ws.evalJS("ClearValue()"),mask.close()},openShareWindow:function(){mui.openWindow({url:"Share.html",id:"Share",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}})},render:function(){var me=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-icon-pengyouquan mui-icon  mui-pull-left sharethis",onClick:me.openShareWindow},"分享"),React.createElement("a",{className:"mui-icon mui-icon-plusempty mui-pull-right",onClick:me.openAddWindow}),React.createElement("h1",{className:"mui-title"},"NoteApp ")))}});module.exports=HeadToolBar});
//# sourceMappingURL=HeadToolBar.js.map