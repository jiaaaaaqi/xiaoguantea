var Dmet = {};
Dmet.alertBox = function(obj,pos){
	this.left = (typeof pos.left == 'undefined')?'':pos.left;
	this.right = (typeof pos.right == 'undefined')?'':pos.right;
	this.top = (typeof pos.top == 'undefined')?'':pos.top;
	this.bottom = (typeof pos.bottom == 'undefined')?'':pos.bottom;
	this.animit = pos.animit||false;
	this.lock = pos.lock||false;
	this.setBody();
	this.creatMask();
	obj.style.display = 'block';
	this.setPos(obj);
	var that = this;
	addEvent(window,'resize',function(){
		that.setPos(obj)
	})
}


Dmet.alertBox.prototype={
	setBody:function(){
		if((window.ActiveXObject && !window.XMLHttpRequest) && (css(document.body,'backgroundAttachment') !== "fixed") && (css(document.body,'backgroundImage') === "none")){
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundImage = "url(about:blank)";
			document.body.style.backgroundAttachment = "fixed";
		}
	},
	creatMask:function(){
		/*遮罩*/
		if(this.lock){
			this.mask = document.createElement("div");
			var frame = document.createElement("iframe")
			frame.style.filter = 'alpha(opacity=0)';
			frame.style.opacity = 0;
			frame.style.width='100%';
			frame.style.height = '100%';
			if(this.animit){
				this.mask.style.cssText = 'width:100%;height:100%;background:black;filter:alpha(opacity=10);opacity:0.1;position:fixed;top:0;left:0;_position:absolute;_top:expression((document).documentElement.scrollTop);_height:expression((document).documentElement.clientHeight);z-index:99';
			}else{
				this.mask.style.cssText = 'width:100%;height:100%;background:black;filter:alpha(opacity=50);opacity:0.5;position:fixed;top:0;left:0;_position:absolute;_top:expression((document).documentElement.scrollTop);_height:expression((document).documentElement.clientHeight);z-index:99';
			}
			this.mask.appendChild(frame);
			document.body.appendChild(this.mask);
			/*遮罩*/
			if(this.animit){
				startMove(this.mask,{opacity:50})
			}
			document.onkeypress = function(ev){
				var oEvent = ev || event;
				if(oEvent.keyCode  == 13){
					return false;
				}
			}
		}
	},
	setPos:function(obj){	
		var dom = '(document.documentElement || document.body)';
		if(obj){
			/*垂直居中*/
			if(this.top == 'middle'){
				if(window.ActiveXObject && !window.XMLHttpRequest){
					obj.style.setExpression('top', dom + '.scrollTop+'+(eval(dom).clientHeight-obj.offsetHeight)/2);
				}else{
					obj.style.marginTop = 0+'px';
					obj.style.top = '50%';
					obj.style.marginTop = -(obj.offsetHeight)/2+'px'
				}
			}else{//自设距离高
				if(this.top!==''){
					if(window.ActiveXObject && !window.XMLHttpRequest){
					obj.style.setExpression('top', dom + '.scrollTop+'+this.top);
					}else{			
						obj.style.top = this.top+'px';			
					}
				}			
			}
			/*水平居住*/
			
			if(this.left == 'center'){		
				obj.style.left = '50%';
				obj.style.marginLeft = -(obj.offsetWidth)/2+'px'			
			}else{			
				if(this.left!==''){//自设距离左
					obj.style.marginLeft = 0+'px';
					obj.style.left = this.left+'px';
				}
			}
		
			/*right*/
			if(this.right !==''){
				obj.style.marginLeft = 0+'px';
				//obj.style.left = 'auto';			
				obj.style.right = this.right+'px';
			}

			/*bottom*/
			if(this.bottom !==''){
				//obj.style.top = 'none';
				document.title = this.bottom
				if(window.ActiveXObject && !window.XMLHttpRequest){
					obj.style.setExpression('top', dom + '.scrollTop+'+(eval(dom).clientHeight-obj.offsetHeight-this.bottom));
				}else{			
					obj.style.bottom = this.bottom+'px';			
				}
			}
		}
	},
	/*关闭*/
	closeMask:function(obj){
		var that = this;
		if(this.mask){
			if(this.animit){
				startMove(this.mask,{opacity:0},function(){
					document.body.removeChild(that.mask);
					that.mask = null;
				})
			}else{
				document.body.removeChild(this.mask);
				this.mask = null;
			}
			document.onkeypress = function(){
				return true;
			}
		}		
		obj.style.display = 'none';		
		if(window.ActiveXObject && !window.XMLHttpRequest){
			obj.style.removeExpression('top');
			obj.style.removeExpression('left');
		}
	}
}

