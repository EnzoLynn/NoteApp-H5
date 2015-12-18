'use strict';

define(function (require, exports, module) {
	var escaper = require('js/escaper.js');
	var ShareHelper = require('js/ShareHelper.js');
	var share = new ShareHelper();
	var $ = require('jquery');

	share.Init();
	window.ShareText = function (val) {
		var esval = unescape(val);
		esval = escaper.decodeSpc(esval);
		mui('.sharecontent')[0].value = esval;
	};
	var ShareWin = React.createClass({
		displayName: 'ShareWin',

		shareShow: function shareShow() {
			var me = this;
			var pic = me.refs.sharepic;
			share.msg = {
				content: me.refs.sharecontent.value
			};
			share.pic = pic;
			if (me.refs.useLink.checked) {
				share.msg.href = 'www.noteapp.com';
			};
			share.bhref = me.refs.useLink.checked ? true : false;
			share.shareShow();
		},
		sharePic: function sharePic(type) {
			var me = this;
			var pic = me.refs.sharepic;
			share.pic = pic;
			if (type == "shareGalleryPicture") {
				share.shareGalleryPicture();
				return;
			};
			if (type == "shareLogoPicture") {
				share.shareLogoPicture();
				return;
			};
			if (type == "shareCameraPicture") {
				share.shareCameraPicture();
				return;
			};
		},
		useLink: function useLink() {
			var me = this;
			if (me.refs.useLink.checked) {
				me.refs.imgTable.style.display = 'none';
			} else {
				me.refs.imgTable.style.display = 'table';
			}
		},
		backHome: function backHome(scope) {
			var me = scope;
			var pic = me.refs.sharepic;
			me.refs.sharecontent.value = "我正在使用NoteApp随手记，赶紧跟我一起来体验！";
			pic.src = 'xxx.png';
			pic.realUrl = '';

			share.pic = null;
		},

		componentDidMount: function componentDidMount() {
			var me = this;
			mui.init({
				beforeback: function beforeback() {
					me.backHome(me);
				}
			});
		},
		render: function render() {
			var _this = this;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					{ className: 'mui-bar mui-bar-nav' },
					React.createElement(
						'a',
						{ className: 'mui-action-back mui-icon  mui-pull-left backHome' },
						'返回'
					),
					React.createElement(
						'span',
						{ className: 'mui-pull-right completeNote', onClick: function () {
								return _this.shareShow();
							} },
						'分享'
					),
					React.createElement(
						'h1',
						{ className: 'mui-title' },
						'NoteApp '
					)
				),
				React.createElement(
					'div',
					{ className: 'mui-content' },
					React.createElement('br', null),
					React.createElement(
						'p',
						{ className: 'heading' },
						'分享内容：'
					),
					React.createElement(
						'textarea',
						{ ref: 'sharecontent', className: 'sharecontent', rows: '3' },
						'我正在使用NoteApp随手记，赶紧跟我一起来体验！'
					),
					React.createElement('br', null),
					React.createElement('br', null),
					React.createElement(
						'p',
						{ className: 'heading' },
						'分享图片：'
					),
					React.createElement('br', null),
					React.createElement(
						'div',
						{ onClick: function () {
								return _this.useLink();
							}, className: 'mui-input-row mui-checkbox mui-left' },
						React.createElement(
							'label',
							null,
							'使用连接'
						),
						React.createElement('input', { ref: 'useLink', name: 'checkbox', value: '', type: 'checkbox' })
					),
					React.createElement('br', null),
					React.createElement(
						'table',
						{ ref: 'imgTable', className: 'shareBtnTable' },
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									React.createElement(
										'div',
										{ className: 'button button-select', onClick: function () {
												return _this.sharePic("shareCameraPicture");
											} },
										'拍照'
									)
								),
								React.createElement(
									'td',
									null,
									React.createElement(
										'div',
										{ className: 'button button-select', onClick: function () {
												return _this.sharePic('shareGalleryPicture');
											} },
										'相册选取'
									)
								),
								React.createElement(
									'td',
									null,
									React.createElement(
										'div',
										{ className: 'button button-select', onClick: function () {
												return _this.sharePic('shareLogoPicture');
											} },
										'使用logo图'
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									{ colSpan: 3 },
									React.createElement('br', null)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									{ colSpan: 3 },
									React.createElement('img', { ref: 'sharepic', className: 'pic', src: 'xxx.png' })
								)
							)
						)
					)
				)
			);
		}
	});
	// $(function() {
	// 	ReactDOM.render(
	// 		<ShareWin />,
	// 		mui('.container')[0]
	// 	);
	// });
	mui.plusReady(function () {
		ReactDOM.render(React.createElement(ShareWin, null), mui('.container')[0]);
	});
});