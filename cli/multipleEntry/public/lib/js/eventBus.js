!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.eventBus=e():t.eventBus=e()}(window,function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},r.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){this.subscribers=[],this.id=0,this.count=0},n=function(t,e){this[t]=e},s=function(t){this[t]=null},o=function(t){if(this[t]){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];this[t].apply(this,r)}};i.prototype.createSubscriber=function(){this.count+=1,this.$emit("create"),this.id+=1;var t=this.id;return this.subscribers.push({id:t,addListener:n,removeListener:s,dispatch:o}),this.subscribers[this.subscribers.length-1]},i.prototype.$emit=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];this.subscribers.forEach(function(e){e[t]&&e[t].apply(e,r)})},i.prototype.dispatch=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),i=1;i<e;i++)r[i-1]=arguments[i];this.$emit.apply(this,[t].concat(r))},i.prototype.removeSubscriber=function(t){var e=this;this.subscribers.some(function(r,i){return r.id===t&&(e.subscribers[i]=null,e.subscribers.splice(i,1),e.count-=1,!0)})},i.prototype.removeAllSubscriber=function(){this.count=0,this.subscribers=[]},i.prototype.getSubscriber=function(t){return t?this.subscribers.filter(function(e){return e.id===t}):this.subscribers},e.default=i}])});