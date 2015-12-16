"use strict";!function($,doc){function getElementLeft(element){for(var actualLeft=element.offsetLeft,current=element.offsetParent;null!==current;)actualLeft+=current.offsetLeft,current=current.offsetParent;return actualLeft}function getElementTop(element){for(var actualTop=element.offsetTop,current=element.offsetParent;null!==current;)actualTop+=current.offsetTop,current=current.offsetParent;return actualTop}var touchSupport="ontouchstart"in document,startEventName=touchSupport?"touchstart":"mousedown",moveEventName=touchSupport?"touchmove":"mousemove",endEventName=touchSupport?"touchend":"mouseup",lockerHolderClassName=$.className("locker-holder"),lockerClassName=$.className("locker"),styleHolder=doc.querySelector("head")||doc.querySelector("body");styleHolder.innerHTML+="<style>.mui-locker-holder{overflow:hidden;position:relative;padding:0px;}.mui-locker-holder canvas{width:100%;height:100%;}</style>";var times=2,Locker=$.Locker=$.Class.extend({R:26,CW:400,CH:320,OffsetX:30,OffsetY:30,init:function(holder,options){var self=this;if(!holder)throw"构造 Locker 时缺少容器元素";self.holder=holder,options=options||{},options.callback=options.callback||options.done||$.noop,options.times=options.times||times,self.options=options,self.holder.innerHTML="<canvas></canvas>",self.holder.classList.add(lockerHolderClassName);var canvas=self.canvas=$.qsa("canvas",self.holder)[0];canvas.on=canvas.addEventListener||function(name,handler,capture){canvas.attachEvent("on"+name,handler,capture)},canvas.off=canvas.removeEventListener||function(name,handler,capture){canvas.detachEvent("on"+name,handler,capture)},self.options.width&&(self.holder.style.width=self.options.width+"px"),self.options.height&&(self.holder.style.height=self.options.height+"px"),self.CW=self.options.width||self.holder.offsetWidth||self.CW,self.CH=self.options.height||self.holder.offsetHeight||self.CH,self.R*=self.options.times,self.CW*=self.options.times,self.CH*=self.options.times,self.OffsetX*=self.options.times,self.OffsetY*=self.options.times,canvas.width=self.CW,canvas.height=self.CH;var cxt=self.cxt=canvas.getContext("2d"),X=(self.CW-2*self.OffsetX-2*self.R*3)/2,Y=(self.CH-2*self.OffsetY-2*self.R*3)/2;self.pointLocationArr=self.caculateNinePointLotion(X,Y),self.initEvent(canvas,cxt,self.holder),self.draw(cxt,self.pointLocationArr,[],null),setTimeout(function(){self.draw(cxt,self.pointLocationArr,[],null)},0)},caculateNinePointLotion:function(diffX,diffY){for(var self=this,Re=[],row=0;3>row;row++)for(var col=0;3>col;col++){var Point={X:self.OffsetX+col*diffX+(2*col+1)*self.R,Y:self.OffsetY+row*diffY+(2*row+1)*self.R};Re.push(Point)}return Re},draw:function(cxt,_PointLocationArr,_LinePointArr,touchPoint){var self=this,R=self.R;if(_LinePointArr.length>0){cxt.beginPath();for(var i=0;i<_LinePointArr.length;i++){var pointIndex=_LinePointArr[i];cxt.lineTo(_PointLocationArr[pointIndex].X,_PointLocationArr[pointIndex].Y)}if(cxt.lineWidth=(self.options.lindeWidth||2)*self.options.times,cxt.strokeStyle=self.options.lineColor||"#999",cxt.stroke(),cxt.closePath(),null!=touchPoint){var lastPointIndex=_LinePointArr[_LinePointArr.length-1],lastPoint=_PointLocationArr[lastPointIndex];cxt.beginPath(),cxt.moveTo(lastPoint.X,lastPoint.Y),cxt.lineTo(touchPoint.X,touchPoint.Y),cxt.stroke(),cxt.closePath()}}for(var i=0;i<_PointLocationArr.length;i++){var Point=_PointLocationArr[i];cxt.fillStyle=self.options.ringColor||"#888",cxt.beginPath(),cxt.arc(Point.X,Point.Y,R,0,2*Math.PI,!0),cxt.closePath(),cxt.fill(),cxt.fillStyle=self.options.fillColor||"#f3f3f3",cxt.beginPath(),cxt.arc(Point.X,Point.Y,R-(self.options.ringWidth||2)*self.options.times,0,2*Math.PI,!0),cxt.closePath(),cxt.fill(),_LinePointArr.indexOf(i)>=0&&(cxt.fillStyle=self.options.pointColor||"#777",cxt.beginPath(),cxt.arc(Point.X,Point.Y,R-(self.options.pointWidth||16)*self.options.times,0,2*Math.PI,!0),cxt.closePath(),cxt.fill())}},isPointSelect:function(touches,linePoint){for(var self=this,i=0;i<self.pointLocationArr.length;i++){var currentPoint=self.pointLocationArr[i],xdiff=Math.abs(currentPoint.X-touches.elementX),ydiff=Math.abs(currentPoint.Y-touches.elementY),dir=Math.pow(xdiff*xdiff+ydiff*ydiff,.5);if(dir<self.R){linePoint.indexOf(i)<0&&linePoint.push(i);break}}},initEvent:function(canvas,cxt,holder){var self=this,linePoint=[],isDown=!1;self._startHandler=function(e){e.point=event.changedTouches?event.changedTouches[0]:event,e.point.elementX=(e.point.pageX-getElementLeft(holder))*self.options.times,e.point.elementY=(e.point.pageY-getElementTop(holder))*self.options.times,self.isPointSelect(e.point,linePoint),isDown=!0},canvas.on(startEventName,self._startHandler,!1),self._moveHanlder=function(e){if(isDown){e.preventDefault(),e.point=event.changedTouches?event.changedTouches[0]:event,e.point.elementX=(e.point.pageX-getElementLeft(holder))*self.options.times,e.point.elementY=(e.point.pageY-getElementTop(holder))*self.options.times;var touches=e.point;self.isPointSelect(touches,linePoint),cxt.clearRect(0,0,self.CW,self.CH),self.draw(cxt,self.pointLocationArr,linePoint,{X:touches.elementX,Y:touches.elementY})}},canvas.on(moveEventName,self._moveHanlder,!1),self._endHandler=function(e){e.point=event.changedTouches?event.changedTouches[0]:event,e.point.elementX=(e.point.pageX-getElementLeft(holder))*self.options.times,e.point.elementY=(e.point.pageY-getElementTop(holder))*self.options.times,cxt.clearRect(0,0,self.CW,self.CH),self.draw(cxt,self.pointLocationArr,linePoint,null);var eventData={sender:self,points:linePoint};self.options.callback(eventData),$.trigger(self.holder,"done",eventData),linePoint=[],isDown=!1},canvas.on(endEventName,self._endHandler,!1)},pointLocationArr:[],clear:function(){var self=this;self.cxt&&(self.cxt.clearRect(0,0,self.CW,self.CH),self.draw(self.cxt,self.pointLocationArr,[],{X:0,Y:0}))},dispose:function(){var self=this;self.cxt=null,self.canvas.off(startEventName,self._startHandler),self.canvas.off(moveEventName,self._moveHandler),self.canvas.off(endEventName,self._endHandler),self.holder.innerHTML="",self.canvas=null}});$.fn.locker=function(options){return this.each(function(i,element){if(!element.locker)if(options)element.locker=new Locker(element,options);else{var optionsText=element.getAttribute("data-locker-options"),_options=optionsText?JSON.parse(optionsText):{};_options.lineColor=element.getAttribute("data-locker-line-color")||_options.lineColor,_options.ringColor=element.getAttribute("data-locker-ring-color")||_options.ringColor,_options.fillColor=element.getAttribute("data-locker-fill-color")||_options.fillColor,_options.pointColor=element.getAttribute("data-locker-point-color")||_options.pointColor,_options.width=element.getAttribute("data-locker-width")||_options.width,_options.height=element.getAttribute("data-locker-height")||_options.height,element.locker=new Locker(element,_options)}}),this[0]?this[0].locker:null};try{$("."+lockerClassName).locker()}catch(ex){}$.ready(function(){$("."+lockerClassName).locker()})}(mui,document);
//# sourceMappingURL=mui.locker.js.map