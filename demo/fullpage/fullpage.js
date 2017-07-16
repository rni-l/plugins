/*
	params:{oMain , oWrap , oSection}
*/
function fullpage(params){
	//对象，参数
	this.oMain = document.querySelector(params.oMain);
	this.oWrap = this.oMain.querySelector('.fullpage_wrap');
	this.aSection = Array.prototype.slice.call(this.oMain.querySelectorAll('.fullpage_section'));
	this.oPage = this.oMain.querySelector('.fullpage_paging');
	this.aPages = false;
	//next and prev btn
	this.oNext = params.oNext || false;
	this.oPrev = params.oPrev || false;
	this.opt = {
		pageHeight:document.documentElement.clientHeight,//单页的高度
		index:0,//第几页
		len:this.aSection.length,//总长度
		firstTouch:0,//移动端点击的位置
		lastTouch:0,
		isMove: true,//是否移动
		speed:params.speed || 20,
		touchDis:params.touchDis || 50,
		class:params.activeclass || 'active',
		oldHeight:0//当前的高度
	};
	this.showData = params.showData || document;
	//回调函数
	this.callback = params.callback;
	this.endcallback = params.endcallback;
}
fullpage.prototype={
	init:function(){
		var _this = this,
			opt = this.opt;
		this.addMousewheel();
		//添加事件
		addWheelListener(this.oMain , function(e){
			//pc滚轮事件
			if(e.deltaY > 0){
				//向下
				_this.next();
			}else if(e.deltaY < 0){
				//向上
				_this.prev();
			}
		})
		this.addMoveFun();
		if(this.oPage){
			this.createPage();
			this.aSection[0].className = 'fullpage_section '+this.opt.class
			this.aPages[0].className = this.opt.class;
		}
		if(this.oNext){
			this.addNextBtnFun();	
		}
		if(this.oPrev){
			this.addPrevBtnFun();
		}
	},
	createPage:function(){
		//创建分页按钮
		var str = '<ul>';
		for(var i=0,len=this.opt.len;i<len;i++){
			str += '<li key="'+i+'"></li>';
		}
		str += '</ul>';

		this.oPage.innerHTML = str;
		this.aPages = Array.prototype.slice.call(this.oMain.querySelectorAll('.fullpage_paging li'));
		//添加事件
		this.oPage.addEventListener('click', this.pageFun.bind(this), false);
	},
	pageFun:function(e){
		var tar = e.target,
			index = this.opt.index,
			oldIndex = index;
		if(tar.nodeName === 'LI'){
			//判断是up还是down
			var i = parseInt(tar.getAttribute('key')),
				dire;
			if(i > index){
				dire = 'down';
			}else if(i < index){
				dire = 'up';
			}else{
				return false;
			}
			this.opt.index = i;
			//go
			this.move({
				el:this.oWrap,
				show:this.showData,
				moveIndex:Math.abs(i - index),
				direction:dire,
				oldIndex:oldIndex
			})
		}
	},
	addMoveFun:function(){
		//添加鼠标或手指事件
		var opt = this.opt,
			_this = this;
		//移动端
		this.oMain.addEventListener('mousedown', function(e){
			opt.isTouch = true;
			opt.firstTouch = e.clientY;
		}, false)
		this.oMain.addEventListener('mousemove', function(e){
			e.preventDefault();
		}, false);
		this.oMain.addEventListener('mouseup', _e.bind(this), false)

		this.oMain.addEventListener('touchstart', function(e){
			opt.isTouch = true;
			opt.firstTouch = e.changedTouches[0].clientY;
		}, false);
		this.oMain.addEventListener('touchmove', function(e){
			e.preventDefault();
		}, false);
		this.oMain.addEventListener('touchend', _e.bind(this), false)
		function _e(e){
			if(!opt.isTouch){
				return false;
			}
			var _e = e.changedTouches ? e.changedTouches[0] : e
			opt.isTouch = false;
			opt.lastTouch = _e.clientY;
			if(opt.lastTouch - opt.firstTouch < -opt.touchDis){
				//向下
				this.next();
			}else if(opt.lastTouch - opt.firstTouch > opt.touchDis){
				//向上
				this.prev();
			}
		}
	},
	addNextBtnFun:function(){
		var _this = this;
		console.log(this.oNext)
		//如果有添加next按钮，增加事件
		if(Array.isArray(this.oNext)){
			//如果是多个按钮，给予多个事件
			this.oNext.forEach( function(el, index) {
				el.addEventListener('click', _this.next.bind(_this) , false);
			});
		}else{
			this.oNext.addEventListener('click', _this.next.bind(_this) , false);
		}
	},
	addPrevBtnFun:function(){
		var _this = this;
		//如果有添加prev按钮，增加事件
		if(Array.isArray(this.oPrev)){
			//如果是多个按钮，给予多个事件
			this.oPrev.forEach( function(el, index) {
				el.addEventListener('click', _this.prev.bind(_this)  , false);
			});
		}else{
			this.oPrev.addEventListener('click', _this.prev.bind(_this) , false);
		}
	},
	next:function(){
		var _this = this,
			opt = this.opt,
			oldIndex = opt.index;
		if(!opt.isMove || (opt.index + 1) >= opt.len){
			//判断是否可以移动或者是否最后一页
			return false;
		}
		opt.index++;
		if(opt.index >= opt.len){
			opt.index = opt.len - 1;
		}
		this.move({
			el:this.oWrap,
			show:this.showData,
			moveIndex:1,
			direction:'down',
			oldIndex:oldIndex
		})
	},
	prev:function (){
		var _this = this,
			opt = this.opt,
			oldIndex = opt.index;
		if(!opt.isMove || (opt.index - 1) < 0){
			//判断是否可以移动或者是否第一页
			return false;
		}
		opt.index--;
		if(opt.index < 0){
			opt.index = 0;
		}
		this.move({
			el:this.oWrap,
			show:this.showData,
			moveIndex:1,
			direction:'up',
			oldIndex:oldIndex
		})
	},
	move:function(opt){
		var opts = this.opt,
			_this = this,
			moveHeight = opts.pageHeight*opt.moveIndex,//要移动的高度高度
			oldHeight = opts.oldHeight,//滚动前的高度
			speedr = false,
			distance = 0,
			_distance = 0;//累加的距离
		//速度
		var speedNum = moveHeight / opts.speed,
			speed = opt.direction === 'down' ? speedNum : -speedNum;//速度
		//动画准备开始，禁止再次触发移动
		opts.isMove = false;
		//动作开始前的回调
		this.callback && this.callback(opts.index);
		this.addClass(opt.oldIndex);
		function _move(){
			if(speedr){return false;}
			distance += speed;//累积的距离（带正负）
			_distance += speedNum;//累积的距离
			//达到目标值，停止
			if(_distance >= moveHeight){
				speedr = true;
				var _dis = (oldHeight + (opt.direction === 'down' ? moveHeight : -moveHeight));
				//将值达到目标值
				_this.addWebkit(opt.el ,  'translateY(' + -_dis +'px)')
				opts.isMove = true;
				_this.opt.oldHeight = _dis;
				//动作完成后的回调
				_this.endcallback && _this.endcallback(opts.index)
			}else{
				//还没达到目标值，继续加
				_this.addWebkit(opt.el , 'translateY(' + -(oldHeight + distance) +'px)')
			}
			requestAnimationFrame(_move);
		};
		_move();
	},
	addClass:function(old){
		//添加class
		this.aSection[old].className = 'fullpage_section';
		this.aSection[this.opt.index].className = 'fullpage_section '+this.opt.class;
		if(this.oPage){
			this.aPages[old].className = '';
			this.aPages[this.opt.index].className = this.opt.class;
		}
	},
	addWebkit:function(obj , data){
		var arr = ['Webkit','-ms-',''];
		arr.forEach(function(v){
			obj.style[v+'Transform'] = data;
		})
	},
	addMousewheel:function(){
		//添加全局滚动事件,addWheelListener(el,callback)
    (function(window,document) {

      var prefix = "", _addEventListener, onwheel, support;
      // detect event model
      if ( window.addEventListener ) {
          _addEventListener = "addEventListener";
      } else {
          _addEventListener = "attachEvent";
          prefix = "on";
      }
      // detect available wheel event
      support = "onwheel" in document.createElement("div") ? "wheel" : // 各个厂商的高版本浏览器都支持"wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit 和 IE一定支持"mousewheel"
                "DOMMouseScroll"; // 低版本firefox

      window.addWheelListener = function( elem, callback, useCapture ) {
          _addWheelListener( elem, support, callback, useCapture );

          // handle MozMousePixelScroll in older Firefox
          if( support == "DOMMouseScroll" ) {
              _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
          }
      };

    	function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[_addEventListener]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            // create a normalized event object
            var event = {
                // keep a ref to the original event object
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                deltaZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
            
            // calculate deltaY (and deltaX) according to the event
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                // Webkit also support wheelDeltaX
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }

            // it's time to fire the callback
            return callback( event );

        }, useCapture || false );
      }
    })(window,document);
	}
}
