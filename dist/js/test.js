"use strict";define(function(require,exports,module){var IndexDBHelper=require("js/IndexDBHelper.js");mui.plusReady(function(){ReactDOM.render(React.createElement(ListSubPage,null),mui(".subpageContainer")[0])});var dbHelper,ListSubPage=(React.createClass({displayName:"Row",del:function(id){this.props.del(id)},render:function(){var _this=this;return React.createElement("li",{onClick:function(){return _this.del(_this.props.note.id)}},this.props.note.id,this.props.note.content)}}),React.createClass({displayName:"ListSubPage",componentDidMount:function(){var me=this;dbHelper=new IndexDBHelper,dbHelper.openDatabase("test","table1",!1,function(omes){omes.success&&dbHelper.find("table1",!1,!1,function(mes){mes.success&&me.setState({list:mes.result})})})},add:function(){var me=this;dbHelper.add("table1",[{content:"1111"}],function(ames){ames.success&&dbHelper.find("table1",!1,!1,function(mes){mes.success&&me.setState({list:mes.result})})})},delt:function(id){var me=this;dbHelper.deleteById("table1",id,function(mes){mes.success&&me.setState({list:mes.result})})},getInitialState:function(){return{list:[]}},render:function(){var me=this,notes=[];return this.state.list.forEach(function(note,index){notes.push(React.createElement("li",{onClick:function(){return me.delt(note.id)}},note.id,note.content))}),React.createElement("div",null,React.createElement("div",{id:"pullrefresh",className:"mui-content mui-scroll-wrapper"},React.createElement("div",{className:"mui-scroll"},React.createElement("ul",{className:"mui-table-view"},React.createElement("li",{onClick:this.add},"++++++"),notes))))}}))});
//# sourceMappingURL=test.js.map