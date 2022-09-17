"use strict";(self.webpackChunkappname=self.webpackChunkappname||[]).push([[487],{6787:function(e,t,n){var r=n(4165),s=n(5861),a=n(5671),u=n(3144),c=n(5202),i=n(329),o=n(783),l=n(7356),d=function(){function e(){(0,a.Z)(this,e)}return(0,u.Z)(e,null,[{key:"createPostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.postRequest("/post/createPost",t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return i.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectAllPostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.getRequest("/post/selectAllPost");case 2:if(t=e.sent,!(n=t.data)){e.next=7;break}return c.Z.dispatch((0,l.OR)(n)),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"selectPostRequestBySlug",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.getRequest("post/selectPostBySlug/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return c.Z.dispatch((0,l.m9)(null===s||void 0===s?void 0:s[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectPostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.getRequest("post/selectPost/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return c.Z.dispatch((0,l.m9)(null===s||void 0===s?void 0:s[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectPostBySlug",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.getRequest("post/selectPostBySlug/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return c.Z.dispatch((0,l.m9)(null===s||void 0===s?void 0:s[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updatePostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t,n){var s,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.updateRequest("Post/updatePost/"+t,n);case 2:if(s=e.sent,!(a=s.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"deletePostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.deleteRequest("post/deletePost/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return i.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"likePostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.putRequest("post/likePost/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return i.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"disLikePostRequest",value:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.putRequest("post/disLikePost/"+t);case 2:if(n=e.sent,!(s=n.data)){e.next=7;break}return i.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=d},9487:function(e,t,n){n.r(t);var r=n(2791),s=n(6871),a=n(3504),u=n(9126),c=n(9434),i=n(3153),o=n(6787),l=n(184);t.default=function(){var e,t,n,d,p,v,f=(0,s.s0)(),x=(0,s.UO)().slug,h=(0,c.v9)((function(e){return null===e||void 0===e?void 0:e.Post})).Post;(0,r.useEffect)((function(){o.Z.selectPostBySlug(x)}),[x]);var m=(0,c.v9)((function(e){return e.User})).UserDetails,Z=(null===h||void 0===h||null===(e=h.user)||void 0===e||null===(t=e[0])||void 0===t?void 0:t._id)===(null===m||void 0===m?void 0:m._id);return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("section",{className:"py-20 2xl:py-40 bg-gray-800 overflow-hidden",children:(0,l.jsxs)("div",{className:"container px-4 mx-auto",children:[(0,l.jsx)("img",{className:"mb-24 w-full h-96 object-cover",src:null===h||void 0===h?void 0:h.postThumbnail,alt:null===h||void 0===h?void 0:h.slug}),(0,l.jsxs)("div",{className:"max-w-2xl mx-auto text-center",children:[(0,l.jsx)("h2",{className:"mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading",children:null===h||void 0===h?void 0:h.title}),(0,l.jsxs)("div",{className:"inline-flex pt-14 mb-14 items-center border-t border-gray-500",children:[(0,l.jsx)("img",{className:"mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full",src:null===h||void 0===h||null===(n=h.user)||void 0===n||null===(d=n[0])||void 0===d?void 0:d.avatar,alt:""}),(0,l.jsxs)("div",{className:"text-left",children:[(0,l.jsx)("h4",{className:"mb-1 text-2xl font-bold text-gray-50",children:(0,l.jsx)("span",{className:"text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600",children:null===h||void 0===h||null===(p=h.user)||void 0===p||null===(v=p[0])||void 0===v?void 0:v.userName})}),(0,l.jsx)("p",{className:"text-gray-500",children:(0,l.jsx)(i.Z,{date:null===h||void 0===h?void 0:h.createdAt})})]})]}),(0,l.jsx)("div",{class:"max-w-xl mx-auto",children:(0,l.jsxs)("p",{class:"mb-6 text-left  text-xl text-gray-200",children:[null===h||void 0===h?void 0:h.description,Z?(0,l.jsxs)("p",{class:"flex",children:[(0,l.jsx)(a.rU,{to:"/edit-post/".concat(null===h||void 0===h?void 0:h._id),class:"p-3",children:(0,l.jsx)(u.jox,{class:"h-8 mt-3 text-yellow-300"})}),(0,l.jsx)("button",{onClick:function(){return e=null===h||void 0===h?void 0:h._id,void o.Z.deletePostRequest(e).then((function(e){e&&f("/posts")}));var e},class:"ml-3",children:(0,l.jsx)(u.yvY,{class:"h-8 mt-3 text-red-600"})})]}):null]})})]})]})})})}},3153:function(e,t,n){n(2791);var r=n(7079),s=n.n(r),a=n(184);t.Z=function(e){var t=e.date;return(0,a.jsx)(s(),{format:"D MMM YYYY",withTitle:!0,children:t})}}}]);
//# sourceMappingURL=487.23f5c6b6.chunk.js.map