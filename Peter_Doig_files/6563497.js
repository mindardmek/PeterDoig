try{window._troq._en.writeNewModelsToCookie([])}catch(h){}
(function(){var h=function(k){var h=function(a){var c,b,g,e=document.cookie.split(";");for(c=0;c<e.length;c++)if(b=e[c].substr(0,e[c].indexOf("=")),g=e[c].substr(e[c].indexOf("=")+1),b=b.replace(/^\s+|\s+$/g,""),b===a)try{return decodeURIComponent(g)}catch(d){return unescape(g)}return""},B=function(a,c,b){var g;g=location.hostname.split(".").reverse();g=2<g.length&&3>=g[1].length&&2>=g[0].length?"."+g[2]+"."+g[1]+"."+g[0]:"."+g[1]+"."+g[0];var e=new Date;e.setDate(e.getDate()+b);var d=c;try{c=encodeURIComponent(c)}catch(z){c=
escape(c)}var f=c;b=null===b?"":"; expires="+e.toUTCString();document.cookie=a+"="+(f+b+("; domain="+g+"; path=/; samesite=lax; secure"));try{var l=h(a);if(""===l||l!=d){var v=window.location.hostname;if(1===v.split(".").length)document.cookie=a+"="+c+b+"; path=/; samesite=lax; secure";else{var k=v.split(".");k.shift();var A="."+k.join(".");document.cookie=a+"="+c+b+"; path=/; domain="+A+"; samesite=lax; secure";l=h(a);if(""===l||l!=d)document.cookie=a+"="+c+b+"; path=/; domain="+g+"; samesite=lax; secure"}}}catch(z){}},
r=k.segq,q={},f=function(a,c){try{var b="mmrnd="+Math.round(2E9*Math.random()),g=c&&c.rm?"":"?"+b,e=a.split("?"),d=e.splice(1,e.length);return(new Image(1,1)).src=e[0]+g+(d.length?(g?"&":"?")+d.join("?"):"")}catch(p){}},C=function(a,c){function b(a,c){return function(){function c(a){var b=window.JSON;window.JSON||(b={parse:function(a){return{}}});return b.parse(a)}if(!g){var b=void 0===d.status?a:d.status,f=0===d.status?"Error":d.response||d.responseText||f;g=!0;f=c(f);if(200===b&&f&&f.segments){for(var l=
{},b=0,h=f.segments.length;b<h;b+=1)l["seg"+f.segments[b].i]=f.segments[b].v;b=0;for(h=e.length;b<h;b+=1)(0,e[b][0])(l,e[b][1]);e.push=function(a){a[0](l,a[1])}}}}}var g=!1,e=[],d;a.cors&&window.XDomainRequest&&!/MSIE 1/.test(navigator.userAgent)&&(d=new XDomainRequest);window.XMLHttpRequest&&(d=new XMLHttpRequest);if(d){d.open("GET",a.url,!0);var f=d.onload=b(200);d.onreadystatechange=function(){4===d.readyState&&f()};d.onerror=b(null,"Error");d.ontimeout=b(null,"Timeout");d.onabort=b(null,"Abort");
d.send();d.onreadysgements=function(a,b){e.push([a,b])}}else d={onreadysgements:function(){}};return d},w=function(a,c){function b(a){for(var b=0,c=a.length;b<c;b+=1)if(!0===a[b])return!0;return!1}function g(a){for(var b=0,c=a.length;b<c;b+=1)if(!0!==a[b])return!1;return!0}function e(a,c,d){d=d||"OR";for(condition in a)if(a.hasOwnProperty(condition)){var e;e=a[condition];var f=c,l=d,h=condition,l=l||"OR",h=h||"in_seg",k=[],p=0,m=e.length;if(0===m)e=!0;else{for(;p<m;p+=1)f.hasOwnProperty("seg"+e[p].id)?
k.push("in_seg"===h):k.push("out_seg"===h);e="OR"===l?g(k):b(k)}if(!e)return!1}return!0}var d=a.segments,f=d.type||"OR",d=d.groups||[],l=[],h=0,k=d.length;if(0===k)return!0;for(;h<k;h+=1){var m=e(d[h],c,f);l.push(m)}return"OR"===f?b(l):g(l)},n=k.tcf_consent_string?k.tcf_consent_string:"",t="",m="",u="";""!=n&&(t="gdpr_consent="+n,m="&"+t,u="%26gdpr_consent%3D"+n);var x=function(a,c){var b=window.location.pathname,g=window.location.href;window!==window.top&&document.referrer&&""!==document.referrer&&
(g=document.referrer);a.url=g;a.path=b;var e=k.uid||h("__troRUID"),b=null;e&&36==e.length&&(b=parseInt(e.substr(33),16));a.ruid1=e;a.ggruid=b;var d;e&&(d=C({url:"//seg.mmtro.com/ruid/"+e}));c&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=ygpsjtge;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");RegExp("http://www.christies.com/auctions/post-war-and-contemporary-art?","gi").test(g)&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=ddjvpr7n;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");
RegExp("http://www.christies.com/salelanding/index.aspx?intsaleid=27594&saletitle=","gi").test(g)&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=qh7d8m9v;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");RegExp("http://www.christies.com/salelanding/index.aspx?intsaleid=27346&saletitle=","gi").test(g)&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=qh7d8m9v;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"ecom:on paper | online:lot-list"==
a.rtgpagename&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=uzp9p7ox;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"ecom:Contemporary Portfolio:lot-list"==a.rtgpagename&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=7mzgznhd;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"live"==a.rtgsale_type&&"27594"==a.rtgsaleid&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=djhhomvx;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");
"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"live"==a.rtgsale_type&&"27346"==a.rtgsaleid&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=djhhomvx;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"online"==a.rtgsale_type&&"27542"==a.rtgsaleid&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=yusgakdx;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");
"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"online"==a.rtgsale_type&&"27706"==a.rtgsaleid&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=yusgakdx;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"online"==a.rtgsale_type&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=vndavkyw;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");
"completedform"==a.rtgpg&&"1"==a.rtgconversion&&"sale_registration"==a.rtgidform&&"live"==a.rtgsale_type&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=np9nbx4s;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");if("completedform"==a.rtgpg&&"account_light"==a.rtgidform){if(d)d.onreadysgements(function(a,b){w({segments:{type:"AND",groups:[{in_seg:[],out_seg:[{id:1302}]}]}},a)&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=rgzcvikn;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?")},
a);if(d)d.onreadysgements(function(a,b){w({segments:{type:"AND",groups:[{in_seg:[],out_seg:[{id:1302}]}]}},a)&&f("https://seg.mmtro.com/s?add=1302")},a)}"completedform"==a.rtgpg&&"account"==a.rtgidform&&"1"==a.rtgconversion&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=lxvrra8t;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");"view_catalogue"==a.rtgclickcat&&"download"==a.rtgclickid&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=yijuskhl;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");
"Calendar-Upcoming Auctions"==a.rtgpagename&&f("https://ad.doubleclick.net/ddm/activity/src=8386672;type=invmedia;cat=zatq6yxy;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?");if(d)d.onreadysgements(function(){},a);k&&"undefined"===typeof k.callSync&&!h("__troSYNC")&&(function(){var a="tagid="+k.tagid+"&r1="+e+"&vruid="+e;""!=n&&(a+="&gdpr_consent="+n);var b="https://mmtro.com/s?"+a;(new Image(1,1)).src="https://secure.adnxs.com/seg?add=798876"+m+"&redir="+encodeURIComponent("https://secure.adnxs.com/getuid?"+
b+"&partner_name=appnexus&partner_uid=$UID");(new Image(1,1)).src="https://mmtro.com/cse/amazon?https%3A%2F%2Faax-eu.amazon-adsystem.com%2Fs%2Fdcm%3Fpid%3D7ae0d688-799b-4d55-ba84-853198e8457d%26id%3D%7B%7BRUID%7D%7D"+u;(new Image(1,1)).src="https://gum.criteo.com/sync?c=195&r=1&a=1"+m+"&u="+encodeURIComponent(b+"&partner_name=criteo&partner_uid=@USERID@");(new Image(1,1)).src="https://cm.g.doubleclick.net/pixel?google_nid=1000mercis_dmp&google_cm&google_sc"+m+"&"+a;(new Image(1,1)).src="https://loadm.exelator.com/load/?p=204&g=949&j=0"+
m;(new Image(1,1)).src="https://mmtro.com/cse/liveramp?https%3A%2F%2Fidsync.rlcdn.com%2F447836.gif%3Fpartner_uid%3D%7B%7BRUID%7D%7D"+u;(new Image(1,1)).src="https://aimfar.solution.weborama.fr/fcgi-bin/dispatch.fcgi?d.A=rd&d.k=1000mercis"+m+"&d.u="+encodeURIComponent(b+"&partner_name=weborama&partner_uid={WEBO_ID}");(new Image(1,1)).src="https://dpm.zebestof.com/sync?"+t+"&url="+encodeURIComponent(b+"&partner_name=zebestof&partner_uid=${ZBO_ID}")}(),B("__troSYNC",1,1))},y=function(){try{for(var a=
0;a<arguments.length;a++)r.push(arguments[a])}catch(d){}for(a={};0<r.length;)try{var c=r.shift(),b=c.shift().toLowerCase();0===b.indexOf("_")&&(b=b.substring(1,b.length));for(var f=b,e=c;"[object Array]"===Object.prototype.toString.call(e);)e=e[0];a[f]=e}catch(d){}c=h("__trossion");a.rtgtrossion=c;c=c.split("_");a.rtgsession_ts_creation_cookie=c[0];a.rtgsession_ttl=c[1];a.rtgsession_seq=c[2];a.rtgsession_id_prev=c[3];a.rtgsession_id=c[4];a.rtgsession_ts=c[5];a.rtgsession_hits=c[6];a.rtgsession_duration=
c[5]-c[0];return a};this.version="0f41d75e800bef9d6ffadb7f_9";this.push=function(){q=y.apply(this,arguments);x(q)};this._init=function(){q=y();x(q,!0)}};_troq.segq&&_troq.segq.constructor==Array&&"00000000-0000-0000-0000-000000000000"!==_troq.uid&&(h=new h(_troq),_troq.segq=h,h._init())})();
