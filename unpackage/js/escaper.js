'use strict';

define(function (require, exports, module) {

	var es = {
		encodeSpc: function encodeSpc(s) {
			var rs = '';
			rs = s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>').replace(/\"/g, '&quot;').replace(/\'/g, '&apos;');
			return rs;
		},
		decodeSpc: function decodeSpc(s) {
			var rs = '';
			rs = s.replace(/<br\/>/g, '\n').replace(/&quot;/g, '\"').replace(/&apos;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
			return rs;
		}
	};

	module.exports = es;
});