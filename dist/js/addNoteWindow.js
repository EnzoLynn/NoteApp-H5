"use strict";define(function(require,exports,module){var dbHelper,IndexDBHelper=require("js/IndexDBHelper.js"),storeName="Notes",databaseName="NoteApp";dbHelper=new IndexDBHelper,dbHelper.openDatabase(databaseName,storeName,!1,function(omes){omes.success||alert(omes.msg)});var AddNoteForm=React.createClass({displayName:"AddNoteForm",getWeek:function(){var date=new Date,day=date.getDay();return 0==day?"日":1==day?"一":2==day?"二":3==day?"三":4==day?"四":5==day?"五":6==day?"六":"no week"},preZeroFill:function(num,size){if(num>=Math.pow(10,size))return num.toString();var _str=Array(size+1).join("0")+num;return _str.slice(_str.length-size)},getDateTime:function(time){var me=this,now=new Date,year=now.getFullYear(),month=now.getMonth()+1,day=now.getDate(),hours=now.getHours(),minutes=now.getMinutes(),seconds=now.getSeconds();month+"月"+day+"日 "+me.preZeroFill(hours,2)+":"+me.preZeroFill(minutes,2)+":"+me.preZeroFill(seconds,2),me.getWeek();return year+"/"+month+"/"+day+" "+me.preZeroFill(hours,2)+":"+me.preZeroFill(minutes,2)+":"+me.preZeroFill(seconds,2)},addNote:function(callback){var me=this,val=me.refs.textarea.value;val=escape(val);var date=me.getDateTime();if(""!=window.noteid){var id=parseInt(window.noteid);dbHelper.updateById(storeName,id,{content:val,createon:date},function(dmes){if(dmes.success){window.noteid="",window.noteval="";var ws=plus.webview.getWebviewById("listSubPage");ws&&ws.evalJS("refreshList()"),callback&&callback()}else alert(dmes.msg)})}else dbHelper.add(storeName,[{content:val,createon:date}],function(ames){if(ames.success){me.refs.textarea.value="",window.noteid="",window.noteval="";var ws=plus.webview.getWebviewById("listSubPage");ws&&ws.evalJS("refreshList()"),callback&&callback()}else alert(ames.msg)})},completeNote:function(){var me=this,mask=mui.createMask();mask.show(),me.addNote(function(){mui.back(),mask.close()})},componentDidMount:function(){},render:function(){var me=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-action-back mui-icon  mui-pull-left backHome"},"返回"),React.createElement("span",{className:"mui-pull-right completeNote",onClick:me.completeNote},"完成"),React.createElement("h1",{className:"mui-title"},"NoteApp ")),React.createElement("div",{className:"mui-content"},React.createElement("textarea",{id:"textarea",ref:"textarea",style:{height:"600px"},placeholder:"多行文本框"})))}});window.PushValue=function(id,val){var esval=unescape(val);window.noteid=id,window.noteval=esval,mui("#textarea")[0].value=esval},window.ClearValue=function(){window.noteid="",window.noteval="",mui("#textarea")[0].value=""},mui.plusReady(function(){ReactDOM.render(React.createElement(AddNoteForm,null),mui(".container")[0])})});
//# sourceMappingURL=addNoteWindow.js.map