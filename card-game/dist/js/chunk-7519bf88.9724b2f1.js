(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7519bf88"],{"159b":function(e,t,a){var r=a("da84"),n=a("fdbc"),c=a("17c2"),i=a("9112");for(var o in n){var s=r[o],d=s&&s.prototype;if(d&&d.forEach!==c)try{i(d,"forEach",c)}catch(u){d.forEach=c}}},"17c2":function(e,t,a){"use strict";var r=a("b727").forEach,n=a("a640"),c=a("ae40"),i=n("forEach"),o=c("forEach");e.exports=i&&o?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},"1dde":function(e,t,a){var r=a("d039"),n=a("b622"),c=a("2d00"),i=n("species");e.exports=function(e){return c>=51||!r((function(){var t=[],a=t.constructor={};return a[i]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},4160:function(e,t,a){"use strict";var r=a("23e7"),n=a("17c2");r({target:"Array",proto:!0,forced:[].forEach!=n},{forEach:n})},"5cf6":function(e,t,a){},"65f0":function(e,t,a){var r=a("861d"),n=a("e8b5"),c=a("b622"),i=c("species");e.exports=function(e,t){var a;return n(e)&&(a=e.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?r(a)&&(a=a[i],null===a&&(a=void 0)):a=void 0),new(void 0===a?Array:a)(0===t?0:t)}},8418:function(e,t,a){"use strict";var r=a("c04e"),n=a("9bf2"),c=a("5c6c");e.exports=function(e,t,a){var i=r(t);i in e?n.f(e,i,c(0,a)):e[i]=a}},a434:function(e,t,a){"use strict";var r=a("23e7"),n=a("23cb"),c=a("a691"),i=a("50c4"),o=a("7b0b"),s=a("65f0"),d=a("8418"),u=a("1dde"),l=a("ae40"),f=u("splice"),h=l("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,v=Math.min,b=9007199254740991,p="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!f||!h},{splice:function(e,t){var a,r,u,l,f,h,k=o(this),y=i(k.length),g=n(e,y),S=arguments.length;if(0===S?a=r=0:1===S?(a=0,r=y-g):(a=S-2,r=v(m(c(t),0),y-g)),y+a-r>b)throw TypeError(p);for(u=s(k,r),l=0;l<r;l++)f=g+l,f in k&&d(u,l,k[f]);if(u.length=r,a<r){for(l=g;l<y-r;l++)f=l+r,h=l+a,f in k?k[h]=k[f]:delete k[h];for(l=y;l>y-r+a;l--)delete k[l-1]}else if(a>r)for(l=y-r;l>g;l--)f=l+r-1,h=l+a-1,f in k?k[h]=k[f]:delete k[h];for(l=0;l<a;l++)k[l+g]=arguments[l+2];return k.length=y-r+a,u}})},a623:function(e,t,a){"use strict";var r=a("23e7"),n=a("b727").every,c=a("a640"),i=a("ae40"),o=c("every"),s=i("every");r({target:"Array",proto:!0,forced:!o||!s},{every:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}})},a640:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&r((function(){a.call(null,t||function(){throw 1},1)}))}},abbc:function(e,t,a){"use strict";a("5cf6")},ae40:function(e,t,a){var r=a("83ab"),n=a("d039"),c=a("5135"),i=Object.defineProperty,o={},s=function(e){throw e};e.exports=function(e,t){if(c(o,e))return o[e];t||(t={});var a=[][e],d=!!c(t,"ACCESSORS")&&t.ACCESSORS,u=c(t,0)?t[0]:s,l=c(t,1)?t[1]:void 0;return o[e]=!!a&&!n((function(){if(d&&!r)return!0;var e={length:-1};d?i(e,1,{enumerable:!0,get:s}):e[1]=1,a.call(e,u,l)}))}},b727:function(e,t,a){var r=a("0366"),n=a("44ad"),c=a("7b0b"),i=a("50c4"),o=a("65f0"),s=[].push,d=function(e){var t=1==e,a=2==e,d=3==e,u=4==e,l=6==e,f=7==e,h=5==e||l;return function(m,v,b,p){for(var k,y,g=c(m),S=n(g),O=r(v,b,3),x=i(S.length),L=0,_=p||o,E=t?_(m,x):a||f?_(m,0):void 0;x>L;L++)if((h||L in S)&&(k=S[L],y=O(k,L,g),e))if(t)E[L]=y;else if(y)switch(e){case 3:return!0;case 5:return k;case 6:return L;case 2:s.call(E,k)}else switch(e){case 4:return!1;case 7:s.call(E,k)}return l?-1:d||u?u:E}};e.exports={forEach:d(0),map:d(1),filter:d(2),some:d(3),every:d(4),find:d(5),findIndex:d(6),filterOut:d(7)}},c975:function(e,t,a){"use strict";var r=a("23e7"),n=a("4d64").indexOf,c=a("a640"),i=a("ae40"),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0,d=c("indexOf"),u=i("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:s||!d||!u},{indexOf:function(e){return s?o.apply(this,arguments)||0:n(this,e,arguments.length>1?arguments[1]:void 0)}})},dbb5:function(e,t,a){e.exports=a.p+"img/back.25b4a4d6.png"},e8b5:function(e,t,a){var r=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}},eb54:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"game-interface"},[!0===e.finished?r("div",["won"==e.victor?r("div",[e._v("You Have Won!!!")]):"tie"==e.victor?r("div",[e._v("You Have Tied With Someone!")]):"lost"==e.victor?r("div",[e._v("You Have Lost :(")]):e._e(),r("button",{on:{click:e.playAgain}},[e._v("Play Again?")])]):e._e(),e._l(e.players,(function(t,n){return r("div",{key:n,staticClass:"players"},[1==t.turnOrder&&t.name!==e.name?r("div",[e._v(" "+e._s(t.name)+"'s Turn ")]):1==t.turnOrder&&t.name===e.name?r("div",[e._v(" Your Turn ")]):e._e(),1!=t.turnOrder&&t.name==e.name&&!0!==e.finished?r("div",[e._v(" Waiting for a player... ")]):e._e(),t.name!==e.name&&!0!==e.finished?r("div",[e._v(" "+e._s(t.name)+" "),r("br"),e._v(" Score: ??? ")]):r("div",[e._v(" You "),r("br"),e._v(" Score: "+e._s(t.cardScore)+" ")]),t.blackJack&&t.name===e.name?r("div",[e._v("BlackJack!!!")]):e._e(),t.busted&&t.name===e.name?r("div",[e._v("Busted!!!")]):e._e(),e._l(t.hand,(function(n,c){return r("div",{key:n.code},[0===c&&t.name!==e.name?r("img",{staticClass:"card-image",attrs:{src:a("dbb5"),alt:"back"}}):r("img",{staticClass:"card-image",attrs:{src:n.image,alt:n.code}})])})),!0===e.canHit&&t.name==e.name&&1===t.turnOrder&&!0!==e.busted&&!0!==e.blackJack&&!0!==e.finished?r("button",{on:{click:function(a){return e.hit(t)}}},[e._v(" Hit ")]):e._e(),!0===e.canHit&&t.name==e.name&&1===t.turnOrder&&!1===t.played&&!0!==e.finished||!0===t.busted&&t.name===e.name&&!1===t.played&&1===t.turnOrder&&!0!==e.finished||!0!==t.blackJack&&t.name===e.name&&!1===t.played&&1===t.turnOrder&&!0!==e.finished?r("button",{on:{click:function(a){return e.stand(t)}}},[e._v(" Stand ")]):e._e()],2)}))],2)])},n=[],c=(a("a623"),a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),a("96cf"),a("1da1")),i=a("dc59"),o=a("c2e9"),s={name:"Game",data:function(){return{blackJack:!1,cardScore:0,code:"",master:"",name:"",deck:o["a"],canHit:!1,busted:!1,played:!1,finished:!0,victor:!1,players:[],lobby:"../../views/Lobbies/BlackJackLobby.vue",i:0,gameStarted:!1}},mounted:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.code=e.$route.params.data.code,e.name=e.$route.params.data.name,e.master=e.$route.params.data.master,t.next=5,i["b"].collection("games").doc("blackjack".concat(e.code));case 5:a=t.sent,a.onSnapshot((function(t){var a=t.data();e.deck=a.deck,e.players=a.gamePlayers,e.finished=a.finished,a.gamePlayers.forEach((function(t){1===t.turnOrder&&(t.canHit=!0,t.name==e.name&&(e.canHit=!0,e.cardScore=t.cardScore))})),0===e.i&&!0===a.finished&&(e.i=e.i+1,e.determineWinner())})),!0===e.master&&a.get().then((function(t){var r=t.data().gamePlayers;e.randomizeOrder(r),r.forEach((function(t){for(var a=0;a<2;a++){var r=e.deck[e.randomDeck()];t.hand.push(r);var n=t.hand.length-1,c=e.deck.indexOf(t.hand[n]);e.deck.splice(c,1),t.cardScore+=r.blackjack,e.check(t)}})),a.update({deck:e.deck,gamePlayers:r})}));case 8:case"end":return t.stop()}}),t)})))()},methods:{randomDeck:function(){return Math.floor(Math.random()*this.deck.length)},hit:function(e){var t=this.deck[this.randomDeck(e)];e.hand.push(t);var a=e.hand.length-1,r=this.deck.indexOf(e.hand[a]);this.deck.splice(r,1),e.cardScore+=e.hand[e.hand.length-1].blackjack,e.hand.forEach((function(t){"ACE"===t.value&&e.cardScore>=21&&1!=t.blackjack&&(e.cardScore-=t.blackjack,t.blackjack=1,e.cardScore+=t.blackjack)})),this.check(e)},stand:function(e){e.stand=!0,this.check(e)},check:function(e){var t=this;function a(e){return!0===e.played}e.cardScore>21&&e.name===this.name?(this.canHit=!1,this.busted=!0,e.canHit=!1,e.busted=!0):21===e.cardScore&&e.name===this.name&&(this.canHit=!1,this.blackJack=!0,e.canHit=!1,e.blackJack=!0),1==e.stand&&(this.canHit=!1,this.played=!0,e.canHit=!1,e.played=!0),!0===e.played&&this.players.forEach((function(e){e.turnOrder-=1,e.turnOrder<=0&&(e.turnOrder=t.players.length),1!=e.turnOrder||e.played||(e.canHit=!0)})),this.players.every(a)&&(this.finished=!0,this.gameStarted=!1,this.determineWinner()),i["b"].collection("games").doc("blackjack".concat(this.code)).update({gamePlayers:this.players,finished:this.finished,gameStarted:this.gameStarted})},determineWinner:function(){var e=this,t=[],a=!1,r=!1;this.players.forEach((function(n){n.name!==e.name&&(!0===n.blackJack&&(a=!0),!0===n.busted&&(r=!0),!0!==n.busted&&!0!==n.blackJack&&t.push(n.cardScore))})),!0===this.blackJack&&!0===a||!0===this.busted&&!0===r&&!0!==a&&0===t.length||this.cardScore===Math.max(t)===!0&&!0!==a?this.victor="tie":!0===this.blackJack&&!0!==a||this.cardScore>Math.max(t)===!0&&!0!==a?this.victor="won":this.victor="lost",this.players.forEach((function(t){t.name===e.name&&(t.victor=e.victor)})),i["b"].collection("games").doc("blackjack".concat(this.code)).update({gamePlayers:this.players})},randomizeOrder:function(e){for(var t=e.length,a=[],r=1;r<=t;r++)a.push(r);e.forEach((function(e){var t=Math.floor(Math.random()*a.length);e.turnOrder=a[t],a.splice(t,1)}))},playAgain:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["b"].collection("games").doc("blackjack".concat(e.code));case 2:a=t.sent,a.get().then((function(t){var r=t.data().lobby.lobbyPlayers;r.push({master:e.master,name:e.name}),a.update({lobby:{lobbyPlayers:r}},{merge:!0})})),r={name:e.name,code:e.code,master:e.master},e.$router.push({name:"BlackjackRoom",params:{data:r}});case 6:case"end":return t.stop()}}),t)})))()}}},d=s,u=(a("abbc"),a("2877")),l=Object(u["a"])(d,r,n,!1,null,"09bd30f0",null);t["default"]=l.exports},fdbc:function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-7519bf88.9724b2f1.js.map