"use strict";

define(function (require, exports, module) {
	// H5 plus事件处理ddd
	function plusReady() {
		// 弹出系统选择按钮框
		plus.nativeUI.actionSheet({
			title: "Plus is ready!",
			cancel: "取消",
			buttons: [{
				title: "1"
			}, {
				title: "2"
			}]
		}, function (e) {
			console.log("User pressed: " + e.index);
		});
	}
	if (window.plus) {
		plusReady();
	} else {
		document.addEventListener("plusready", plusReady, false);
	}
});