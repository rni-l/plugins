# 存放一些自己编写的插件

> 主要是把自己做过的效果，归纳一下，并写成一个小插件，方便使用。PS:全部插件都依赖jquery。

## 插件清单

* [瀑布流](#waterfall)

 ---

## 文档说明

<h3 id='waterfall'>瀑布流</h3>

> 瀑布流插件，使用简单，调用就可以了。支持IE8。

#### 如何使用

	//引入css
	.waterfallsflow {
  		padding: 0 20px;
  		box-sizing: border-box;
  		width: 100%;
  		min-height: 998px; }
  	.waterfallsflow_wrap {
    	position: relative;
    	width: 100%; }
  	.waterfallsflow_list {
   		position: absolute; }
   		.waterfallsflow_list img {
      	width: 100%;
      	display: block; }

	//引入js，jq版本随意
	<script src='../js/jquery-1.11.1.min.js'></script>
	<script src='waterfallsflow.js'></script>

	//使用
	var _o = new $.Waterfallsflow({
		box:'.waterfallsflow',
		aList:'.waterfallsflow_list',
		//媒体查询，可以根据浏览器当前的宽度，设定特殊的值，一行有多少个，水平间距和垂直间距
		media:{
			1024:{
				levelNum:4,
				mW:15,
				mH:15
			},768:{
				levelNum:2,
				mW:10,
				mH:10
			},480:{
				levelNum:1,
				mW:0,
				mH:10
			}
		}
	})
	_o.init();
	//页面宽度改变，重新布局
	$(window).on('resize',function(){
		_o.resize();
	})
	//如果有新数据加入，传入新数据的长度即可
	_o.update(len);


#### 插件的方法

##### init()

接受一个对象参数，`{}`

	{
		box:'.waterfallsflow',//必填，字符串，瀑布流最外层盒子
		aList:'.waterfallsflow_list',//必填，字符串，瀑布流列表
		levelNum:4,//选填，数字，每行多少个
		mW:15,//选填，数字，水平间距
		mH:15,//选填，数字，垂直间距
		media:{//选填，对象，根据当前浏览器的宽度，进行显示
			1024:{
				levelNum:4,
				mW:15,
				mH:15
			},768:{
				levelNum:2,
				mW:10,
				mH:10
			}
		}
	}

##### resize()

直接调用即可。重新计算位置。当最外层盒子的宽度进行改变时，进行调用。

##### update()

接受一个参数，字符串，新添加数据的长度。调用后，会计算新加入的数据。

#### 原理

> 这里是教程，有兴趣的朋友，可以看下。

##### 布局

布局很简单，我这里是使用**绝对定位**的，或者使用css3的`column`也行，不过它是竖排排序的，不是横排的，这样不大好。所以就使用了绝对定位，绝对定位除了麻烦点外，兼容性好。

瀑布流最外层的盒子，给个相对定位就好了。我在样式那里，最外层盒子是给了个`height:1000px;`的，这样做的原因是，如果图片多了，会超过了一屏的，当计算完毕并赋值后，超过一屏，就会出现滚动条，这样浏览器的宽度也会超出，右边会出现被挡住的现象。如果在计算前手动扣除滚动条的宽度，这样怕会计算不准，因为每个浏览器的滚动条宽度并不相同，所以，在计算前，才把滚动条召唤出来，这样获取的宽度就剔除了滚动条，最后计算的效果会很完美。

![效果图](./static/waterfall.jpg)

##### 如何计算left和top

先上图：

![效果图2](./static/waterfall.jpg)

间距和长方形的宽度都是相等的，只不过我画工烂。

这种瀑布流效果，是等宽、等间距，高度自适应的。图片只需要`width:100%;display:block;`就好了。

先看第一排效果：

`top`值是相等的，都是0，然后`left`值都是有规律的，因为都是等宽的，所以只要`listWidth + marginLeft`乘以第几个就好了。而且后面所有的`left`值都是一样的，所有我们可以用一个数组存起来。

	//比如一排有5个，这样就可以计算到一排每个的left值了。
	for(var i=0;i<5;i++){
       arrLeft.push( (_w + _mW) * i);
    }

赋`left`值的时候，只要知道是当前图片是在每排的“第几个位置”就好了。

然后我们看看第二排：

第二排就不同了，我们可以看到第4个图片的位置，不是放在**第二排第一个位置**，而是放在三列中，最矮的那列。这样排的原因是，为了好看！不然最后几排就会惨不忍睹，高低不平的现象会很严重。

大概原理就是这样了，主要是计算`top`值，第一排的，全部给0就好了，然后我们看看第4张图片是如何计算的。

同样我先声明一个数组`arrTop`，用来累积每行每个的高度。

	//这是第一排的，添加第一行每个的高度和高度间距
	for(var i=0;i<5;i++){
       arrTop.push(aList.eq(i).height() + _mH);
    }

这样用数组累积保持数据，方便赋值。计算当前数组最小的值是在第几位置，而第四张图片是在**第二排的第二个位置**，

	//第二排，第二排之后，获取当前arrTop最小数的位置
	var index = getMin(arrTop)

	//这样就完成了
	aList.eq(i).css('top',arrTop[index])

	//添加完值后，arrTop第二个位置的数，要累加当前图片的高度和间距
	arrTop[index] += aList.eq(i).height() + _mH

	//这样只要有图片是排在第二个位置上的，就可以直接赋值了。
	...
	aList.eq(i).css('top',arrTop[index])

`left`和`top`值计算完后，然后就是获取当前瀑布流最高的高度了，赋值给最外层盒子，这样才能撑起来。

##### 图片还没加载完，怎么知道高度呢？

这个是个比较大的问题，不知道图片的高度，是无法做下去的，但没可能`window.onload`之后才执行的，这样效果太差了，当图片比较大的时候，会很卡。

我这里的解决办法是，用一个定时器，检测每张图片的高度，当获取到所有图片的高度后，就停止。

为什么可以这样做呢？我们不需要等图片加载完，才能获取到它的高度的，它在加载的时候就能获取到它的高度，代码是这样的：

	
	checkWidth:function(callback){
		isLoadNumber = this.$img.length;
		this.$img.each(function(i){
      		if($(this).height() > 0){
       	 		isLoadNumber--;
      		}
      		if(isLoadNumber <= 0){
      		  //所有图片高度获取完毕
      	 	 callback();
     		}
   	 	})
		//计算图片的left和top，并赋值
    	setPic();
	}
	//给个定时器，不断执行
	var _timer = setInterval(function(){
    	checkWidth(function(){
        	clearInterval(_timer);
      	});
    },60);

这样，图片虽然还没加载出来，但是就会提前占好位置。

![效果](./static/waterfall_3.jpg)

##### 总结

大概就是这样了，瀑布流是很简单的，大家可以试下自己写。