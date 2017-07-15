//瀑布流效果
function Waterfallsflow(opts){
	//默认配置
	this._default = {
		mW:15,
		mH:15,
		levelNum:5
	}
	this.oBox = $(opts.box)
	this.aList = $(opts.aList,this.oBox)//列表
	this.boxW = null//总宽
	this.levelNum = opts.levelNum || this._default.levelNum//每列有多少个
	this.length = null//列表数量
	this.mW = opts.mW ||  this._default.mW//水平边距
	this.mH = opts.mH ||  this._default.mH//垂直边距
	this.listWidth = 0//每个列表的宽度
	this.arrLeft = []
	this.arrTop = []
	this.$img = null
	this.isLoadNumber = null
	this.updateLength = 0//存储最新一次加入的数据
	this.isResize = true
	this.endCallback = opts.endCallback || false
	this.isOk = false//是否处理完毕
	this.media = opts.media || false//断点
}

Waterfallsflow.prototype = {
	init:function(){
		//初始化
		this.loadImg();
	},
	setPic:function(arr){
		if(this.isResize){
			this.computedValue();
		}
		this.computed(arr);
		if(this.isOk){
    	this.updateLength = 0;
    	this.endCallback && this.endCallback();
    	this.isOk = false;
    }
	},
	//计算水平位置
	computedValue:function(){
    this.boxW = this.oBox.width();
    this.length = this.aList.length;
		this.modifyValue();
    var _levelNum = this.levelNum,
    	_mW = this.mW;

    //计算盒子宽度
    this.listWidth = (this.boxW - (_levelNum - 1 ) * _mW ) / _levelNum;
    var _w = this.listWidth;
    this.aList.css('width',_w);
    //this.oBox.width(_levelNum*(_w + _mW) - _mW);
    //初始化
    this.arrLeft = [];
    this.arrTop = [];
    for(var i=0;i<this.length;i++){
      if(i < _levelNum){
        this.arrLeft.push( (_w + _mW) * i);
      }
    }  
  },
  //赋值
  computed:function(){
    var _levelNum = this.levelNum,
    	_len,first;
    //判断是否第一次，如果是新加入的数据，就新加入的数据开始
    var updateLen = this.updateLength
    if(updateLen > 0){
    	first = this.length - updateLen;
    	_len = this.length;
    }else{
    	_len = this.length;
    	first = 0;
    }
    //计算
    for(var i=first;i<_len;i++){
      //第几列
      var _index = i;

      if(i >= _levelNum){
        _index = this.getMin(this.arrTop);
      }
      var _data = {
        left:this.arrLeft[_index] + 'px',
        top:i < _levelNum ? 0 : this.arrTop[_index] + 'px'
      };
      //赋值
      this.aList.eq(i).css(_data)

      var _h = this.aList.eq(i).height() + this.mH;
      this.arrTop[_index] = i >= _levelNum ? _h + this.arrTop[_index] : _h;

    }
    //设置父级的高度
    this.oBox.height(this.setHeight(this.arrTop));
  },
  //获取最小值
  getMin:function(arr){
    var min = arr[0],
      index = 0;
      //console.log(arr)
    for(var i=0,len=arr.length;i<len;i++){
      if(arr[i] < min){
        min = arr[i]
        index = i;
      }
    }
    return index;
  },
  //设置父级高度
  setHeight:function(arrTop){
    //找出最后几个,最高的
    var len = this.length
    var max2 = arrTop[0];
    for(var i=0,l = arrTop.length;i<l;i++){
      if(max2 < arrTop[i]){
        max2 = arrTop[i]
      }
    }
    return max2;
  },
  //加载图片
  loadImg:function(){
  	var _this = this,
  		range = this.updateLength > 0 ? this.length - this.updateLength - 1 : 0;
  	//如果有新加入的，就只判断新加入的
    this.$img = $('.waterfallsflow_wrap img:gt('+ range +')',this.oBox)
    if(this.updateLength > 0){
    	$('.waterfallsflow_list:gt('+ range +')',this.oBox).width(this.listWidth)
    }
    this.isLoadNumber = this.$img.length;
    var _this = this;
    var _timer = setInterval(function(){
      _this.checkWidth(function(){
        clearInterval(_timer);
      });
    },60);
  },
  //判断宽度
  checkWidth:function(callback){
    var _this = this,
      isLoadNumber = this.$img.length;
    this.$img.each(function(i){
      if($(this).height() > 0){
        isLoadNumber--;
      }
      if(isLoadNumber <= 0){
        //所有图片加载完毕，计算距离
        callback();
        _this.isOk = true;
      }
    })
    this.setPic();
  },
  //新加入数据，触发
  update:function(_len){
  	this.isResize = false;
  	this.aList = $('.waterfallsflow_list',this.oBox);
  	this.length = this.aList.length;
  	this.updateLength = _len;
  	//添加新的数据
		this.loadImg(this.updateLength);
  },
  //重新计算宽度
  resize:function(){
  	//改变宽度时，重刷
  	this.isResize = true;
  	this.loadImg();
  },
  //根据media进行修改
  modifyValue:function(){
		if(this.media){
  		var _wW = this.boxW,
  			prev = null,//上一个值
  			_temp = this.sortData(this.media),
  			_v = null;
  		//获取位置
  		for(var i=0,len=_temp.length;i<len;i++){
  			var now = parseInt(_temp[i]),
  				next = _temp[i + 1] ? parseInt(_temp[i + 1]) : now
  			if(now >= _wW && _wW <= next){
  				_v = _temp[i];
  				break;
  			}
  		}
  		//空的话，使用默认值
  		_v = _v ? this.media[_v] : this._default
  		_temp = null;
  		//赋值
  		this.mW = _v.mW
			this.mH = _v.mH
			this.levelNum = _v.levelNum

  	}
  },
  sortData:function(data){
  	//排序-从小到大
  	var arr = [];
  	for (var v in data) {
  		v = parseInt(v)
  		var onoff = true;
			for(var j=0,len=arr.length;j<len;j++){
				if(v < arr[j]){
					arr.splice(v,i,0);
					onoff = false;
					break;
				}
			}
			if(onoff){
				arr.push(v)
			}
		}
		return arr
  }
}
