!function(e,t){var a=function(e,t,a){var i,n;if(function(){var t,a={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in n=e.lazySizesConfig||e.lazysizesConfig||{},a)t in n||(n[t]=a[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:n,noSupport:!0};var r=t.documentElement,s=e.HTMLPictureElement,o="addEventListener",l="getAttribute",d=e[o].bind(e),c=e.setTimeout,u=e.requestAnimationFrame||c,f=e.requestIdleCallback,y=/^picture$/i,p=["load","error","lazyincluded","_lazyloaded"],z={},m=Array.prototype.forEach,v=function(e,t){return z[t]||(z[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),z[t].test(e[l]("class")||"")&&z[t]},g=function(e,t){v(e,t)||e.setAttribute("class",(e[l]("class")||"").trim()+" "+t)},b=function(e,t){var a;(a=v(e,t))&&e.setAttribute("class",(e[l]("class")||"").replace(a," "))},h=function(e,t,a){var i=a?o:"removeEventListener";a&&h(e,t),p.forEach((function(a){e[i](a,t)}))},A=function(e,a,n,r,s){var o=t.createEvent("Event");return n||(n={}),n.instance=i,o.initEvent(a,!r,!s),o.detail=n,e.dispatchEvent(o),o},C=function(t,a){var i;!s&&(i=e.picturefill||n.pf)?(a&&a.src&&!t[l]("srcset")&&t.setAttribute("srcset",a.src),i({reevaluate:!0,elements:[t]})):a&&a.src&&(t.src=a.src)},E=function(e,t){return(getComputedStyle(e,null)||{})[t]},w=function(e,t,a){for(a=a||e.offsetWidth;a<n.minSize&&t&&!e._lazysizesWidth;)a=t.offsetWidth,t=t.parentNode;return a},_=(ge=[],be=[],he=ge,Ae=function(){var e=he;for(he=ge.length?be:ge,me=!0,ve=!1;e.length;)e.shift()();me=!1},Ce=function(e,a){me&&!a?e.apply(this,arguments):(he.push(e),ve||(ve=!0,(t.hidden?c:u)(Ae)))},Ce._lsFlush=Ae,Ce),N=function(e,t){return t?function(){_(e)}:function(){var t=this,a=arguments;_((function(){e.apply(t,a)}))}},L=function(e){var t,i=0,r=n.throttleDelay,s=n.ricTimeout,o=function(){t=!1,i=a.now(),e()},l=f&&s>49?function(){f(o,{timeout:s}),s!==n.ricTimeout&&(s=n.ricTimeout)}:N((function(){c(o)}),!0);return function(e){var n;(e=!0===e)&&(s=33),t||(t=!0,(n=r-(a.now()-i))<0&&(n=0),e||n<9?l():c(l,n))}},S=function(e){var t,i,n=99,r=function(){t=null,e()},s=function(){var e=a.now()-i;e<n?c(s,n-e):(f||r)(r)};return function(){i=a.now(),t||(t=c(s,n))}},P=(J=/^img$/i,X=/^iframe$/i,G="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),K=0,Y=0,Z=0,ee=-1,te=function(e){Z--,(!e||Z<0||!e.target)&&(Z=0)},ae=function(e){return null==V&&(V="hidden"==E(t.body,"visibility")),V||!("hidden"==E(e.parentNode,"visibility")&&"hidden"==E(e,"visibility"))},ie=function(e,a){var i,n=e,s=ae(e);for(D-=a,Q+=a,H-=a,U+=a;s&&(n=n.offsetParent)&&n!=t.body&&n!=r;)(s=(E(n,"opacity")||1)>0)&&"visible"!=E(n,"overflow")&&(i=n.getBoundingClientRect(),s=U>i.left&&H<i.right&&Q>i.top-1&&D<i.bottom+1);return s},ne=function(){var e,a,s,o,d,c,u,f,y,p,z,m,v=i.elements;if((O=n.loadMode)&&Z<8&&(e=v.length)){for(a=0,ee++;a<e;a++)if(v[a]&&!v[a]._lazyRace)if(!G||i.prematureUnveil&&i.prematureUnveil(v[a]))fe(v[a]);else if((f=v[a][l]("data-expand"))&&(c=1*f)||(c=Y),p||(p=!n.expand||n.expand<1?r.clientHeight>500&&r.clientWidth>500?500:370:n.expand,i._defEx=p,z=p*n.expFactor,m=n.hFac,V=null,Y<z&&Z<1&&ee>2&&O>2&&!t.hidden?(Y=z,ee=0):Y=O>1&&ee>1&&Z<6?p:K),y!==c&&($=innerWidth+c*m,q=innerHeight+c,u=-1*c,y=c),s=v[a].getBoundingClientRect(),(Q=s.bottom)>=u&&(D=s.top)<=q&&(U=s.right)>=u*m&&(H=s.left)<=$&&(Q||U||H||D)&&(n.loadHidden||ae(v[a]))&&(k&&Z<3&&!f&&(O<3||ee<4)||ie(v[a],c))){if(fe(v[a]),d=!0,Z>9)break}else!d&&k&&!o&&Z<4&&ee<4&&O>2&&(W[0]||n.preloadAfterLoad)&&(W[0]||!f&&(Q||U||H||D||"auto"!=v[a][l](n.sizesAttr)))&&(o=W[0]||v[a]);o&&!d&&fe(o)}},re=L(ne),se=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(te(e),g(t,n.loadedClass),b(t,n.loadingClass),h(t,le),A(t,"lazyloaded"))},oe=N(se),le=function(e){oe({target:e.target})},de=function(e,t){var a=e.getAttribute("data-load-mode")||n.iframeLoadMode;0==a?e.contentWindow.location.replace(t):1==a&&(e.src=t)},ce=function(e){var t,a=e[l](n.srcsetAttr);(t=n.customMedia[e[l]("data-media")||e[l]("media")])&&e.setAttribute("media",t),a&&e.setAttribute("srcset",a)},ue=N((function(e,t,a,i,r){var s,o,d,u,f,p;(f=A(e,"lazybeforeunveil",t)).defaultPrevented||(i&&(a?g(e,n.autosizesClass):e.setAttribute("sizes",i)),o=e[l](n.srcsetAttr),s=e[l](n.srcAttr),r&&(u=(d=e.parentNode)&&y.test(d.nodeName||"")),p=t.firesLoad||"src"in e&&(o||s||u),f={target:e},g(e,n.loadingClass),p&&(clearTimeout(B),B=c(te,2500),h(e,le,!0)),u&&m.call(d.getElementsByTagName("source"),ce),o?e.setAttribute("srcset",o):s&&!u&&(X.test(e.nodeName)?de(e,s):e.src=s),r&&(o||u)&&C(e,{src:s})),e._lazyRace&&delete e._lazyRace,b(e,n.lazyClass),_((function(){var t=e.complete&&e.naturalWidth>1;p&&!t||(t&&g(e,n.fastLoadedClass),se(f),e._lazyCache=!0,c((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&Z--}),!0)})),fe=function(e){if(!e._lazyRace){var t,a=J.test(e.nodeName),i=a&&(e[l](n.sizesAttr)||e[l]("sizes")),r="auto"==i;(!r&&k||!a||!e[l]("src")&&!e.srcset||e.complete||v(e,n.errorClass)||!v(e,n.lazyClass))&&(t=A(e,"lazyunveilread").detail,r&&F.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,Z++,ue(e,t,r,i,a))}},ye=S((function(){n.loadMode=3,re()})),pe=function(){3==n.loadMode&&(n.loadMode=2),ye()},ze=function(){k||(a.now()-I<999?c(ze,999):(k=!0,n.loadMode=3,re(),d("scroll",pe,!0)))},{_:function(){I=a.now(),i.elements=t.getElementsByClassName(n.lazyClass),W=t.getElementsByClassName(n.lazyClass+" "+n.preloadClass),d("scroll",re,!0),d("resize",re,!0),d("pageshow",(function(e){if(e.persisted){var a=t.querySelectorAll("."+n.loadingClass);a.length&&a.forEach&&u((function(){a.forEach((function(e){e.complete&&fe(e)}))}))}})),e.MutationObserver?new MutationObserver(re).observe(r,{childList:!0,subtree:!0,attributes:!0}):(r[o]("DOMNodeInserted",re,!0),r[o]("DOMAttrModified",re,!0),setInterval(re,999)),d("hashchange",re,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t[o](e,re,!0)})),/d$|^c/.test(t.readyState)?ze():(d("load",ze),t[o]("DOMContentLoaded",re),c(ze,2e4)),i.elements.length?(ne(),_._lsFlush()):re()},checkElems:re,unveil:fe,_aLSL:pe}),F=(x=N((function(e,t,a,i){var n,r,s;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),y.test(t.nodeName||""))for(r=0,s=(n=t.getElementsByTagName("source")).length;r<s;r++)n[r].setAttribute("sizes",i);a.detail.dataAttr||C(e,a.detail)})),T=function(e,t,a){var i,n=e.parentNode;n&&(a=w(e,n,a),(i=A(e,"lazybeforesizes",{width:a,dataAttr:!!t})).defaultPrevented||(a=i.detail.width)&&a!==e._lazysizesWidth&&x(e,n,i,a))},R=S((function(){var e,t=j.length;if(t)for(e=0;e<t;e++)T(j[e])})),{_:function(){j=t.getElementsByClassName(n.autosizesClass),d("resize",R)},checkElems:R,updateElem:T}),M=function(){!M.i&&t.getElementsByClassName&&(M.i=!0,F._(),P._())};var j,x,T,R;var W,k,B,O,I,$,q,D,H,U,Q,V,J,X,G,K,Y,Z,ee,te,ae,ie,ne,re,se,oe,le,de,ce,ue,fe,ye,pe,ze;var me,ve,ge,be,he,Ae,Ce;return c((function(){n.init&&M()})),i={cfg:n,autoSizer:F,loader:P,init:M,uP:C,aC:g,rC:b,hC:v,fire:A,gW:w,rAF:_}}(e,e.document,Date);e.lazySizes=a,"object"==typeof module&&module.exports&&(module.exports=a)}("undefined"!=typeof window?window:{}),function(e,t){var a=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",a,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}(window,(function(e,t,a){if(e.addEventListener){var i=a.cfg,n=/\s+/g,r=/\s*\|\s+|\s+\|\s*/g,s=/^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/,o=/^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/,l=/\(|\)|'/,d={contain:1,cover:1},c=function(e,t){if(t){var a=t.match(o);a&&a[1]?e.setAttribute("type",a[1]):e.setAttribute("media",i.customMedia[t]||t)}},u=function(e){if(e.target._lazybgset){var t=e.target,i=t._lazybgset,n=t.currentSrc||t.src;if(n){var r=l.test(n)?JSON.stringify(n):n,s=a.fire(i,"bgsetproxy",{src:n,useSrc:r,fullSrc:null});s.defaultPrevented||(i.style.backgroundImage=s.detail.fullSrc||"url("+s.detail.useSrc+")")}t._lazybgsetLoading&&(a.fire(i,"_lazyloaded",{},!1,!0),delete t._lazybgsetLoading)}};addEventListener("lazybeforeunveil",(function(e){var o,l,d;!e.defaultPrevented&&(o=e.target.getAttribute("data-bgset"))&&(d=e.target,(l=t.createElement("img")).alt="",l._lazybgsetLoading=!0,e.detail.firesLoad=!0,function(e,a,o){var l=t.createElement("picture"),d=a.getAttribute(i.sizesAttr),u=a.getAttribute("data-ratio"),f=a.getAttribute("data-optimumx");a._lazybgset&&a._lazybgset.parentNode==a&&a.removeChild(a._lazybgset),Object.defineProperty(o,"_lazybgset",{value:a,writable:!0}),Object.defineProperty(a,"_lazybgset",{value:l,writable:!0}),e=e.replace(n," ").split(r),l.style.display="none",o.className=i.lazyClass,1!=e.length||d||(d="auto"),e.forEach((function(e){var a,n=t.createElement("source");d&&"auto"!=d&&n.setAttribute("sizes",d),(a=e.match(s))?(n.setAttribute(i.srcsetAttr,a[1]),c(n,a[2]),c(n,a[3])):n.setAttribute(i.srcsetAttr,e),l.appendChild(n)})),d&&(o.setAttribute(i.sizesAttr,d),a.removeAttribute(i.sizesAttr),a.removeAttribute("sizes")),f&&o.setAttribute("data-optimumx",f),u&&o.setAttribute("data-ratio",u),l.appendChild(o),a.appendChild(l)}(o,d,l),setTimeout((function(){a.loader.unveil(l),a.rAF((function(){a.fire(l,"_lazyloaded",{},!0,!0),l.complete&&u({target:l})}))})))})),t.addEventListener("load",u,!0),e.addEventListener("lazybeforesizes",(function(e){if(e.detail.instance==a&&e.target._lazybgset&&e.detail.dataAttr){var t=function(e){var t;return t=(getComputedStyle(e)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!d[t]&&d[e.style.backgroundSize]&&(t=e.style.backgroundSize),t}(e.target._lazybgset);d[t]&&(e.target._lazysizesParentFit=t,a.rAF((function(){e.target.setAttribute("data-parent-fit",t),e.target._lazysizesParentFit&&delete e.target._lazysizesParentFit})))}}),!0),t.documentElement.addEventListener("lazybeforesizes",(function(e){var t,i;!e.defaultPrevented&&e.target._lazybgset&&e.detail.instance==a&&(e.detail.width=(t=e.target._lazybgset,i=a.gW(t,t.parentNode),(!t._lazysizesWidth||i>t._lazysizesWidth)&&(t._lazysizesWidth=i),t._lazysizesWidth))}))}})),function(e,t){if(e){var a=function(i){t(e.lazySizes,i),e.removeEventListener("lazyunveilread",a,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}}("undefined"!=typeof window?window:0,(function(e,t,a,i){var n,r=t.createElement("a").style,s="objectFit"in r,o=/object-fit["']*\s*:\s*["']*(contain|cover)/,l=/object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,d="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",c=/\(|\)|'/,u={center:"center","50% 50%":"center"};function f(e,i){var r,s,o,l,u=a.cfg,f=function(){var t=e.currentSrc||e.src;t&&s!==t&&(s=t,l.backgroundImage="url("+(c.test(t)?JSON.stringify(t):t)+")",r||(r=!0,a.rC(o,u.loadingClass),a.aC(o,u.loadedClass)))},y=function(){a.rAF(f)};e._lazysizesParentFit=i.fit,e.addEventListener("lazyloaded",y,!0),e.addEventListener("load",y,!0),a.rAF((function(){var r=e,s=e.parentNode;"PICTURE"==s.nodeName.toUpperCase()&&(r=s,s=s.parentNode),function(e){var t=e.previousElementSibling;t&&a.hC(t,n)&&(t.parentNode.removeChild(t),e.style.position=t.getAttribute("data-position")||"",e.style.visibility=t.getAttribute("data-visibility")||"")}(r),n||function(){if(!n){var e=t.createElement("style");n=a.cfg.objectFitClass||"lazysizes-display-clone",t.querySelector("head").appendChild(e)}}(),o=e.cloneNode(!1),l=o.style,o.addEventListener("load",(function(){var e=o.currentSrc||o.src;e&&e!=d&&(o.src=d,o.srcset="")})),a.rC(o,u.loadedClass),a.rC(o,u.lazyClass),a.rC(o,u.autosizesClass),a.aC(o,u.loadingClass),a.aC(o,n),["data-parent-fit","data-parent-container","data-object-fit-polyfilled",u.srcsetAttr,u.srcAttr].forEach((function(e){o.removeAttribute(e)})),o.src=d,o.srcset="",l.backgroundRepeat="no-repeat",l.backgroundPosition=i.position,l.backgroundSize=i.fit,o.setAttribute("data-position",r.style.position),o.setAttribute("data-visibility",r.style.visibility),r.style.visibility="hidden",r.style.position="absolute",e.setAttribute("data-parent-fit",i.fit),e.setAttribute("data-parent-container","prev"),e.setAttribute("data-object-fit-polyfilled",""),e._objectFitPolyfilledDisplay=o,s.insertBefore(o,r),e._lazysizesParentFit&&delete e._lazysizesParentFit,e.complete&&f()}))}if(!s||!(s&&"objectPosition"in r)){var y=function(e){if(e.detail.instance==a){var t=e.target,i=function(e){var t=(getComputedStyle(e,null)||{}).fontFamily||"",a=t.match(o)||"",i=a&&t.match(l)||"";return i&&(i=i[1]),{fit:a&&a[1]||"",position:u[i]||i||"center"}}(t);return!(!i.fit||s&&"center"==i.position)&&(f(t,i),!0)}};e.addEventListener("lazybeforesizes",(function(e){if(e.detail.instance==a){var t=e.target;null==t.getAttribute("data-object-fit-polyfilled")||t._objectFitPolyfilledDisplay||y(e)||a.rAF((function(){t.removeAttribute("data-object-fit-polyfilled")}))}})),e.addEventListener("lazyunveilread",y,!0),i&&i.detail&&y(i)}})),function(e,t){if(e){var a=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",a,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}}("undefined"!=typeof window?window:0,(function(e,t,a){if(e.addEventListener){var i=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,n=/parent-fit["']*\s*:\s*["']*(contain|cover|width)/,r=/parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,s=/^picture$/i,o=a.cfg,l={getParent:function(t,a){var i=t,n=t.parentNode;return a&&"prev"!=a||!n||!s.test(n.nodeName||"")||(n=n.parentNode),"self"!=a&&(i="prev"==a?t.previousElementSibling:a&&(n.closest||e.jQuery)&&(n.closest?n.closest(a):jQuery(n).closest(a)[0])||n),i},getFit:function(e){var t,a,i=getComputedStyle(e,null)||{},s=i.content||i.fontFamily,o={fit:e._lazysizesParentFit||e.getAttribute("data-parent-fit")};return!o.fit&&s&&(t=s.match(n))&&(o.fit=t[1]),o.fit?(!(a=e._lazysizesParentContainer||e.getAttribute("data-parent-container"))&&s&&(t=s.match(r))&&(a=t[1]),o.parent=l.getParent(e,a)):o.fit=i.objectFit,o},getImageRatio:function(t){var a,n,r,l,d,c,u,f=t.parentNode,y=f&&s.test(f.nodeName||"")?f.querySelectorAll("source, img"):[t];for(a=0;a<y.length;a++)if(n=(t=y[a]).getAttribute(o.srcsetAttr)||t.getAttribute("srcset")||t.getAttribute("data-pfsrcset")||t.getAttribute("data-risrcset")||"",r=t._lsMedia||t.getAttribute("media"),r=o.customMedia[t.getAttribute("data-media")||r]||r,n&&(!r||(e.matchMedia&&matchMedia(r)||{}).matches)){(l=parseFloat(t.getAttribute("data-aspectratio")))||((d=n.match(i))?"w"==d[2]?(c=d[1],u=d[3]):(c=d[3],u=d[1]):(c=t.getAttribute("width"),u=t.getAttribute("height")),l=c/u);break}return l},calculateSize:function(e,t){var a,i,n,r=this.getFit(e),s=r.fit,o=r.parent;return"width"==s||("contain"==s||"cover"==s)&&(i=this.getImageRatio(e))?(o?t=o.clientWidth:o=e,n=t,"width"==s?n=t:(a=t/o.clientHeight)&&("cover"==s&&a<i||"contain"==s&&a>i)&&(n=t*(i/a)),n):t}};a.parentFit=l,t.addEventListener("lazybeforesizes",(function(e){if(!e.defaultPrevented&&e.detail.instance==a){var t=e.target;e.detail.width=l.calculateSize(t,e.detail.width)}}))}})),function(e,t){if(e){var a=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",a,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}}("undefined"!=typeof window?window:0,(function(e,t,a){var i,n,r,s,o,l,d,c,u,f,y,p,z,m,v,g,b=a.cfg,h=t.createElement("img"),A="sizes"in h&&"srcset"in h,C=/\s+\d+h/g,E=(n=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,r=Array.prototype.forEach,function(){var e=t.createElement("img"),i=function(e){var t,a,i=e.getAttribute(b.srcsetAttr);i&&(a=i.match(n))&&((t="w"==a[2]?a[1]/a[3]:a[3]/a[1])&&e.setAttribute("data-aspectratio",t),e.setAttribute(b.srcsetAttr,i.replace(C,"")))},s=function(e){if(e.detail.instance==a){var t=e.target.parentNode;t&&"PICTURE"==t.nodeName&&r.call(t.getElementsByTagName("source"),i),i(e.target)}},o=function(){e.currentSrc&&t.removeEventListener("lazybeforeunveil",s)};t.addEventListener("lazybeforeunveil",s),e.onload=o,e.onerror=o,e.srcset="data:,a 1w 1h",e.complete&&o()});(b.supportsType||(b.supportsType=function(e){return!e}),e.HTMLPictureElement&&A)?!a.hasHDescriptorFix&&t.msElementsFromPoint&&(a.hasHDescriptorFix=!0,E()):e.picturefill||b.pf||(b.pf=function(t){var a,n;if(!e.picturefill)for(a=0,n=t.elements.length;a<n;a++)i(t.elements[a])},c=function(e,t){return e.w-t.w},u=/^\s*\d+\.*\d*px\s*$/,o=/(([^,\s].[^\s]+)\s+(\d+)w)/g,l=/\s/,d=function(e,t,a,i){s.push({c:t,u:a,w:1*i})},y=function(){var e,a,n;y.init||(y.init=!0,addEventListener("resize",(a=t.getElementsByClassName("lazymatchmedia"),n=function(){var e,t;for(e=0,t=a.length;e<t;e++)i(a[e])},function(){clearTimeout(e),e=setTimeout(n,66)})))},p=function(t,i){var n,r=t.getAttribute("srcset")||t.getAttribute(b.srcsetAttr);!r&&i&&(r=t._lazypolyfill?t._lazypolyfill._set:t.getAttribute(b.srcAttr)||t.getAttribute("src")),t._lazypolyfill&&t._lazypolyfill._set==r||(n=f(r||""),i&&t.parentNode&&(n.isPicture="PICTURE"==t.parentNode.nodeName.toUpperCase(),n.isPicture&&e.matchMedia&&(a.aC(t,"lazymatchmedia"),y())),n._set=r,Object.defineProperty(t,"_lazypolyfill",{value:n,writable:!0}))},z=function(t){return e.matchMedia?(z=function(e){return!e||(matchMedia(e)||{}).matches},z(t)):!t},m=function(t){var i,n,r,s,o,l,d;if(p(s=t,!0),(o=s._lazypolyfill).isPicture)for(n=0,r=(i=t.parentNode.getElementsByTagName("source")).length;n<r;n++)if(b.supportsType(i[n].getAttribute("type"),t)&&z(i[n].getAttribute("media"))){s=i[n],p(s),o=s._lazypolyfill;break}return o.length>1?(d=s.getAttribute("sizes")||"",d=u.test(d)&&parseInt(d,10)||a.gW(t,t.parentNode),o.d=function(t){var i=e.devicePixelRatio||1,n=a.getX&&a.getX(t);return Math.min(n||i,2.5,i)}(t),!o.src||!o.w||o.w<d?(o.w=d,l=function(e){for(var t,a,i=e.length,n=e[i-1],r=0;r<i;r++)if((n=e[r]).d=n.w/e.w,n.d>=e.d){!n.cached&&(t=e[r-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(a=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*a),t.d+(n.d-e.d)*a>e.d&&(n=t));break}return n}(o.sort(c)),o.src=l):l=o.src):l=o[0],l},(v=function(e){if(!A||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=m(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(b.srcAttr,t.u),e.setAttribute("src",t.u))}}).parse=f=function(e){return s=[],(e=e.trim()).replace(C,"").replace(o,d),s.length||!e||l.test(e)||s.push({c:e,u:e,w:99}),s},i=v,b.loadedClass&&b.loadingClass&&(g=[],['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach((function(e){g.push(e+b.loadedClass),g.push(e+b.loadingClass)})),b.pf({elements:t.querySelectorAll(g.join(", "))})))})),function(e,t){if(e){var a=function(){t(e.lazySizes),e.removeEventListener("lazyunveilread",a,!0)};t=t.bind(null,e,e.document),"object"==typeof module&&module.exports?t(require("lazysizes")):"function"==typeof define&&define.amd?define(["lazysizes"],t):e.lazySizes?a():e.addEventListener("lazyunveilread",a,!0)}}("undefined"!=typeof window?window:0,(function(e,t,a){var i=function(){var n,r,s,o,l,d,c,u=a.cfg,f={"data-bgset":1,"data-include":1,"data-poster":1,"data-bg":1,"data-script":1},y="(\\s|^)("+u.loadedClass,p=t.documentElement,z=function(e){a.rAF((function(){a.rC(e,u.loadedClass),u.unloadedClass&&a.rC(e,u.unloadedClass),a.aC(e,u.lazyClass),("none"==e.style.display||e.parentNode&&"none"==e.parentNode.style.display)&&setTimeout((function(){a.loader.unveil(e)}),0)}))},m=function(e){var t,a,i,n;for(t=0,a=e.length;t<a;t++)(n=(i=e[t]).target).getAttribute(i.attributeName)&&("source"==n.localName&&n.parentNode&&(n=n.parentNode.querySelector("img")),n&&y.test(n.className)&&z(n))};u.unloadedClass&&(y+="|"+u.unloadedClass),y+="|"+u.loadingClass+")(\\s|$)",y=new RegExp(y),f[u.srcAttr]=1,f[u.srcsetAttr]=1,e.MutationObserver?(s=new MutationObserver(m),n=function(){o||(o=!0,s.observe(p,{subtree:!0,attributes:!0,attributeFilter:Object.keys(f)}))},r=function(){o&&(o=!1,s.disconnect())}):(p.addEventListener("DOMAttrModified",(d=[],c=function(){m(d),d=[],l=!1},function(e){o&&f[e.attrName]&&e.newValue&&(d.push({target:e.target,attributeName:e.attrName}),l||(setTimeout(c),l=!0))}),!0),n=function(){o=!0},r=function(){o=!1}),addEventListener("lazybeforeunveil",r,!0),addEventListener("lazybeforeunveil",n),addEventListener("lazybeforesizes",r,!0),addEventListener("lazybeforesizes",n),n(),removeEventListener("lazybeforeunveil",i)};addEventListener("lazybeforeunveil",i)}));
