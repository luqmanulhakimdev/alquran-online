(window.webpackJsonp=window.webpackJsonp||[]).push([[6,2,3],{247:function(t,e,n){"use strict";n.r(e);var r=n(58),l=n.n(r),o={name:"Main",data:function(){return{surah:[]}},mounted:function(){var t=this;l.a.get("https://api.quran.gading.dev/surah").then((function(e){return t.surah=e.data.data}))}},c=n(45),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"relative bg-white overflow-hidden my-20 mx-auto max-w-7xl"},[n("div",{staticClass:"flex flex-col"},[n("div",{staticClass:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},[n("div",{staticClass:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"},[n("div",{staticClass:"shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"},[n("table",{staticClass:"min-w-full divide-y divide-gray-200"},[t._m(0),t._v(" "),n("tbody",{staticClass:"bg-white divide-y divide-gray-200"},t._l(t.surah,(function(e){return n("tr",{key:e.number},[n("td",{staticClass:"px-6 py-4 w-1/12"},[t._v("\n\t                "+t._s(e.number)+"\n\t              ")]),t._v(" "),n("td",{staticClass:"px-6 py-4 w-2/12"},[n("div",{staticClass:"text-sm text-gray-900"},[n("NuxtLink",{attrs:{to:"/surah/"+e.number}},[t._v(t._s(e.name.transliteration.id)+" "),n("b",[t._v(t._s(e.name.short))])])],1),t._v(" "),n("div",{staticClass:"text-sm text-gray-500"},[t._v(t._s(e.revelation.id)+" | "+t._s(e.numberOfVerses)+" Ayat")])]),t._v(" "),n("td",{staticClass:"px-6 py-4 w-9/12"},[n("div",{staticClass:"text-sm text-gray-900"},[n("p",[t._v(t._s(e.tafsir.id))])])])])})),0)])])])])])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",{staticClass:"bg-gray-50"},[n("tr",[n("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12",attrs:{scope:"col"}},[t._v("\n\t                No\n\t              ")]),t._v(" "),n("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12",attrs:{scope:"col"}},[t._v("\n\t                Surah\n\t              ")]),t._v(" "),n("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-9/12",attrs:{scope:"col"}},[t._v("\n\t              \tTafsir\n\t              ")])])])}],!1,null,null,null);e.default=component.exports},248:function(t,e,n){"use strict";n.r(e);var r={name:"Header"},l=n(45),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"relative bg-white overflow-hidden"},[n("div",{staticClass:"max-w-7xl mx-auto"},[n("div",{staticClass:"relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32"},[n("svg",{staticClass:"hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2",attrs:{fill:"currentColor",viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true"}},[n("polygon",{attrs:{points:"50,0 100,0 50,100 0,100"}})]),t._v(" "),n("div",[n("div",{staticClass:"relative pt-6 px-4 sm:px-6 lg:px-8"},[n("nav",{staticClass:"relative flex items-center justify-between sm:h-10 lg:justify-start",attrs:{"aria-label":"Global"}},[n("div",{staticClass:"flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"},[n("div",{staticClass:"flex items-center justify-between w-full md:w-auto"},[t._m(0),t._v(" "),n("div",{staticClass:"-mr-2 flex items-center md:hidden"},[n("button",{staticClass:"bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",attrs:{type:"button","aria-expanded":"false"}},[n("span",{staticClass:"sr-only"},[t._v("Open main menu")]),t._v(" "),n("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"}})])])])])]),t._v(" "),n("div",{staticClass:"hidden md:block md:ml-10 md:pr-4 md:space-x-8"},[n("NuxtLink",{attrs:{to:"/"}},[n("span",{staticClass:"font-medium text-indigo-600 hover:text-gray-900"},[t._v("Home")])])],1)])]),t._v(" "),n("div",{staticClass:"absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"},[n("div",{staticClass:"rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"},[n("div",{staticClass:"px-5 pt-4 flex items-center justify-between"},[t._m(1),t._v(" "),n("div",{staticClass:"-mr-2"},[n("button",{staticClass:"bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",attrs:{type:"button"}},[n("span",{staticClass:"sr-only"},[t._v("Close main menu")]),t._v(" "),n("svg",{staticClass:"h-6 w-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"}})])])])]),t._v(" "),t._m(2)])])]),t._v(" "),t._m(3)])]),t._v(" "),t._m(4)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{attrs:{href:"#"}},[n("span",{staticClass:"sr-only"},[t._v("Workflow")]),t._v(" "),n("img",{staticClass:"h-8 w-auto sm:h-10",attrs:{src:"https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("img",{staticClass:"h-8 w-auto",attrs:{src:"https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",alt:""}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"px-2 pt-2 pb-3 space-y-1"},[n("a",{staticClass:"block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-gray-900 hover:bg-gray-50",attrs:{href:"#"}},[t._v("Home")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"},[n("div",{staticClass:"sm:text-center lg:text-left"},[n("h1",{staticClass:"text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"},[n("span",{staticClass:"block text-indigo-600 xl:inline"},[t._v("Alquran Online")])]),t._v(" "),n("p",{staticClass:"mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"},[t._v("\n            Baca Al Quran online, terdapat terjemahan bahasa indonesia dan audio.\n          ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"},[e("img",{staticClass:"h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full",attrs:{src:"/alquran-online/quran.jpeg",alt:""}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Main:n(247).default})},251:function(t,e,n){"use strict";n.r(e);var r={name:"IndexPage"},l=n(45),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header"),t._v(" "),n("Main")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Header:n(248).default,Main:n(247).default})}}]);