var e={};function t(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.withCredentials=!0,r.onload=function(){200===r.status?t():n()},r.send()})}var n=function(e){if("undefined"==typeof document)return!1;try{var t=document.createElement("link");if(t.relList&&"function"==typeof t.relList.supports)return t.relList.supports(e)}catch(e){return!1}}("prefetch")?function(e){return new Promise(function(t,n){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=t,r.onerror=n,(document.head||document.querySelector("script").parentNode).appendChild(r)})}:t;function r(r,i){if(!e[r]){if("connection"in navigator){if((navigator.connection.effectiveType||"").includes("2g"))return;if(navigator.connection.saveData)return}return(i?function(e){return null==self.fetch?t(e):fetch(e,{credentials:"include"})}:n)(r).then(function(){e[r]=!0})}}var i=i||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},o=new Set,u=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var t=e.target.href;o.has(t)&&c(t)}})});function c(e){o.delete(e),r(e,u.priority)}module.exports=function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:i,el:document},e),u.priority=e.priority,e.timeoutFn(function(){e.urls?e.urls.forEach(c):Array.from(e.el.querySelectorAll("a"),function(e){u.observe(e),o.add(e.href)})},{timeout:e.timeout})};