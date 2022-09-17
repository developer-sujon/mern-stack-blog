"use strict";(self.webpackChunkappname=self.webpackChunkappname||[]).push([[605],{8755:function(e,t,r){var a=r(4165),s=r(5861),n=r(5671),c=r(3144),i=r(5202),l=r(329),u=r(783),o=r(8404),d=function(){function e(){(0,n.Z)(this,e)}return(0,c.Z)(e,null,[{key:"createCategoryRequest",value:function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var r,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.postRequest("/category/createCategory",t);case 2:if(r=e.sent,!(s=r.data)){e.next=7;break}return l.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectAllCategoryRequest",value:function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.getRequest("/category/selectAllCategory");case 2:if(t=e.sent,!(r=t.data)){e.next=7;break}return i.Z.dispatch((0,o.Z6)(r)),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"selectCategoryRequest",value:function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var r,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.getRequest("category/selectCategory/"+t);case 2:if(r=e.sent,!(s=r.data)){e.next=7;break}return i.Z.dispatch((0,o.Od)(null===s||void 0===s?void 0:s[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateCategoryRequest",value:function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var r,s,n,c;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id,s=t.postBody,e.next=3,u.Z.updateRequest("category/updateCategory/"+r,s);case 3:if(n=e.sent,!(c=n.data)){e.next=8;break}return l.Z.successMessage(c.message),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteCategoryRequest",value:function(){var e=(0,s.Z)((0,a.Z)().mark((function e(t){var r,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.Z.deleteRequest("category/deleteCategory/"+t);case 2:if(r=e.sent,!(s=r.data)){e.next=7;break}return l.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=d},7605:function(e,t,r){r.r(t);var a=r(2791),s=r(3504),n=r(9434),c=r(9126),i=r(8755),l=r(184);t.default=function(){(0,a.useEffect)((function(){i.Z.selectAllCategoryRequest()}),[]);var e=(0,n.v9)((function(e){return null===e||void 0===e?void 0:e.Category})).CategoryList;return(0,l.jsx)("div",{className:"w-full max-w-screen-xl mx-auto mt-5",children:(null===e||void 0===e?void 0:e.length)<=0?(0,l.jsx)("h2",{className:"text-center text-3xl text-green-800",children:"No Category Found"}):(0,l.jsx)("div",{className:"flex flex-col",children:(0,l.jsx)("div",{className:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8",children:(0,l.jsx)("div",{className:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8",children:(0,l.jsx)("div",{className:"shadow overflow-hidden border-b border-gray-200 sm:rounded-lg",children:(0,l.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,l.jsx)("thead",{className:"bg-gray-50",children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Author"}),(0,l.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Title"}),(0,l.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Created At"}),(0,l.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Edit"})]})}),(0,l.jsx)("tbody",{children:null===e||void 0===e?void 0:e.map((function(e){var t,r,a;return(0,l.jsxs)("tr",{className:"bg-gray-50",children:[(0,l.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)("div",{className:"flex-shrink-0 h-10 w-10",children:(0,l.jsx)("img",{className:"h-10 w-10 rounded-full",src:null===e||void 0===e||null===(t=e.user[0])||void 0===t?void 0:t.avatar,alt:"Category profile"})}),(0,l.jsxs)("div",{className:"ml-4",children:[(0,l.jsx)("div",{className:"text-sm font-medium text-gray-900",children:null===e||void 0===e||null===(r=e.user[0])||void 0===r?void 0:r.userName}),(0,l.jsx)("div",{className:"text-sm text-gray-500",children:null===e||void 0===e||null===(a=e.user[0])||void 0===a?void 0:a.email})]})]})}),(0,l.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize",children:e.name}),(0,l.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:new Date(null===e||void 0===e?void 0:e.createdAt).toDateString()}),(0,l.jsx)(s.rU,{to:"/edit-Category/".concat(e._id),children:(0,l.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-500",children:(0,l.jsx)(c.jox,{className:"h-5 text-indigo-500"})})})]})}))})]})})})})})})}}}]);
//# sourceMappingURL=605.e26a40c6.chunk.js.map