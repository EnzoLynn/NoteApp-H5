"use strict";define(function(require,exports,module){var ShareHelper=require("js/ShareHelper.js"),share=new ShareHelper;require("jquery");share.Init();var ShareWin=React.createClass({displayName:"ShareWin",shareShow:function(){var me=this,pic=me.refs.sharepic;share.msg={content:me.refs.sharecontent.value},share.pic=pic,me.refs.useLink.checked&&(share.msg.href="www.noteapp.com"),share.bhref=me.refs.useLink.checked?!0:!1,share.shareShow()},sharePic:function(type){var me=this,pic=me.refs.sharepic;return share.pic=pic,"shareGalleryPicture"==type?void share.shareGalleryPicture():"shareLogoPicture"==type?void share.shareLogoPicture():"shareCameraPicture"==type?void share.shareCameraPicture():void 0},useLink:function(){var me=this;me.refs.useLink.checked?me.refs.imgTable.style.display="none":me.refs.imgTable.style.display="table"},backHome:function(){var me=this,pic=me.refs.sharepic;me.refs.sharecontent.value="我正在使用NoteApp随手记，赶紧跟我一起来体验！",pic.src="xxx.png",pic.realUrl="",share.pic=null,mui.back()},render:function(){var _this=this;return React.createElement("div",null,React.createElement("header",{className:"mui-bar mui-bar-nav"},React.createElement("a",{onClick:this.backHome,className:"mui-icon  mui-pull-left backHome"},"返回"),React.createElement("span",{className:"mui-pull-right completeNote",onClick:function(){return _this.shareShow()}},"分享"),React.createElement("h1",{className:"mui-title"},"NoteApp ")),React.createElement("div",{className:"mui-content"},React.createElement("br",null),React.createElement("p",{className:"heading"},"分享内容："),React.createElement("textarea",{ref:"sharecontent",className:"sharecontent",rows:"3"},"我正在使用NoteApp随手记，赶紧跟我一起来体验！"),React.createElement("br",null),React.createElement("br",null),React.createElement("p",{className:"heading"},"分享图片："),React.createElement("br",null),React.createElement("div",{onClick:function(){return _this.useLink()},className:"mui-input-row mui-checkbox mui-left"},React.createElement("label",null,"使用连接"),React.createElement("input",{ref:"useLink",name:"checkbox",value:"",type:"checkbox"})),React.createElement("br",null),React.createElement("table",{ref:"imgTable",className:"shareBtnTable"},React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareCameraPicture")}},"拍照")),React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareGalleryPicture")}},"相册选取")),React.createElement("td",null,React.createElement("div",{className:"button button-select",onClick:function(){return _this.sharePic("shareLogoPicture")}},"使用logo图"))),React.createElement("tr",null,React.createElement("td",{colSpan:3},React.createElement("br",null))),React.createElement("tr",null,React.createElement("td",{colSpan:3},React.createElement("img",{ref:"sharepic",className:"pic",src:"xxx.png"})))))))}});mui.plusReady(function(){ReactDOM.render(React.createElement(ShareWin,null),mui(".container")[0])})});
//# sourceMappingURL=share.js.map