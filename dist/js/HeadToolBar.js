"use strict";define(function(require,exports,module){function updateSerivces(){plus.share.getServices(function(s){shares={};for(var i in s){var t=s[i];shares[t.id]=t}},function(e){alert("获取分享服务列表失败："+e.message)})}function shareShow(){bhref=!1;var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"}],bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"}];"iOS"==plus.os.name&&(ids.push({id:"qq"}),bts.push({title:"分享到QQ"})),plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},function(e){var i=e.index;i>0&&shareAction(ids[i-1].id,ids[i-1].ex)})}function shareAction(id,ex){var s=null;return id&&(s=shares[id])?void(s.authenticated?shareMessage(s,ex):(alert("---未授权---"),s.authorize(function(){shareMessage(s,ex)},function(e){alert("认证授权失败："+e.code+" - "+e.message)}))):void alert("无效的分享服务！")}function shareMessage(s,ex){var msg={content:sharecontent.value,extra:{scene:ex}};bhref?(msg.href=sharehref.value,msg.title="test",msg.content="ddddd",msg.thumbs=["./dist/image/4-108.png"]):pic&&pic.realUrl&&(msg.pictures=[pic.realUrl]),s.send(msg,function(){alert('分享到"'+s.description+'"成功！ ')},function(e){alert('分享到"'+s.description+'"失败: '+e.code+" - "+e.message)})}var shares=null,bhref=!1,Intent=null,File=null,Uri=null,main=null;mui.plusReady(function(){updateSerivces(),"Android"==plus.os.name&&(Intent=plus.android.importClass("android.content.Intent"),File=plus.android.importClass("java.io.File"),Uri=plus.android.importClass("android.net.Uri"),main=plus.android.runtimeMainActivity())});var HeadToolBar=React.createClass({displayName:"HeadToolBar",openAddWindow:function(){var me=this;me.setState({backHome:"block",openAddWindow:"block",completeNote:"block"});var ws=mui.openWindow({url:"addNoteWindow.html",id:"addNoteWindow",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}});ws&&ws.evalJS("ClearValue()")},render:function(){var me=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-icon-pengyouquan mui-icon  mui-pull-left sharethis",onClick:shareShow},"分 享"),React.createElement("a",{className:"mui-icon mui-icon-plusempty mui-pull-right",style:{color:"#999"},onClick:me.openAddWindow}),React.createElement("h1",{className:"mui-title"},"NoteApp ")))}});module.exports=HeadToolBar});
//# sourceMappingURL=HeadToolBar.js.map