webpackJsonp([2],{0:function(e,t,r){r("NHnr"),e.exports=r("briU")},1:function(e,t){},"5OHe":function(e,t){},NHnr:function(e,t,r){"use strict";function n(e){return $.a.done(),200===e.status||304===e.status?200===e.data.status.errCode?{code:e.data.status.errCode,data:e.data.data}:{code:e.data.status.errCode,data:e.data.status.message}:{code:e.status,data:e.statusText}}function a(e,t){if("notDeal"!==t)if(506===e.code)Object(l.Toast)("请重新登录"),k.commit("updateTest",123),D.replace({name:"login"});else if(200!==e.code){var r=e.data+". ";"MessageBox"===t?l.MessageBox.alert(r):Object(l.Toast)(r)}return e}Object.defineProperty(t,"__esModule",{value:!0});var o=r("lC5x"),u=r.n(o),i=r("J0Oq"),s=r.n(i),c=(r("nihN"),r("D0oh"),r("VCXJ")),d=r("zO6J"),l=r("wSez"),p=r.n(l),f={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{name:"fade"}},[t("router-view")],1)],1)},staticRenderFns:[]},h=r("Mw9A")({data:function(){return{}}},f,!1,function(e){r("iplB")},null,null).exports,m=r("rVsN"),g=r.n(m),w=r("BMa3"),v=r.n(w),y=r("DEjr"),b=r.n(y),T=r("E4C3"),$=r.n(T),D=new d.a({mode:"hash",base:"/wechat",scrollBehavior:function(e,t,r){return{x:0,y:0}},routes:[{path:"/",redirect:"/home"},{path:"/home",meta:{title:"首页"},component:function(e){return r.e(0).then(function(){var t=[r("E27G")];e.apply(null,t)}.bind(this)).catch(r.oe)}}]}),x=r("9rMa"),M={state:{userType:"user"},getters:{getUserType:function(e){return e.userType}},actions:{},mutations:{setUserType:function(e,t){var r=t.value;console.log(r),e.userType=r}}};c.default.use(x.a);var k=new x.a.Store({state:{test:1},mutations:{updateTest:function(e,t){e.test=t}},modules:{user:M},strict:!1}),A=r("Qh4q"),q=r.n(A).a.publicPath;v.a.defaults.timeout=6e4,v.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",v.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8",v.a.interceptors.request.use(function(e){return $.a.start(),e},function(e){return g.a.reject(e)}),v.a.interceptors.response.use(function(e){return e},function(e){return g.a.resolve(e.response)});var C={post:function(e,t){return v()({method:"post",url:q+e.url,data:b.a.stringify(t)}).then(n).then(function(t){return a(t,e.errType)})},get:function(e,t){return v()({method:"get",url:q+e.url,params:t}).then(n).then(function(t){return a(t,e.errType)})}},j={getCaptcha:function(e,t){return C.get(function(e,t){return{url:t,errType:e&&e.errType||""}}(t,"/admin/api/adminUser/checkLogin"),e)}},z={regexp:{phone:/^1[34578]{1}\d{9}$/,email:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,integer:/^(0|[1-9][0-9]*)$/,floor:/^\d+(\.\d{1,4})?$/,number:/^\d*$/,qq:/^[1-9][0-9]{4,9}$/gim,chinese:/[\u4e00-\u9fa5]/,code:/^[1-9]\d{5}$/g,IdCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,pwd:/^[_a-zA-Z0-9]+$/,ip:/(\d+)\.(\d+)\.(\d+)\.(\d+)/},checkIfWechat:function(){var e=window.navigator.userAgent;return/MicroMessenger/.test(e)},checkAlipay:function(){var e=window.navigator.userAgent;return/AlipayDefined/.test(e)},checkIfIos:function(){var e=window.navigator.userAgent;return/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e)},checkIfAndroid:function(){var e=window.navigator.userAgent;return/Android/i.test(e)},formatDate:function(e,t){if(!e||!e.getFullYear())throw new Error("请传入时间对象");(t=t||{}).dayDelimiter=t.dayDelimiter||"-",t.timeDelimiter=t.timeDelimiter||":";var r="";return r=e.getFullYear()+t.dayDelimiter+(e.getMonth()+1)+t.dayDelimiter+e.getDate(),t.ifHaveTime&&(r+=" "+e.getHours()+t.timeDelimiter+e.getMinutes()+t.timeDelimiter+e.getMilliseconds()),r},loadJS:function(e){if(!e.obj||0===e.obj)throw new Error("请传入全局对象名");if(!e.url)throw new Error("请传入js资源地址");if(window[e.obj])return e.callback&&e.callback();var t=document.createElement("script");t.src=e.url,t.onload=function(){e.callback&&e.callback()},document.body.appendChild(t)}},E=r("WOFH"),O={install:function(e){e.prototype.$wechat=E,e.wechat=E},$wechat:E},H=O,U=(r("5OHe"),r("ve9D"),r("muQq"),this);!function(){var e=s()(u.a.mark(function e(){var t,r;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C.get("/api/user/checkLogin");case 2:t=e.sent,r=t.code,t.data,200===r||alert("服务器繁忙，请稍后再试");case 6:case"end":return e.stop()}},e,this)}))}();c.default.prototype.$request=C,c.default.prototype.$tools=z,c.default.prototype.$api=j,c.default.use(p.a),c.default.use(H),c.default.use(d.a),c.default.config.productionTip=!1;D.beforeEach(function(){var e=s()(u.a.mark(function e(t,r,n){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:document.title=t.meta.title,n();case 2:case"end":return e.stop()}},e,U)}));return function(t,r,n){return e.apply(this,arguments)}}()),new c.default({el:"#app",router:D,store:k,template:"<App/>",components:{App:h}})},Qh4q:function(e,t){e.exports={dev:{port:8080,target:""},publicPath:"",productionSourceMap:!1}},iplB:function(e,t){},muQq:function(e,t){},ve9D:function(e,t){}},[0]);