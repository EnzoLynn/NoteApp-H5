"use strict";define(function(require,exports,module){var first,HeadToolBar=require("js/HeadToolBar.js"),Navigator=require("js/Navigator.js");mui.plusReady(function(){ReactDOM.render(React.createElement(NoteApp,null),mui(".container")[0])});var NoteApp=React.createClass({displayName:"NoteApp",componentDidMount:function(){var hasLocker=plus.storage.getItem("Locker"),subpages=[{url:"listSubPage.html",id:"listSubPage",styles:{top:"48px",bottom:"51px"}}];hasLocker&&"enable"==hasLocker&&subpages.push({url:"subpages/appsetting-locker.html",id:"locker-dom",styles:{top:"0px",bottom:"0px"}}),mui.init({keyEventBind:{backbutton:!1},subpages:subpages,preloadPages:[{url:"addNoteWindow.html",id:"addNoteWindow",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}},{url:"Share.html",id:"Share",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}}],beforeback:function(){return first?((new Date).getTime()-first<1e3&&plus.runtime.quit(),!0):(first=(new Date).getTime(),mui.toast("再按一次退出应用"),setTimeout(function(){first=null},1e3),!1)}})},getInitialState:function(){var subpage_style={top:"0px",bottom:"51px"};return{subpages:[{url:"listSubPage.html",icon:"mui-icon-home",title:"首页",styles:{top:"48px",bottom:"51px"}},{url:"subpages/tab-webview-subpage-chat.html",icon:"mui-icon-email",title:"消息",tip:9,styles:subpage_style},{url:"subpages/Contact.html",icon:"mui-icon-contact",title:"通讯录",styles:subpage_style},{url:"subpages/appsetting.html",icon:"mui-icon-gear",title:"设置",styles:subpage_style}]}},render:function(){return React.createElement("div",null,React.createElement(HeadToolBar,{currpage:"home"}),React.createElement(Navigator,{subpages:this.state.subpages}))}})});
//# sourceMappingURL=noteApp.js.map
"use strict";define(function(require,exports,module){var dbHelper,escaper=require("js/escaper.js"),IndexDBHelper=require("js/IndexDBHelper.js"),storeName="Notes",databaseName="NoteApp";dbHelper=new IndexDBHelper,dbHelper.openDatabase(databaseName,storeName,!1,function(omes){omes.success||alert(omes.msg)});var AddNoteForm=React.createClass({displayName:"AddNoteForm",getWeek:function(){var date=new Date,day=date.getDay();return 0==day?"日":1==day?"一":2==day?"二":3==day?"三":4==day?"四":5==day?"五":6==day?"六":"no week"},preZeroFill:function(num,size){if(num>=Math.pow(10,size))return num.toString();var _str=Array(size+1).join("0")+num;return _str.slice(_str.length-size)},getDateTime:function(time){var me=this,now=new Date,year=now.getFullYear(),month=now.getMonth()+1,day=now.getDate(),hours=now.getHours(),minutes=now.getMinutes(),seconds=now.getSeconds();month+"月"+day+"日 "+me.preZeroFill(hours,2)+":"+me.preZeroFill(minutes,2)+":"+me.preZeroFill(seconds,2),me.getWeek();return year+"/"+month+"/"+day+" "+me.preZeroFill(hours,2)+":"+me.preZeroFill(minutes,2)+":"+me.preZeroFill(seconds,2)},addNote:function(callback){var me=this,val=me.refs.textarea.value;val=escaper.encodeSpc(val);var date=me.getDateTime();if(""!=window.noteid){var id=parseInt(window.noteid);dbHelper.updateById(storeName,id,{content:val,createon:date},function(dmes){if(dmes.success){window.noteid="",window.noteval="";var ws=plus.webview.getWebviewById("listSubPage");ws&&ws.evalJS("refreshList()"),callback&&callback()}else alert(dmes.msg)})}else dbHelper.add(storeName,[{content:val,createon:date}],function(ames){if(ames.success){me.refs.textarea.value="",window.noteid="",window.noteval="";var ws=plus.webview.getWebviewById("listSubPage");ws&&ws.evalJS("refreshList()"),callback&&callback()}else alert(ames.msg)})},completeNote:function(){var me=this,mask=mui.createMask();mask.show(),me.addNote(function(){mui.back(),mask.close()})},componentDidMount:function(){},render:function(){var me=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-action-back mui-icon  mui-pull-left backHome"},"返回"),React.createElement("span",{className:"mui-pull-right completeNote",onClick:me.completeNote},"完成"),React.createElement("h1",{className:"mui-title"},"NoteApp ")),React.createElement("div",{className:"mui-content"},React.createElement("textarea",{id:"textarea",ref:"textarea",style:{height:"600px"},placeholder:"多行文本框"})))}});window.PushValue=function(id,val){var esval=unescape(val);esval=escaper.decodeSpc(esval),window.noteid=id,window.noteval=esval,mui("#textarea")[0].value=esval},window.ClearValue=function(){window.noteid="",window.noteval="",mui("#textarea")[0].value=""},mui.plusReady(function(){ReactDOM.render(React.createElement(AddNoteForm,null),mui(".container")[0])})});
//# sourceMappingURL=addNoteWindow.js.map
"use strict";define(function(require,exports,module){var HeadToolBar=React.createClass({displayName:"HeadToolBar",openAddWindow:function(){var me=this;me.setState({backHome:"block",openAddWindow:"block",completeNote:"block"});var mask=mui.createMask();mask.show();var ws=mui.openWindow({url:"addNoteWindow.html",id:"addNoteWindow",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}});ws&&ws.evalJS("ClearValue()"),mask.close()},openShareWindow:function(){mui.openWindow({url:"Share.html",id:"Share",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}})},render:function(){var me=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-icon-pengyouquan mui-icon  mui-pull-left sharethis",onClick:me.openShareWindow},"分享"),React.createElement("a",{className:"mui-icon mui-icon-plusempty mui-pull-right",onClick:me.openAddWindow}),React.createElement("h1",{className:"mui-title"},"NoteApp ")))}});module.exports=HeadToolBar});
//# sourceMappingURL=HeadToolBar.js.map
"use strict";define(function(require,exports,module){var merge=require("js/lib/merge.js"),message=function(_ref){var success=_ref.success,msg=_ref.msg,result=_ref.result,total=_ref.total;return{success:success,msg:msg,result:result,total:total}},dbHelper=function(){this.localDatabase={},this.localDatabase.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,this.localDatabase.IDBKeyRange=window.IDBKeyRange||window.webkitIDBKeyRange,this.localDatabase.IDBTransaction=window.IDBTransaction||window.webkitIDBTransaction,this.localDatabase.indexedDB.onerror=function(e){alert("Database error: "+e.target.errorCode)}};dbHelper.prototype.openDatabase=function(dbName,storeName,version,callback){var me=this,vs=1;try{version&&(vs=version);var openRequest=me.localDatabase.indexedDB.open(dbName,vs);openRequest.onerror=function(e){callback&&callback(new message({success:!1,msg:"Database error: "+e.target.errorCode,result:null}))},openRequest.onsuccess=function(e){me.localDatabase.db=e.target.result,callback&&callback(new message({success:!0,msg:"createObjectStore success",result:null}))},openRequest.onupgradeneeded=function(e){me.localDatabase.db=e.target.result,me.createObjectStore(storeName,!1,!1,function(){callback&&callback(new message({success:!0,msg:"upgradeneeded success",result:null}))})}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.distoryDatabase=function(dbName,callback){var _this=this;try{!function(){var me=_this,deleteDbRequest=me.localDatabase.indexedDB.deleteDatabase(dbName);deleteDbRequest.onsuccess=function(e){callback&&callback(new message({success:!0,msg:"Database deleted",result:null})),deleteDbRequest.onerror=function(e){callback&&callback(new message({success:!1,msg:"Database error: "+e.target.errorCode,result:null}))}}}()}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.createObjectStore=function(storeName,keyPath,valIndex,callback){try{var _me=this,def={keyPath:"id",autoIncrement:!0},kp=merge(def,keyPath||{}),employeeStore=_me.localDatabase.db.createObjectStore(storeName,kp);if(valIndex)for(var i=0;i<valIndex.length;i++){var index=valIndex[i];employeeStore.createIndex(index.name,index.feild,{unique:index.unique})}employeeStore.onsuccess=function(e){callback&&callback(new message({success:!0,msg:"ok",result:null}))}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.find=function(storeName,whereObj,isFuzzy,topNum,callback){"function"==typeof whereObj?(callback=whereObj,whereObj=null,isFuzzy=null,topNum=null):"function"==typeof isFuzzy?(callback=isFuzzy,isFuzzy=null,topNum=null):"function"==typeof topNum&&(callback=topNum,topNum=null);try{var _me2=this,transaction=_me2.localDatabase.db.transaction(storeName,"readwrite"),_store=transaction.objectStore(storeName);if(null!=_me2.localDatabase&&null!=_me2.localDatabase.db){var request=(_me2.localDatabase.db.transaction(storeName).objectStore(storeName),_store.openCursor()),result=[],res=[];request.onsuccess=function(e){var cursor=e.target.result;if(cursor){var data=cursor.value;result.push(data),cursor["continue"]()}else{if(whereObj)for(var i=0;i<result.length;i++)for(var key in whereObj){var value=result[i][key];if("object"==typeof whereObj[key]){var obj=whereObj[key];if("date"==obj.type){var val1=new Date(obj.value),val2=new Date(value);if(!(val2>=val1)){delete result[i];break}}else if(isFuzzy){if(-1==value.indexOf(whereObj[key])){delete result[i];break}}else if(whereObj[key]!=value){delete result[i];break}}else if(isFuzzy){if(-1==value.indexOf(whereObj[key])){delete result[i];break}}else if(whereObj[key]!=value){delete result[i];break}}for(var _i=0;_i<result.length;_i++)result[_i]&&res.push(result[_i]);topNum&&res.length>topNum&&res.splice(topNum-1,res.length-topNum),callback&&callback(new message({success:!0,total:result.length,msg:"find success",result:result}))}}}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.getById=function(storeName,id,callback){try{var _me3=this,transaction=_me3.localDatabase.db.transaction(storeName,"readwrite"),store=transaction.objectStore(storeName);null!=_me3.localDatabase&&null!=_me3.localDatabase.db&&(store.get(id).onsuccess=function(e){callback&&callback(new message({success:!0,msg:"ok",result:e.target.result}))})}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.add=function(storeName,fieldArr,callback){try{var _me4=this,transaction=_me4.localDatabase.db.transaction(storeName,"readwrite"),store=transaction.objectStore(storeName);if(null!=_me4.localDatabase&&null!=_me4.localDatabase.db)for(var i=0;i<fieldArr.length;i++){var obj=fieldArr[i],request=store.add(obj);request.onsuccess=function(e){callback&&callback(new message({success:!0,msg:"ok",result:null}))},request.onerror=function(e){callback&&callback(new message({success:!1,msg:e,result:null}))}}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.deleteById=function(storeName,id,callback){try{var _me5=this;if(null!=_me5.localDatabase&&null!=_me5.localDatabase.db){var store=_me5.localDatabase.db.transaction(storeName,"readwrite").objectStore(storeName);store["delete"](id).onsuccess=function(e){callback&&callback(new message({success:!0,msg:"ok",result:null}))}}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.clear=function(storeName,callback){try{if(null!=me.localDatabase&&null!=me.localDatabase.db){var store=me.localDatabase.db.transaction(storeName,"readwrite").objectStore(storeName);store.clear().onsuccess=function(e){callback&&callback(new message({success:!0,msg:storeName+" object store cleared",result:null}))}}}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},dbHelper.prototype.updateById=function(storeName,id,setObj,callback){var _this2=this;try{!function(){var me=_this2,transaction=me.localDatabase.db.transaction(storeName,"readwrite"),store=transaction.objectStore(storeName),record=void 0;null!=me.localDatabase&&null!=me.localDatabase.db&&(store.get(id).onsuccess=function(e){record=e.target.result;for(var key in setObj)(record[key]||""==record[key])&&(record[key]=setObj[key]);var request=store.put(record);request.onsuccess=function(es){if(callback){var result=[];result.push(record),callback(new message({success:!0,msg:storeName+" store  "+JSON.stringify(record)+"  update",result:result}))}},request.onerror=function(er){callback&&callback(new message({success:!1,msg:er,result:null}))}})}()}catch(e){callback&&callback(new message({success:!1,msg:e,result:null}))}},module.exports=dbHelper});
//# sourceMappingURL=IndexDBHelper.js.map
"use strict";define(function(require,exports,module){var escaper=require("js/escaper.js"),limitDate=new Date,limitStep=3;limitDate=new Date(limitDate.setMonth(limitDate.getMonth()-limitStep)),limitDate.setHours(0,0,0,0);var dbHelper,IndexDBHelper=require("js/IndexDBHelper.js"),storeName="Notes",databaseName="NoteApp";dbHelper=new IndexDBHelper,dbHelper.openDatabase(databaseName,storeName,!1,function(omes){omes.success||alert(omes.msg)}),window.refreshList=function(){getNoteList(window.scope)},mui.plusReady(function(){ReactDOM.render(React.createElement(ListSubPage,null),mui(".subpageContainer")[0])});var NoteRow=React.createClass({displayName:"NoteRow",delNote:function(e,key){e.stopPropagation();var me=this,li=me.refs.muiLi;dbHelper.deleteById(storeName,key,function(dmes){dmes.success?(mui.swipeoutClose(li),me.props.afterdel1()):alert(dmes.msg)})},editNote:function(e,key){e.stopPropagation();dbHelper.getById(storeName,key,function(mes){if(mes.success){var val=mes.result.content;null==val&&(val="");var ws=mui.openWindow({url:"addNoteWindow.html",id:"addNoteWindow",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:100},waiting:{autoShow:!0,title:"正在加载...",options:{}}});ws&&ws.evalJS("PushValue('"+key+"','"+val+"')")}else alert(mes.msg)})},openShareWindow:function(key){var ws=mui.openWindow({url:"Share.html",id:"Share",styles:{top:0,bottom:0,width:"100%",height:"100%",hardwareAccelerated:!0},extras:{},createNew:!1,show:{autoShow:!0,aniShow:"slide-in-right",duration:1},waiting:{autoShow:!0,title:"正在加载...",options:{}}});ws&&dbHelper.getById(storeName,key,function(mes){if(mes.success){var val=mes.result.content;null==val&&(val=""),ws.evalJS("ShareText('"+val+"')")}else alert(mes.msg)})},render:function(){var _this=this,note=this.props.note;null==note.content&&(note.content="");var deNote=unescape(note.content);deNote=escaper.decodeSpc(deNote);var val=deNote.length>15?deNote.substring(0,15)+"...":deNote;return React.createElement("li",{ref:"muiLi",className:"mui-table-view-cell listCell"},React.createElement("div",{className:"mui-slider-right mui-disabled "},React.createElement("a",{className:"mui-btn mui-btn-blue",onClick:function(){return _this.openShareWindow(note.id)}},"分享"),React.createElement("a",{className:"mui-btn mui-btn-red",onClick:function(e){return _this.delNote(e,note.id)}},"删除")),React.createElement("div",{className:"mui-slider-handle",onClick:function(e){return _this.editNote(e,note.id)}},React.createElement("a",{className:"mui-navigate-right"},val,React.createElement("p",{className:"mui-ellipsis"},note.createon))))}});window.getNoteList=function(scope,sval,callback){var me=scope,searchVal=sval?sval:me.refs.searchInput?me.refs.searchInput.value:"";searchVal&&""!=searchVal?dbHelper.find(storeName,{content:escaper.encodeSpc(searchVal)},!0,function(mes){if(mes.success){var notes=mes.result;notes.sort(function(a,b){var kA=a.id,kB=b.id;return kB>kA?1:-1}),me.setState({notes:notes})}else alert(mes.msg);callback&&callback(mes)}):dbHelper.find(storeName,{createon:{type:"date",value:limitDate}},!1,function(mes){if(mes.success){var notes=mes.result;notes.sort(function(a,b){var kA=a.id,kB=b.id;return kB>kA?1:-1}),me.setState({notes:notes})}else alert(mes.msg);callback&&callback(mes)})};var loading=!1,ListSubPage=React.createClass({displayName:"ListSubPage",pulldownRefresh:function(){var me=this;document.body.querySelector(".mui-table-view"),document.body.querySelectorAll(".mui-table-view-cell");me.getList(),mui("#pullrefresh").pullRefresh().endPulldownToRefresh(),mui("#pullrefresh").pullRefresh().refresh(!0)},pullupRefresh:function(){var me=this;loading?mui("#pullrefresh").pullRefresh().endPullupToRefresh(!1):(loading=!0,limitDate=new Date(limitDate.setDate(limitDate.getDate()-limitStep)),window.getNoteList(me,me.refs.searchInput.value,function(mes){if(mes.success){var cells=(mes.result.length,document.body.querySelector(".mui-table-view"),document.body.querySelectorAll(".mui-table-view-cell"));mui("#pullrefresh").pullRefresh().endPullupToRefresh(cells.length>=mes.total)}loading=!1}))},getList:function(){var me=this;window.getNoteList(me,me.refs.searchInput.value)},searchList:function(e){var me=this;13==e.keyCode&&(window.getNoteList(me,me.refs.searchInput.value),me.refs.searchInput.blur())},componentDidMount:function(){var me=this;window.scope=me,mui.init({pullRefresh:{container:"#pullrefresh",down:{contentdown:"下拉可以刷新",contentover:"释放立即刷新",contentrefresh:"正在刷新...",callback:me.pulldownRefresh},up:{contentdown:"上拉可以加载",contentover:"释放立即加载",contentrefresh:"正在加载...",callback:me.pullupRefresh}}}),setTimeout(function(){window.getNoteList(me)},1)},getInitialState:function(){return{notes:null}},render:function(){var _this2=this,me=this;if(null==this.state.notes)return React.createElement("div",null,React.createElement("div",{id:"pullrefresh",className:"mui-content mui-scroll-wrapper"},React.createElement("div",{className:"mui-scroll"},React.createElement("ul",{className:"mui-table-view"},React.createElement("li",{ref:"muiLi",className:"mui-table-view-cell listCell"},"正在加载...")))));var notes=[];return this.state.notes.forEach(function(note,index){notes.push(React.createElement(NoteRow,{note:note,afterdel1:me.getList}))}),setTimeout(function(){mui(".mui-input-row input").input()},1),React.createElement("div",null,React.createElement("div",{id:"pullrefresh",className:"mui-content mui-scroll-wrapper"},React.createElement("div",{className:"mui-input-row mui-search"},React.createElement("input",{type:"search",ref:"searchInput",className:"mui-input-clear searchNotes",onKeyDown:function(e){return _this2.searchList(e)},placeholder:"输入搜索内容"})),React.createElement("div",{className:"mui-scroll"},React.createElement("ul",{className:"mui-table-view"},notes))))}})});
//# sourceMappingURL=ListSubPage.js.map
"use strict";var version=new Date,versionStr=version.getFullYear()+""+(version.getMonth()+1)+version.getDate();seajs.config({base:"/",paths:{image:"../image",css:"../css",js:"../js"},alias:{jquery:"./lib/jquery",mui:"./lib/mui",react:"./lib/react","react-dom":"./lib/react-dom"},map:[[/^(.*\.(?:css|js))(.*)$/i,"$1?v="+versionStr]],charset:"utf-8"});
//# sourceMappingURL=seaConfig.js.map
"use strict";define(function(require,exports,module){var escaper=require("js/escaper.js"),ShareHelper=require("js/ShareHelper.js"),share=new ShareHelper;require("jquery");share.Init(),window.ShareText=function(val){var esval=unescape(val);esval=escaper.decodeSpc(esval),mui(".sharecontent")[0].value=esval};var ShareWin=React.createClass({displayName:"ShareWin",shareShow:function(){var me=this,pic=me.refs.sharepic;share.msg={content:me.refs.sharecontent.value},share.pic=pic,me.refs.useLink.checked&&(share.msg.href="www.noteapp.com"),share.bhref=me.refs.useLink.checked?!0:!1,share.shareShow()},sharePic:function(type){var me=this,pic=me.refs.sharepic;return share.pic=pic,"shareGalleryPicture"==type?void share.shareGalleryPicture():"shareLogoPicture"==type?void share.shareLogoPicture():"shareCameraPicture"==type?void share.shareCameraPicture():void 0},useLink:function(){var me=this;me.refs.useLink.checked?me.refs.imgTable.style.display="none":me.refs.imgTable.style.display="table"},backHome:function(scope){var me=scope,pic=me.refs.sharepic;me.refs.sharecontent.value="我正在使用NoteApp随手记，赶紧跟我一起来体验！",pic.src="xxx.png",pic.realUrl="",share.pic=null},componentDidMount:function(){var me=this;mui.init({beforeback:function(){me.backHome(me)}})},render:function(){var _this=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{className:"mui-action-back mui-icon  mui-pull-left backHome"},"返回"),React.createElement("span",{className:"mui-pull-right completeNote",onClick:function(){return _this.shareShow()}},"分享"),React.createElement("h1",{className:"mui-title"},"NoteApp ")),React.createElement("div",{className:"mui-content"},React.createElement("br",null),React.createElement("p",{className:"heading"},"分享内容："),React.createElement("textarea",{ref:"sharecontent",className:"sharecontent",rows:"3"},"我正在使用NoteApp随手记，赶紧跟我一起来体验！"),React.createElement("br",null),React.createElement("br",null),React.createElement("p",{className:"heading"},"分享图片："),React.createElement("br",null),React.createElement("div",{onClick:function(){return _this.useLink()},className:"mui-input-row mui-checkbox mui-left"},React.createElement("label",null,"使用连接"),React.createElement("input",{ref:"useLink",name:"checkbox",value:"",type:"checkbox"})),React.createElement("br",null),React.createElement("table",{ref:"imgTable",className:"shareBtnTable"},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareCameraPicture")}},"拍照")),React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareGalleryPicture")}},"相册选取")),React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareLogoPicture")}},"使用logo图"))),React.createElement("tr",null,React.createElement("td",{colSpan:3},React.createElement("br",null))),React.createElement("tr",null,React.createElement("td",{colSpan:3},React.createElement("img",{ref:"sharepic",className:"pic",src:"xxx.png"})))))))}});mui.plusReady(function(){ReactDOM.render(React.createElement(ShareWin,null),mui(".container")[0])})});
//# sourceMappingURL=share.js.map
"use strict";define(function(require,exports,module){function ShareHelper(){this.shares=null,this.bhref=!1,this.Intent=null,this.File=null,this.Uri=null,this.pic=null,this.main=null,this.msg=null}var merge=require("js/lib/merge.js");ShareHelper.prototype.Init=function(){var me=this;mui.plusReady(function(){me.updateSerivces(),me.initAndroidDev()})},ShareHelper.prototype.updateSerivces=function(){var me=this;plus.share.getServices(function(s){me.shares={};for(var i in s){var t=s[i];me.shares[t.id]=t}},function(e){alert("获取分享服务列表失败："+e.message)})},ShareHelper.prototype.initAndroidDev=function(){var me=this;"Android"==plus.os.name&&(me.Intent=plus.android.importClass("android.content.Intent"),me.File=plus.android.importClass("java.io.File"),me.Uri=plus.android.importClass("android.net.Uri"),me.main=plus.android.runtimeMainActivity())},ShareHelper.prototype.shareShow=function(){var me=this,ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"}],bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"}];"iOS"==plus.os.name&&(ids.push({id:"qq"}),bts.push({title:"分享到QQ"})),plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},function(e){var i=e.index;i>0&&me.shareAction(ids[i-1].id,ids[i-1].ex)})},ShareHelper.prototype.shareAction=function(id,ex){var me=this,s=null;return id&&(s=me.shares[id])?void(s.authenticated?me.shareMessage(s,ex):s.authorize(function(){me.shareMessage(s,ex)},function(e){alert("认证授权失败："+e.code+" - "+e.message)})):void alert("无效的分享服务！")},ShareHelper.prototype.shareMessage=function(s,ex){var me=this,msg={content:"这是一个非常好用的东东,随手记",extra:{scene:ex}};me.bhref?(msg.href="www.baidu.com",msg.title="好用的App",msg.content="我正在使用NoteApp随手记，赶紧跟我一起来体验！",msg.thumbs=["./dist/image/4-108.png"]):me.pic&&me.pic.realUrl&&(msg.pictures=[me.pic.realUrl]),msg=merge(msg,me.msg),s.send(msg,function(){alert('分享到"'+s.description+'"成功！ ')},function(e){alert('分享到"'+s.description+'"失败: '+e.code+" - "+e.message)})},ShareHelper.prototype.shareCameraPicture=function(){var me=this,cmr=plus.camera.getCamera();cmr.captureImage(function(p){plus.io.resolveLocalFileSystemURL(p,function(entry){me.pic.src=entry.toLocalURL(),me.pic.realUrl=p},function(e){alert("读取拍照文件错误："+e.message)})},function(e){alert("拍照失败："+e.message)})},ShareHelper.prototype.shareGalleryPicture=function(){var me=this;plus.gallery.pick(function(p){me.pic.src=p,me.pic.realUrl=me.pic.src},function(e){alert("读取照片失败："+e.message)})},ShareHelper.prototype.shareLogoPicture=function(){var me=this,url="./dist/image/4-108.png";plus.io.resolveLocalFileSystemURL(url,function(entry){me.pic.src=entry.toLocalURL(),me.pic.realUrl=url},function(e){alert("读取Logo文件错误："+e.message)})},module.exports=ShareHelper});
//# sourceMappingURL=ShareHelper.js.map