(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{193:function(e,t,n){"use strict";n.r(t);var s=n(0),c=n.n(s),r=n(71),a=n.n(r),i=(n(82),n(15)),l=n.p+"static/media/supporter.7fa918f6.svg",o=n.p+"static/media/demo_logo.89f71c41.png",b=(n(83),n(77)),d=n(76),j=n.n(d),u=n(3);var h=function(){var e=Object(s.useState)("#1963b3"),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(s.useState)("Demo FK"),a=Object(i.a)(r,2),d=a[0],h=a[1],m=Object(s.useState)(""),p=Object(i.a)(m,2),O=p[0],g=p[1],f=Object(s.useState)(o),x=Object(i.a)(f,2),v=x[0],k=x[1];return Object(u.jsxs)("div",{className:"page-content",children:[Object(u.jsx)("div",{className:"mobile hidden",children:Object(u.jsx)("h2",{children:"For en bedre brukeropplevelse, bes\xf8k siden p\xe5 din datamaskin."})}),Object(u.jsxs)("div",{className:"vh100",children:[Object(u.jsx)("nav",{children:Object(u.jsx)("a",{href:"http://supporter.no",children:Object(u.jsx)("img",{src:l,class:"logo",alt:"supporter logo"})})}),Object(u.jsxs)("div",{className:"container",children:[Object(u.jsx)("div",{className:"hero",children:Object(u.jsxs)("h1",{children:["Lag et ",Object(u.jsx)("span",{children:"banner"})," til din nettbutikk p\xe5 1-2-3!"]})}),Object(u.jsxs)("div",{className:"banner-section",children:[Object(u.jsx)("div",{className:"form",children:Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),document.querySelector(".submit").disabled=!0,document.querySelector(".submit").classList.add("disabled");var t=new FormData;t.append("clubName",d),t.append("bgColor",n),t.append("logo",O),fetch("https://supporter-banner.herokuapp.com/create-banner",{method:"POST",body:t}).then((function(e){if(!e.ok)throw new Error(e.message);return e.blob()})).then((function(e){j()(e,"banner")})).catch((function(e){alert(e),document.querySelector(".submit").disabled=!1,document.querySelector(".submit").classList.remove("disabled")}))},children:[Object(u.jsx)("label",{for:"clubName",children:"1) Tast inn klubbnavn: "}),Object(u.jsx)("input",{type:"text",name:"clubName",id:"clubName",placeholder:"Demo FK",required:!0,onChange:function(e){return h(e.target.value)}}),Object(u.jsx)("label",{for:"logo",className:"upload-logo",children:"2) Last opp logo:"}),Object(u.jsx)("input",{type:"file",accept:"image/png, image/jpeg",name:"logo",id:"logo",required:!0,onChange:function(e){void 0!==e.target.files[0]&&(k(URL.createObjectURL(e.target.files[0])),g(e.target.files[0]))}}),Object(u.jsx)("label",{for:"bgColor",children:"3) Velg bakgrunnsfarge: "}),Object(u.jsx)(b.a,{className:"color-picker",onChangeComplete:function(e){return c(e.hex)},triangle:"hide"}),Object(u.jsx)("button",{type:"submit",class:"submit",children:"LAST NED BANNER"})]})}),Object(u.jsxs)("div",{className:"preview",children:[Object(u.jsxs)("div",{className:"preview-bg",style:{backgroundColor:n},children:[Object(u.jsx)("img",{src:v,alt:"",srcset:""}),Object(u.jsxs)("h3",{style:{color:function(e){var t=e.replace("#","");return(299*parseInt(t.substr(0,2),16)+587*parseInt(t.substr(2,2),16)+114*parseInt(t.substr(4,2),16))/1e3>150}(n)?"#000000":"#ffffff"},children:["Velkommen til ",d," sin nettbutikk!"]})]}),Object(u.jsxs)("h2",{children:["Velkommen til nettbutikken til ",d]}),Object(u.jsxs)("h4",{children:["N\xe5r du handler i denne nettbutikken vil en del av overskuddet g\xe5 tilbake til ",d,"."]})]})]}),Object(u.jsx)("div",{className:"skew"})]}),Object(u.jsx)("footer",{children:Object(u.jsx)("h4",{children:"\xa9 Utviklet av SAAS"})})]})]})};a.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(h,{})}),document.getElementById("root"))},82:function(e,t,n){},83:function(e,t,n){}},[[193,1,2]]]);
//# sourceMappingURL=main.63b96437.chunk.js.map