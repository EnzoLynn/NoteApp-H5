"use strict";

define(function (require, exports, module) {
	var merge = require('js/lib/merge.js');

	function ShareHelper() {
		this.shares = null;
		this.bhref = false;
		this.Intent = null;
		this.File = null;
		this.Uri = null;
		this.pic = null;
		this.main = null;

		this.msg = null;
	};
	/**
  * 初始化ShareHelper
  */
	ShareHelper.prototype.Init = function () {
		var me = this;
		mui.plusReady(function () {
			me.updateSerivces();
			me.initAndroidDev();
		});
	};
	/**
  * 更新分享服务
  */
	ShareHelper.prototype.updateSerivces = function () {
		var me = this;
		plus.share.getServices(function (s) {
			me.shares = {};
			for (var i in s) {
				var t = s[i];
				me.shares[t.id] = t;
			}
		}, function (e) {
			alert("获取分享服务列表失败：" + e.message);
		});
	};
	/**
  * 初始化Android设备
  * @return {[type]} [description]
  */
	ShareHelper.prototype.initAndroidDev = function () {
		var me = this;
		if (plus.os.name == "Android") {
			me.Intent = plus.android.importClass("android.content.Intent");
			me.File = plus.android.importClass("java.io.File");
			me.Uri = plus.android.importClass("android.net.Uri");
			me.main = plus.android.runtimeMainActivity();
		}
	};

	// 打开分享
	ShareHelper.prototype.shareShow = function () {
		var me = this;
		var ids = [{
			id: "weixin",
			ex: "WXSceneSession"
		}, {
			id: "weixin",
			ex: "WXSceneTimeline"
		}],
		    bts = [{
			title: "发送给微信好友"
		}, {
			title: "分享到微信朋友圈"
		}];
		if (plus.os.name == "iOS") {
			ids.push({
				id: "qq"
			});
			bts.push({
				title: "分享到QQ"
			});
		}
		plus.nativeUI.actionSheet({
			cancel: "取消",
			buttons: bts
		}, function (e) {
			var i = e.index;
			if (i > 0) {
				me.shareAction(ids[i - 1].id, ids[i - 1].ex);
			}
		});
	};
	/**
  * 分享操作
  * @param {String} id
  */
	ShareHelper.prototype.shareAction = function (id, ex) {
		var me = this;
		var s = null;
		if (!id || !(s = me.shares[id])) {
			alert("无效的分享服务！");
			return;
		}
		if (s.authenticated) {
			me.shareMessage(s, ex);
		} else {
			s.authorize(function () {
				me.shareMessage(s, ex);
			}, function (e) {
				alert("认证授权失败：" + e.code + " - " + e.message);
			});
		}
	};
	/**
  * 发送分享消息
  * @param {plus.share.ShareService} s
  */
	ShareHelper.prototype.shareMessage = function (s, ex) {
		var me = this;
		var msg = {
			content: '这是一个非常好用的东东,随手记',
			extra: {
				scene: ex
			}
		};
		//alert(me.bhref);
		if (me.bhref) {
			msg.href = 'https://github.com/EnzoLynn';
			msg.title = "好用的App";
			msg.content = '我正在使用NoteApp随手记，赶紧跟我一起来体验！';
			msg.thumbs = ["./dist/image/4-108.png"];
		} else {
			if (me.pic && me.pic.realUrl) {
				msg.pictures = [me.pic.realUrl];
			}
		}
		msg = merge(msg, me.msg);
		//alert(JSON.stringify(msg));
		//outLine(JSON.stringify(msg));
		s.send(msg, function () {
			alert("分享到\"" + s.description + "\"成功！ ");
		}, function (e) {
			alert("分享到\"" + s.description + "\"失败: " + e.code + " - " + e.message);
		});
	};

	// 拍照添加图片分享
	ShareHelper.prototype.shareCameraPicture = function () {
		var me = this;
		//alert("拍照添加分享图片：");
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function (p) {
			plus.io.resolveLocalFileSystemURL(p, function (entry) {
				// alert("真实路径："+entry.fullPath); 
				//  alert("路径："+entry.toLocalURL); 
				me.pic.src = entry.toLocalURL();
				me.pic.realUrl = p;
				//alert("拍照图片：" + me.pic.realUrl);
			}, function (e) {
				alert("读取拍照文件错误：" + e.message);
			});
		}, function (e) {
			alert("拍照失败：" + e.message);
		});
	};
	// 从相册添加图片分享
	ShareHelper.prototype.shareGalleryPicture = function () {
		var me = this;
		//alert("从相册添加分享图片：");
		plus.gallery.pick(function (p) {
			// 从相册返回的路径不需要转换可以直接使用
			me.pic.src = p;
			me.pic.realUrl = me.pic.src;
			//alert("选择图片：" + me.pic.realUrl);
			//      plus.io.resolveLocalFileSystemURL(p,function(entry){
			//			pic.src=entry.toLocalURL();
			//			pic.realUrl=pic.src;
			//			outLine("选择图片："+pic.realUrl);
			//		},function(e){
			//			outLine("读取拍照文件错误："+e.message);
			//		} );
		}, function (e) {
			alert("读取照片失败：" + e.message);
		});
	};
	// 使用Logo图片分享
	ShareHelper.prototype.shareLogoPicture = function () {
		var me = this;
		//alert("使用Logo分享图片：");
		var url = "./dist/image/4-108.png";
		plus.io.resolveLocalFileSystemURL(url, function (entry) {
			me.pic.src = entry.toLocalURL();
			me.pic.realUrl = url;
		}, function (e) {
			alert("读取Logo文件错误：" + e.message);
		});
	};

	module.exports = ShareHelper;
});