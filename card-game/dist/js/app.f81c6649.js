(function(t){function e(e){for(var r,u,i=e[0],c=e[1],s=e[2],p=0,f=[];p<i.length;p++)u=i[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},o={app:0},a=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("Auth")])],1),n("router-view")],1)},a=[],u={},i=u,c=(n("5c0b"),n("2877")),s=Object(c["a"])(i,o,a,!1,null,null,null),l=s.exports,p=n("8c4f"),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("input",{attrs:{type:"text",placeholder:"Username"},on:{input:function(e){t.username=e.target.value}}}),n("input",{attrs:{type:"text",placeholder:"Password"},on:{input:function(e){t.password=e.target.value}}}),n("button",{on:{click:function(e){return t.signIn()}}},[t._v("Sign In")]),n("button",{on:{click:function(e){return t.accountCreation()}}},[t._v("Create Account")])])},d=[],h=n("cc84"),v=(n("ea7b"),n("e71f"),{data:function(){return{username:"",password:""}},methods:{signIn:function(){h["b"].auth().signInWithEmailAndPassword(this.username,this.password),console.log("signed in"),this.$router.push({name:"signedIn"})},accountCreation:function(){this.$router.push({name:"authCreate"})}}}),m=v,b=Object(c["a"])(m,f,d,!1,null,null,null),g=b.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("input",{attrs:{type:"text",placeholder:"Username"},on:{input:function(e){t.usernameCreate=e.target.value}}}),n("input",{attrs:{type:"text",placeholder:"Password"},on:{input:function(e){t.passwordCreate=e.target.value}}}),n("button",{on:{click:function(e){return t.createAccount()}}},[t._v("Create Account")])])},O=[];n("ed18").config();var y={apiKey:"PLACEHOLDER",authDomain:"PLACEHOLDER",projectId:"PLACEHOLDER",storageBucket:"PLACEHOLDER",messagingSenderId:"PLACEHOLDER",appId:"PLACEHOLDER"};h["b"].initializeApp(y);var C={data:function(){return{usernameCreate:"",passwordCreate:""}},methods:{createAccount:function(){console.log(this.usernameCreate),console.log(this.passwordCreate),h["b"].auth().createUserWithEmailAndPassword(this.usernameCreate,this.passwordCreate),this.$router.push({name:"auth"})}}},_=C,E=Object(c["a"])(_,w,O,!1,null,null,null),P=E.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("b",[t._v("Wow, so much content!")]),n("button",{on:{click:function(e){return t.signOut()}}},[t._v("Sign Out")])])},x=[],A={methods:{signOut:function(){this.$router.push({name:"auth"}),console.log("signed out")}}},L=A,k=Object(c["a"])(L,j,x,!1,null,null,null),I=k.exports;r["a"].use(p["a"]);var $=[{path:"/",name:"auth",component:g},{path:"/",name:"authCreate",component:P},{path:"/",name:"signedIn",component:I}],S=new p["a"]({mode:"history",base:"/",routes:$}),D=S;r["a"].config.productionTip=!1,new r["a"]({router:D,render:function(t){return t(l)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";n("9c0c")},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.f81c6649.js.map