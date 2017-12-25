<template>
  <div id="u-map" class="u-map"></div>
</template>

<script>
  /**
   在 html 添加
   <script type="text/JavaScript" src="http://api.map.baidu.com/api?v=2.0&ak=j8qC5tMHXrSeeHtXppFXfB1ld4cw8bE7"><\/script>
   <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"><\/script>
   <link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />
  */

  export default{
    data() {
      return {}
    },
    props: {// 里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
      height: {
        type: Number,
        default: 300
      },
      longitude: {}, // 定义经度
      latitude: {} // 定义纬度
    },
    mounted() {
      // 百度地图API功能
      const geolocation = new BMap.Geolocation()
      const map = new BMap.Map('u-map')
      geolocation.getCurrentPosition(function(result) {
        /* eslint-disable */
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
          // 创建标注
          map.centerAndZoom(result.point, 12)
          const marker = new BMap.Marker(result.point)
          map.addOverlay(marker)

          // 创建检索信息窗口对象
          const content = `<div style="margin:0;line-height:20px;padding:2px;">
                              地址：${result.address.province + result.address.city + result.address.district + result.address.street + result.address.street_number}<br/>
                            </div>`
          const searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
            title: '地址',      // 标题
            width: 290,             // 宽度
            height: 105,              // 高度
            panel: 'panel',         // 检索结果面板
            enableAutoPan: true,     // 自动平移
            searchTypes: [
              // BMAPLIB_TAB_SEARCH,   //周边检索
              BMAPLIB_TAB_TO_HERE,  // 到这里去
              // BMAPLIB_TAB_FROM_HERE //从这里出发
            ]
          })
          /* eslint-enable */
          marker.addEventListener('click', () => {
            searchInfoWindow.open(marker)
          })
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .u-map {
    width: 100%;
    height: 100%;
  }
</style>
