# 存放一些自己编写的插件

> 主要是把自己做过的效果，归纳一下，并写成一个小插件，方便使用。PS:全部插件都依赖jquery。

## 插件清单

* [瀑布流](#waterfall)

 ---

## 文档说明

<h3 id='waterfall'>瀑布流</h3>

> 瀑布流插件，使用简单，调用就可以了。

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


|    name    | age |
| ---------- | --- |
| LearnShare |  12 |
| Mike       |  32 |
