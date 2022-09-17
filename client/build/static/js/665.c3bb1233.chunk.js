"use strict";(self.webpackChunkappname=self.webpackChunkappname||[]).push([[665],{8755:function(e,t,r){var n=r(4165),a=r(5861),s=r(5671),u=r(3144),o=r(5202),i=r(329),c=r(783),l=r(8404),d=function(){function e(){(0,s.Z)(this,e)}return(0,u.Z)(e,null,[{key:"createCategoryRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.postRequest("/category/createCategory",t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectAllCategoryRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("/category/selectAllCategory");case 2:if(t=e.sent,!(r=t.data)){e.next=7;break}return o.Z.dispatch((0,l.Z6)(r)),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"selectCategoryRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("category/selectCategory/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.Od)(null===a||void 0===a?void 0:a[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateCategoryRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a,s,u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id,a=t.postBody,e.next=3,c.Z.updateRequest("category/updateCategory/"+r,a);case 3:if(s=e.sent,!(u=s.data)){e.next=8;break}return i.Z.successMessage(u.message),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteCategoryRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.deleteRequest("category/deleteCategory/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=d},6787:function(e,t,r){var n=r(4165),a=r(5861),s=r(5671),u=r(3144),o=r(5202),i=r(329),c=r(783),l=r(7356),d=function(){function e(){(0,s.Z)(this,e)}return(0,u.Z)(e,null,[{key:"createPostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.postRequest("/post/createPost",t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectAllPostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t,r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("/post/selectAllPost");case 2:if(t=e.sent,!(r=t.data)){e.next=7;break}return o.Z.dispatch((0,l.OR)(r)),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"selectPostRequestBySlug",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("post/selectPostBySlug/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.m9)(null===a||void 0===a?void 0:a[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectPostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("post/selectPost/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.m9)(null===a||void 0===a?void 0:a[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectPostBySlug",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("post/selectPostBySlug/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.m9)(null===a||void 0===a?void 0:a[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updatePostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t,r){var a,s;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.updateRequest("Post/updatePost/"+t,r);case 2:if(a=e.sent,!(s=a.data)){e.next=7;break}return i.Z.successMessage(s.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"deletePostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.deleteRequest("post/deletePost/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"likePostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.putRequest("post/likePost/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"disLikePostRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.putRequest("post/disLikePost/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=d},8864:function(e,t,r){var n=r(4165),a=r(5861),s=r(5671),u=r(3144),o=r(5202),i=r(329),c=r(783),l=r(9922),d=function(){function e(){(0,s.Z)(this,e)}return(0,u.Z)(e,null,[{key:"createTagRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.postRequest("/tag/createTag",t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectAllTagRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("/tag/selectAllTag");case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.pG)(a)),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"selectTagRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.getRequest("tag/selectTag/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return o.Z.dispatch((0,l.Mc)(null===a||void 0===a?void 0:a[0])),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"updateTagRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a,s,u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id,a=t.postBody,e.next=3,c.Z.updateRequest("Tag/updateTag/"+r,a);case 3:if(s=e.sent,!(u=s.data)){e.next=8;break}return i.Z.successMessage(u.message),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteTagRequest",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r,a;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.Z.deleteRequest("tag/deleteTag/"+t);case 2:if(r=e.sent,!(a=r.data)){e.next=7;break}return i.Z.successMessage(a.message),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Z=d},2665:function(e,t,r){r.r(t);var n=r(2791),a=r(9434),s=r(5705),u=(r(6846),r(6871)),o=r(6787),i=r(3755),c=r(8755),l=r(184);t.default=function(){var e,t=(0,u.s0)(),r=(0,u.UO)().id;(0,n.useEffect)((function(){o.Z.selectPostRequest(r)}),[r]),(0,n.useEffect)((function(){c.Z.selectAllCategoryRequest()}),[r]);var d=(0,a.v9)((function(e){return null===e||void 0===e?void 0:e.Category})).CategoryList,p=(0,a.v9)((function(e){return null===e||void 0===e?void 0:e.Post})).Post,f=(0,s.TA)({enableReinitialize:!0,initialValues:{title:null===p||void 0===p?void 0:p.title,categoryId:null===p||void 0===p?void 0:p.categoryId,description:null===p||void 0===p?void 0:p.description,tagsId:null===p||void 0===p||null===(e=p.tagsId)||void 0===e?void 0:e.toString(),postThumbnail:""},onSubmit:function(e){var n=new FormData;n.append("title",null===e||void 0===e?void 0:e.title),n.append("categoryId",null===e||void 0===e?void 0:e.categoryId),n.append("description",null===e||void 0===e?void 0:e.description),void 0!==e.postThumbnail&&n.append("postThumbnail",null===e||void 0===e?void 0:e.postThumbnail),n.append("tagsId",null===e||void 0===e?void 0:e.tagsId),o.Z.updatePostRequest(r,n).then((function(e){t("/posts")}))}});return(0,l.jsxs)("div",{className:"min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8",children:[(0,l.jsxs)("div",{className:"sm:mx-auto sm:w-full sm:max-w-md",children:[(0,l.jsx)("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-300",children:"Update Post"}),(0,l.jsx)("p",{className:"mt-2 text-center text-sm text-gray-600",children:(0,l.jsx)("p",{className:"font-medium text-green-600 hover:text-indigo-500",children:"Share your ideas to the word. Your post must be free from profanity"})})]}),(0,l.jsx)("div",{className:"mt-8 sm:mx-auto sm:w-full sm:max-w-md",children:(0,l.jsx)("div",{className:"bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10",children:(0,l.jsxs)("form",{onSubmit:f.handleSubmit,className:"space-y-6",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"title",className:"block text-sm font-medium text-gray-700",children:"Title"}),(0,l.jsx)("div",{className:"mt-1",children:(0,l.jsx)("input",{id:"title",className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",value:f.values.title,onChange:f.handleChange("title"),onBlur:f.handleBlur("title"),autoFocus:!0})}),(0,l.jsx)("div",{className:"text-red-500",children:f.touched.title&&f.errors.title})]}),(0,l.jsx)("label",{htmlFor:"caregory",className:"block text-sm font-medium text-gray-700",children:"Select Category"}),(0,l.jsx)("select",{className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",name:"CategoryId",value:f.values.CategoryId,onChange:f.handleChange("CategoryId"),onBlur:f.handleBlur("CategoryId"),autoFocus:!0,children:d&&d.map((function(e){return(0,l.jsx)("option",{value:e._id,children:e.name})}))}),(0,l.jsx)("div",{className:"text-red-500",children:f.touched.Category&&f.errors.Category}),(0,l.jsx)(i.Z,{onChange:f.setFieldValue,onBlur:f.setFieldTouched}),(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"description",className:"block text-sm font-medium text-gray-700",children:"Description"}),(0,l.jsx)("textarea",{id:"description",rows:"5",cols:"10",className:"rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none",value:f.values.description,onChange:f.handleChange("description"),onBlur:f.handleBlur("description")}),(0,l.jsx)("div",{className:"text-red-500",children:f.touched.description&&f.errors.description}),(0,l.jsx)("label",{htmlFor:"postThumbnail",className:"block text-sm font-medium mt-3 mb-2 text-gray-700",children:"Select image to upload"}),(0,l.jsx)("input",{type:"file",className:"appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",name:"postThumbnail",accept:"image/*",onChange:function(e){f.setFieldValue("postThumbnail",e.currentTarget.files[0])}}),(0,l.jsx)("div",{className:"text-red-500",children:f.touched.postThumbnail&&f.errors.postThumbnail})]}),(0,l.jsx)("div",{children:(0,l.jsx)("button",{type:"submit",className:"w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Update"})})]})})})]})}},3755:function(e,t,r){var n=r(2791),a=r(9434),s=r(6255),u=r(8864),o=r(184);t.Z=function(e){(0,n.useEffect)((function(){u.Z.selectAllTagRequest()}),[]);var t=(0,a.v9)((function(e){return null===e||void 0===e?void 0:e.Tag})).TagList,r=t&&(null===t||void 0===t?void 0:t.map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e._id}})));return(0,o.jsx)(s.ZP,{isMulti:!0,name:"tagsId",id:"tagsId",onChange:function(t){var r=t.map((function(e){return e.value}));e.onChange("tagsId",r.toString())},onBlur:function(t){e.onBlur("tagsId",!0)},options:r,defaultValue:[r[0],r[1]]})}}}]);
//# sourceMappingURL=665.c3bb1233.chunk.js.map