/*获取设置样式*/
function css(obj,attr,value){
	if(arguments.length === 2){		
		if(typeof attr === 'string'){
			if(attr == 'float'){
				if(-[1,]){
					attr = 'cssFloat';
				}else{
					attr = 'styleFloat';
				}
			}
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			}
		}else{
			for(var key in attr){
				obj.style[key] = attr[key];
				if(key == 'float'){
					if(-[1,]){
						key = 'cssFloat';
						obj.style[key] = attr['float'];
					}else{
						key = 'styleFloat';
						obj.style[key] = attr['float'];
					}
				}
			}	
		}
	}else if(arguments.length === 3){
		if(attr == 'float'){
			if(-[1,]){
				attr = 'cssFloat';
			}else{
				attr = 'styleFloat';
			}
		}
		obj.style[attr] = value;
	}
}

/*绑定事件*/
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,function (ev){
			var rtn=fn.call(obj);			
			if(rtn==false)
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			}
		},false);
	}else{
		obj.attachEvent('on'+type,function (){
			var rtn=fn.call(obj);
			
			if(rtn==false)
			{
				event.cancelBubble=true;
				return false;
			}
		})
	}
}

function Q(arg){
	this.aElements = [];
	switch (typeof arg){
		case 'string':
			switch(arg.charAt(0)){
				case '#':
					if(/\s/.test(arg)){
						var aArg = arg.split(' ');
						this.aElements = getEle(aArg[0],aArg[1]);
					}else{
						this.aElements.push(document.getElementById(arg.substring(1)));
					}
					break;
			}
			break;
		case 'function':
			addEvent(window,'load',arg);
			break;
	}

	return this.aElements;
}

function getEle(f,s){
	var result = [];
	var elements = null;
	if(s.charAt(0) == '.'){
		if(typeof f === 'string'){
			elements = document.getElementById(f.substring(1)).getElementsByTagName('*');
		}else if(typeof f === 'object'){
			elements = f.getElementsByTagName('*');
		}
		for(var i=0;i<elements.length;i++){
			if(/\s/.test(elements[i].className)){
				var names = elements[i].className.split(' ');
				if(strComper(s.substring(1),names)){
					result.push(elements[i]);
				}
			}else{
				if(elements[i].className == s.substring(1)){
					result.push(elements[i]);
				}
			}
		}
	}else{
		if(typeof f === 'string'){
			result = document.getElementById(f.substring(1)).getElementsByTagName(s);
		}else if(typeof f === 'object'){
			result = f.getElementsByTagName(s);
		}
	}
	return result;
}


function strComper(a,b){
	for(var i=0;i<b.length;i++){
		if(a == b[i]){
			return true;
			break;
		}
	}
}
/*运动*/
function startMove(obj, oTargets, fnCallBack){
	if(obj.timer){clearInterval(obj.timer);}
	obj.timer=setInterval(function (){
		doMove(obj, oTargets, fnCallBack);
	}, 30);
}

function stopMove(obj){
	if(obj.timer){clearInterval(obj.timer);}
}

function doMove(obj, oTargets, fnCallBack){
	var iCur=0;
	var attr='';
	var bStop=true;	//这一次运动，是否停止了
	for(attr in oTargets){
		if(attr=='opacity'){
			iCur=parseInt(parseFloat(css(obj, 'opacity'))*100);
		}else{
			iCur=parseInt(css(obj, attr));
		}
		
		if(isNaN(iCur)){iCur=0;}
		var iSpeed=(oTargets[attr]-iCur)/9;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		iCur+=iSpeed

		if(oTargets[attr]!=iCur){bStop=false;}
		if(attr=='opacity'){
			obj.style.filter='alpha(opacity:'+iCur+')';
			obj.style.opacity=iCur/100;
		}else{
			obj.style[attr]=iCur+'px';
		}
	}
	
	if(bStop){
		clearInterval(obj.timer);
		obj.timer=null;
		if(fnCallBack){fnCallBack();}
	}
}

/*运动end*/
/*domready*/
Q.domfn = [];
Q.isReady = false;
Q.ready = function(fn){
	Q.initReady();
	for(var i=0,length = arguments.length;i<length;i++){
		if(Q.isReady){
			arguments[i]();
		}else{
			Q.domfn.push(arguments[i]);
		}
	}
}
Q.fireReady = function(){
	if(Q.isReady){return;};
	Q.isReady = true;
	for(var i=0,length = Q.domfn.length;i<length;i++){
		var fn = Q.domfn[i];
		fn();
	}
	Q.domfn.length = 0;
}
Q.initReady = function(){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			document.removeEventListener('DOMContentLoaded',arguments.callee,false)
			Q.fireReady();
		},false)
	}else{
		document.write('<script id="ie_ready" defer="defer" src="//:"></script>');
		var script = document.getElementById('ie_ready');
		script.onreadystatechange = function(){
			if(this.readyState === 'complete'){
				Q.fireReady();
				this.onreadystatechange = null;
				this.parentNode.removeChild(this);
			}
		}
	}
} 
