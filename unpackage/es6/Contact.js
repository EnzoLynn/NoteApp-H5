define(function(require, exports, moudle) {
	var IndexList = React.createClass({
		getInitialState:function(){
			return {
				indexes:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
			};
		},
		render: function() {
			var listDom = [];
			indexes.forEach(function(item,index){
				listDom.push(<a>item</a>);
			});
			return (
				<div className="mui-indexed-list-bar">{listDom}</div>
			);
		}
	});
	var Contact = React.createClass({
		componentDidMount: function() { 
			var header = document.querySelector('header.mui-bar');
			var list = document.getElementById('list');
			var done = document.getElementById('done');
			//calc hieght

			list.style.height = (plus.screen.resolutionHeight - header.offsetHeight - 48 - 51) + 'px';
			//create
			window.indexedList = new mui.IndexedList(list);
			//done event
			done.addEventListener('tap', function() {
				var checkboxArray = [].slice.call(list.querySelectorAll('input[type="checkbox"]'));
				var checkedValues = [];
				checkboxArray.forEach(function(box) {
					if (box.checked) {
						checkedValues.push(box.parentNode.innerText);
					}
				});
				if (checkedValues.length > 0) {
					mui.alert('你选择了: ' + checkedValues);
				} else {
					mui.alert('你没选择任何项目');
				}
			}, false);
			mui('.mui-indexed-list-inner').on('change', 'input', function() {
				var count = list.querySelectorAll('input[type="checkbox"]:checked').length;
				var value = count ? "完成(" + count + ")" : "完成";
				done.innerHTML = value;
				if (count) {
					if (done.classList.contains("mui-disabled")) {
						done.classList.remove("mui-disabled");
					}
				} else {
					if (!done.classList.contains("mui-disabled")) {
						done.classList.add("mui-disabled");
					}
				}
			});
		},
		render: function() {
			return (
				<div>
					<header className="mui-bar mui-bar-nav">
						<a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
						<h1 className="mui-title">联系人</h1>
						<a id='done' className="mui-btn mui-btn-link mui-pull-right mui-btn-blue mui-disabled">完成</a>
					</header>
					<div className="mui-content">
						<div id='list' className="mui-indexed-list">
							<div className="mui-indexed-list-search mui-input-row mui-search">
								<input type="search" className="mui-input-clear mui-indexed-list-search-input" placeholder="搜索机场"/>
							</div>
							<IndexList />
							<div className="mui-indexed-list-alert"></div>
							<div className="mui-indexed-list-inner">
								<div className="mui-indexed-list-empty-alert">没有数据</div>
								<ul className="mui-table-view">
									<li data-group="A" className="mui-table-view-divider mui-indexed-list-group">A</li>
									<li data-value="AKU" data-tags="AKeSu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />阿克苏机场</li>
									<li data-value="BPL" data-tags="ALaShanKou" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />阿拉山口机场</li>
									<li data-value="AAT" data-tags="ALeTai" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />阿勒泰机场</li>
									<li data-value="NGQ" data-tags="ALiKunSha" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />阿里昆莎机场</li>
									<li data-value="AQG" data-tags="AnQingTianZhuShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />安庆天柱山机场</li>
									<li data-value="MFM" data-tags="AoMenGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />澳门国际机场</li>
									<li data-group="B" className="mui-table-view-divider mui-indexed-list-group">B</li>
									<li data-value="BSD" data-tags="BaoShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />保山机场</li>
									<li data-value="BAV" data-tags="BaoTou" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />包头机场</li>
									<li data-value="BHY" data-tags="BeiHaiFuCheng" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />北海福成机场</li>
									<li data-value="NAY" data-tags="BeiJingNanYuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />北京南苑机场</li>
									<li data-value="PEK" data-tags="BeiJingShouDuGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />北京首都国际机场</li>
									<li data-group="C" className="mui-table-view-divider mui-indexed-list-group">C</li>
									<li data-value="NBS" data-tags="ChangBaiShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />长白山机场</li>
									<li data-value="CGQ" data-tags="ChangChunLongJiaGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />长春龙嘉国际机场</li>
									<li data-value="CGD" data-tags="ChangDeTaoHuaYuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />常德桃花源机场</li>
									<li data-value="BPX" data-tags="ChangDuBangDa" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />昌都邦达机场</li>
									<li data-value="CSX" data-tags="ChangShaHuangHuaGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />长沙黄花国际机场</li>
									<li data-value="CIH" data-tags="ChangZhiWangCun" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />长治王村机场</li>
									<li data-value="CZX" data-tags="ChangZhouBenNiu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />常州奔牛机场</li>
									<li data-value="CTU" data-tags="ChengDuShuangLiuGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />成都双流国际机场</li>
									<li data-value="CIF" data-tags="ChiFeng" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />赤峰机场</li>
									<li data-group="D" className="mui-table-view-divider mui-indexed-list-group">D</li>
									<li data-value="DLU" data-tags="DaLi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />大理机场</li>
									<li data-value="DLC" data-tags="DaLianZhouShuiZiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />大连周水子国际机场</li>
									<li data-value="DQA" data-tags="DaQingSaErTu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />大庆萨尔图机场</li>
									<li data-value="DAT" data-tags="DaTongDongWangZhuang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />大同东王庄机场</li>
									<li data-value="DAX" data-tags="DaZhouHeShi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />达州河市机场</li>
									<li data-value="DDG" data-tags="DanDongLangTou" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />丹东浪头机场</li>
									<li data-value="LUM" data-tags="DeHongMangShi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />德宏芒市机场</li>
									<li data-value="DIG" data-tags="DiQingXiangGeLiLa" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />迪庆香格里拉机场</li>
									<li data-value="DOY" data-tags="DongYing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />东营机场</li>
									<li data-value="DNH" data-tags="DunHuang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />敦煌机场</li>
									<li data-group="E" className="mui-table-view-divider mui-indexed-list-group">E</li>
									<li data-value="DSN" data-tags="EErDuoSi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />鄂尔多斯机场</li>
									<li data-value="ENH" data-tags="EnShiXuJiaPing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />恩施许家坪机场</li>
									<li data-value="ERL" data-tags="ErLianHaoTeSaiWuSuGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />二连浩特赛乌苏国际机场</li>
									<li data-group="F" className="mui-table-view-divider mui-indexed-list-group">F</li>
									<li data-value="FUG" data-tags="FuYangXiGuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />阜阳西关机场</li>
									<li data-value="FOC" data-tags="FuZhouChangLeGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />福州长乐国际机场</li>
									<li data-group="G" className="mui-table-view-divider mui-indexed-list-group">G</li>
									<li data-value="KOW" data-tags="GanZhouHuangJin" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />赣州黄金机场</li>
									<li data-value="GOQ" data-tags="GeErMu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />格尔木机场</li>
									<li data-value="GYU" data-tags="GuYuanLiuPanShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />固原六盘山机场</li>
									<li data-value="GYS" data-tags="GuangYuanPanLong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />广元盘龙机场</li>
									<li data-value="CAN" data-tags="GuangZhouBaiYunGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />广州白云国际机场</li>
									<li data-value="KWL" data-tags="GuiLinLiangJiangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />桂林两江国际机场</li>
									<li data-value="KWE" data-tags="GuiYangLongDongBaoGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />贵阳龙洞堡国际机场</li>
									<li data-group="H" className="mui-table-view-divider mui-indexed-list-group">H</li>
									<li data-value="HRB" data-tags="HaErBinTaiPingGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />哈尔滨太平国际机场</li>
									<li data-value="HMI" data-tags="HaMi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />哈密机场</li>
									<li data-value="HAK" data-tags="HaiKouMeiLanGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />海口美兰国际机场</li>
									<li data-value="HLD" data-tags="HaiLaErDongShanGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />海拉尔东山国际机场</li>
									<li data-value="HDG" data-tags="HanDan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />邯郸机场</li>
									<li data-value="HZG" data-tags="HanZhong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />汉中机场</li>
									<li data-value="HGH" data-tags="HangZhouXiaoShanGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />杭州萧山国际机场</li>
									<li data-value="HFE" data-tags="HeFeiLuoGangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />合肥骆岗国际机场</li>
									<li data-value="HTN" data-tags="HeTian" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />和田机场</li>
									<li data-value="HEK" data-tags="HeiHe" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />黑河机场</li>
									<li data-value="HET" data-tags="HuHeHaoTeBaiTaGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />呼和浩特白塔国际机场</li>
									<li data-value="HIA" data-tags="HuaiAnLianShui" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />淮安涟水机场</li>
									<li data-value="TXN" data-tags="HuangShanTunXiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />黄山屯溪国际机场</li>
									<li data-group="J" className="mui-table-view-divider mui-indexed-list-group">J</li>
									<li data-value="TNA" data-tags="JiNanYaoQiangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />济南遥墙国际机场</li>
									<li data-value="JNG" data-tags="JiNingQuFu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />济宁曲阜机场</li>
									<li data-value="JXA" data-tags="JiXiXingKaiHu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />鸡西兴凯湖机场</li>
									<li data-value="JMU" data-tags="JiaMuSiDongJiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />佳木斯东郊机场</li>
									<li data-value="JGN" data-tags="JiaYuGuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />嘉峪关机场</li>
									<li data-value="JNZ" data-tags="JinZhouXiaoLingZi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />锦州小岭子机场</li>
									<li data-value="JDZ" data-tags="JingDeZhen" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />景德镇机场</li>
									<li data-value="JGS" data-tags="JingGangShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />井冈山机场</li>
									<li data-value="JIU" data-tags="JiuJiangLuShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />九江庐山机场</li>
									<li data-value="JZH" data-tags="JiuZhaiHuangLong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />九寨黄龙机场</li>
									<li data-group="K" className="mui-table-view-divider mui-indexed-list-group">K</li>
									<li data-value="KHG" data-tags="KaShi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />喀什机场</li>
									<li data-value="KRY" data-tags="KeLaMaYi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />克拉玛依机场</li>
									<li data-value="KCA" data-tags="KuCheGuiZi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />库车龟兹机场</li>
									<li data-value="KRL" data-tags="KuErLe" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />库尔勒机场</li>
									<li data-value="KMG" data-tags="KunMingWuJiaBaGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />昆明巫家坝国际机场</li>
									<li data-group="L" className="mui-table-view-divider mui-indexed-list-group">L</li>
									<li data-value="LXA" data-tags="LaSaGongGa" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />拉萨贡嘎机场</li>
									<li data-value="LHW" data-tags="LanZhouZhongChuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />兰州中川机场</li>
									<li data-value="LJG" data-tags="LiJiangSanYi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />丽江三义机场</li>
									<li data-value="HZH" data-tags="LiPing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />黎平机场</li>
									<li data-value="LYG" data-tags="LianYunGangBaiTaBu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />连云港白塔埠机场</li>
									<li data-value="LNJ" data-tags="LinCang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />临沧机场</li>
									<li data-value="LYI" data-tags="LinYi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />临沂机场</li>
									<li data-value="LZY" data-tags="LinZhiMiLin" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />林芝米林机场</li>
									<li data-value="LZH" data-tags="LiuZhouBaiLian" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />柳州白莲机场</li>
									<li data-value="LCX" data-tags="LongYanGuanZhiShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />龙岩冠豸山机场</li>
									<li data-value="LZO" data-tags="LuZhouLanTian" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />泸州蓝田机场</li>
									<li data-value="LYA" data-tags="LuoYangBeiJiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />洛阳北郊机场</li>
									<li data-group="M" className="mui-table-view-divider mui-indexed-list-group">M</li>
									<li data-value="NZH" data-tags="ManZhouLiXiJiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />满洲里西郊机场</li>
									<li data-value="MIG" data-tags="MianYangNanJiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />绵阳南郊机场</li>
									<li data-value="OHE" data-tags="MoHeGuLian" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />漠河古莲机场</li>
									<li data-value="MDG" data-tags="MuDanJiangHaiLang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />牡丹江海浪机场</li>
									<li data-group="N" className="mui-table-view-divider mui-indexed-list-group">N</li>
									<li data-value="KHN" data-tags="NanChangChangBeiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南昌昌北国际机场</li>
									<li data-value="NAO" data-tags="NanChongGaoPing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南充高坪机场</li>
									<li data-value="NKG" data-tags="NanJingLuKouGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南京禄口国际机场</li>
									<li data-value="NNG" data-tags="NanNingWuXu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南宁吴圩机场</li>
									<li data-value="NTG" data-tags="NanTongXingDong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南通兴东机场</li>
									<li data-value="NNY" data-tags="NanYangJiangYing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />南阳姜营机场</li>
									<li data-value="NGB" data-tags="NingBoLiSheGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />宁波栎社国际机场</li>
									<li data-group="P" className="mui-table-view-divider mui-indexed-list-group">P</li>
									<li data-value="SYM" data-tags="PuErSiMao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />普洱思茅机场</li>
									<li data-group="Q" className="mui-table-view-divider mui-indexed-list-group">Q</li>
									<li data-value="NDG" data-tags="QiQiHaErSanJiaZi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />齐齐哈尔三家子机场</li>
									<li data-value="SHP" data-tags="QinHuangDaoShanHaiGuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />秦皇岛山海关机场</li>
									<li data-value="TAO" data-tags="QingDaoLiuTingGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />青岛流亭国际机场</li>
									<li data-value="JUZ" data-tags="QuZhou" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />衢州机场</li>
									<li data-value="JJN" data-tags="QuanZhouJinJiang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />泉州晋江机场</li>
									<li data-group="R" className="mui-table-view-divider mui-indexed-list-group">R</li>
									<li data-value="RKZ" data-tags="RiKaZeHePing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />日喀则和平机场</li>
									<li data-group="S" className="mui-table-view-divider mui-indexed-list-group">S</li>
									<li data-value="SYX" data-tags="SanYaFengHuangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />三亚凤凰国际机场</li>
									<li data-value="SWA" data-tags="ShanTouWaiSha" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />汕头外砂机场</li>
									<li data-value="SHA" data-tags="ShangHaiHongQiaoGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />上海虹桥国际机场</li>
									<li data-value="PVG" data-tags="ShangHaiPuDongGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />上海浦东国际机场</li>
									<li data-value="SZX" data-tags="ShenChouBaoAnGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />深圳宝安国际机场</li>
									<li data-value="SHE" data-tags="ShenYangTaoXianGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />沈阳桃仙国际机场</li>
									<li data-value="SJW" data-tags="ShiJiaZhuangZhengDingGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />石家庄正定国际机场</li>
									<li data-value="WUX" data-tags="SuNanShuoFangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />苏南硕放国际机场</li>
									<li data-group="T" className="mui-table-view-divider mui-indexed-list-group">T</li>
									<li data-value="TCG" data-tags="TaCheng" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />塔城机场</li>
									<li data-value="TYN" data-tags="TaiYuanWuSuGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />太原武宿国际机场</li>
									<li data-value="HYN" data-tags="TaiZhouLuQiao-HuangYanJiChang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />台州路桥机场 (黄岩机场)</li>
									<li data-value="TVS" data-tags="TangShanSanNvHe" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />唐山三女河机场</li>
									<li data-value="TCZ" data-tags="TengChongTuoFeng" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />腾冲驼峰机场</li>
									<li data-value="TSN" data-tags="TianJinBinHaiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />天津滨海国际机场</li>
									<li data-value="TGO" data-tags="TongLiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />通辽机场</li>
									<li data-value="TEN" data-tags="TongRenFengHuang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />铜仁凤凰机场</li>
									<li data-group="W" className="mui-table-view-divider mui-indexed-list-group">W</li>
									<li data-value="WXN" data-tags="WanZhouWuQiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />万州五桥机场</li>
									<li data-value="WEF" data-tags="WeiFang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />潍坊机场</li>
									<li data-value="WEH" data-tags="WeiHaiDaShuiBo" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />威海大水泊机场</li>
									<li data-value="WNH" data-tags="WenShanPuZheHei" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />文山普者黑机场</li>
									<li data-value="WNZ" data-tags="WenZhouYongQiangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />温州永强国际机场</li>
									<li data-value="WUA" data-tags="WuHai" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />乌海机场</li>
									<li data-value="WUH" data-tags="WuHanTianHeGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />武汉天河国际机场</li>
									<li data-value="HLH" data-tags="WuLanHaoTe" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />乌兰浩特机场</li>
									<li data-value="URC" data-tags="WuLuMuQiDiWoBaoGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />乌鲁木齐地窝堡国际机场</li>
									<li data-value="WUS" data-tags="WuYiShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />武夷山机场</li>
									<li data-value="WUZ" data-tags="WuZhouChangZhouDao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />梧州长洲岛机场</li>
									<li data-group="X" className="mui-table-view-divider mui-indexed-list-group">X</li>
									<li data-value="XIY" data-tags="XiAnXianYangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />西安咸阳国际机场</li>
									<li data-value="XIC" data-tags="XiChangQingShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />西昌青山机场</li>
									<li data-value="XIL" data-tags="XiLinHaoTe" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />锡林浩特机场</li>
									<li data-value="XNN" data-tags="XiNingCaoJiaBao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />西宁曹家堡机场</li>
									<li data-value="JHG" data-tags="XiShuangBanNaGaSa" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />西双版纳嘎洒机场</li>
									<li data-value="XMN" data-tags="XiaMenGaoQiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />厦门高崎国际机场</li>
									<li data-value="HKG" data-tags="XiangGangGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />香港国际机场</li>
									<li data-value="XFN" data-tags="XiangYangLiuJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />襄阳刘集机场</li>
									<li data-value="ACX" data-tags="XingYi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />兴义机场</li>
									<li data-value="XUZ" data-tags="XuZhouGuanYin" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />徐州观音机场</li>
									<li data-group="Y" className="mui-table-view-divider mui-indexed-list-group">Y</li>
									<li data-value="ENY" data-tags="YanAnErShiLiBao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />延安二十里堡机场</li>
									<li data-value="YNZ" data-tags="YanCheng" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />盐城机场</li>
									<li data-value="YNJ" data-tags="YanJiChaoYangChuan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />延吉朝阳川机场</li>
									<li data-value="YNT" data-tags="YanTaiLaiShanGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />烟台莱山国际机场</li>
									<li data-value="YBP" data-tags="YiBinCaiBa" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />宜宾菜坝机场</li>
									<li data-value="YIH" data-tags="YiChangSanXia" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />宜昌三峡机场</li>
									<li data-value="LDS" data-tags="YiChunLinDu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />伊春林都机场</li>
									<li data-value="YIN" data-tags="YiNing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />伊宁机场</li>
									<li data-value="YIW" data-tags="YiWu" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />义乌机场</li>
									<li data-value="INC" data-tags="YinChuanHeDong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />银川河东机场</li>
									<li data-value="LLF" data-tags="YongZhouLingLing" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />永州零陵机场</li>
									<li data-value="UYN" data-tags="YuLinYuYang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />榆林榆阳机场</li>
									<li data-value="YUS" data-tags="YuShuBaTang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />玉树巴塘机场</li>
									<li data-value="YCU" data-tags="YunChengZhangXiao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />运城张孝机场</li>
									<li data-group="Z" className="mui-table-view-divider mui-indexed-list-group">Z</li>
									<li data-value="ZHA" data-tags="ZhanJiang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />湛江机场</li>
									<li data-value="ZAT" data-tags="ZhaoTong" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />昭通机场</li>
									<li data-value="CGO" data-tags="ZhengZhouXinZhengGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />郑州新郑国际机场</li>
									<li data-value="HJJ" data-tags="ZhiJiang" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />芷江机场</li>
									<li data-value="CKG" data-tags="ZhongQingJiangBeiGuoJi" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />重庆江北国际机场</li>
									<li data-value="ZHY" data-tags="ZhongWeiXiangShan" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />中卫香山机场</li>
									<li data-value="HSN" data-tags="ZhouShanZhuJiaJian" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />舟山朱家尖机场</li>
									<li data-value="ZUH" data-tags="ZhuHaiSanZao" className="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left">
										<input type="checkbox" />珠海三灶机场</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});
	
	mui.plusReady(function() {
 
		ReactDOM.render(
			<Contact />,
			mui('.container')[0]
		);

	});
});