define(function(require, exports, module) {
	var escaper = require('js/escaper.js');
	var ShareHelper = require('js/ShareHelper.js');
	var share = new ShareHelper();
	var $ = require('jquery');

	share.Init();
	window.ShareText = function(val) {
		var esval = unescape(val);
		esval = escaper.decodeSpc(esval);
		mui('.sharecontent')[0].value = esval;
	}
	var ShareWin = React.createClass({
		shareShow: function() {
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
		sharePic: function(type) {
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
		useLink: function() {
			var me = this;
			if (me.refs.useLink.checked) {
				me.refs.imgTable.style.display = 'none';
			} else {
				me.refs.imgTable.style.display = 'table';
			}

		},
		backHome: function(scope) {
			var me = scope;
			var pic = me.refs.sharepic;
			me.refs.sharecontent.value = "我正在使用NoteApp随手记，赶紧跟我一起来体验！";
			pic.src = 'xxx.png';
			pic.realUrl = '';

			share.pic = null;
		},
		 
		componentDidMount: function() {
			var me = this;
			mui.init({
				beforeback: function() {
					me.backHome(me);
				}
			});

		 
		},
		render: function() {
			return (
				<div>
					 <header className="mui-bar mui-bar-nav">
						<a className="mui-action-back mui-icon  mui-pull-left backHome">返回</a> 
						<span className="mui-pull-right completeNote" onClick={()=>this.shareShow()}>分享</span>						 
						<h1 className="mui-title">NoteApp </h1>
					</header>  
					<div className="mui-content">
						 <br/>
							<p className="heading">分享内容：</p>
							<textarea ref="sharecontent" className="sharecontent" rows="3">我正在使用NoteApp随手记，赶紧跟我一起来体验！</textarea>
							<br/><br/>
							<p className="heading">分享图片：</p>
							<br/>
							 <div onClick={()=>this.useLink()} className="mui-input-row mui-checkbox mui-left">
								<label>使用连接</label>
								<input ref='useLink' name="checkbox" value="" type="checkbox" />
							</div>  
							 <br/>
							<table ref='imgTable' className="shareBtnTable">
								<tbody> 
									<tr> 
										<td><div className="button button-select" onClick={()=>this.sharePic("shareCameraPicture")}>拍照</div></td>
										<td><div className="button button-select" onClick={()=>this.sharePic('shareGalleryPicture')}>相册选取</div></td>
										<td><div className="button button-select" onClick={()=>this.sharePic('shareLogoPicture')}>使用logo图</div></td>
									</tr>
									<tr><td colSpan={3}><br /></td></tr> 
									<tr>
										<td colSpan={3}><img ref="sharepic" className='pic' src="xxx.png"/></td>
									</tr>
								</tbody>
							</table> 

						
					</div> 

				
				</div>
			);
		}
	});
	// $(function() {
	// 	ReactDOM.render(
	// 		<ShareWin />,
	// 		mui('.container')[0]
	// 	);
	// });
	mui.plusReady(function() {
		ReactDOM.render(
			<ShareWin />,
			mui('.container')[0]
		);

	});
});