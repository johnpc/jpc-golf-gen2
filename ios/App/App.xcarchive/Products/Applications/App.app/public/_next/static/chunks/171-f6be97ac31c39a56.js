"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[171],{1622:function(e,t,a){a.d(t,{f:function(){return f}});var l={};a.r(l),a.d(l,{DirectionProvider:function(){return s},Provider:function(){return c},useDirection:function(){return i}});var n=a(2265);let r=(0,n.createContext)(void 0),s=e=>{let{dir:t,children:a}=e;return(0,n.createElement)(r.Provider,{value:t},a)};function i(e){let t=(0,n.useContext)(r);return e||t||"ltr"}let c=s;var o=a(6373),m=a(9868),d=a(4209);let{DirectionProvider:u}=(0,o.Cp)(l);function f({children:e,colorMode:t,direction:a="ltr",nonce:l,theme:r}){let s=n.useMemo(()=>({theme:(0,m.j)(r),colorMode:t}),[r,t]),{theme:{name:i,cssText:c}}=s;return n.createElement(d.N.Provider,{value:s},n.createElement(u,{dir:a},n.createElement("div",{"data-amplify-theme":i,"data-amplify-color-mode":t,dir:a},e),void 0===r||/<\/style/i.test(c)?null:n.createElement("style",{id:`amplify-theme-${i}`,dangerouslySetInnerHTML:{__html:c},nonce:l})))}},3467:function(e,t,a){a.d(t,{Z:function(){return c}});var l=a(9965),n=a(4010),r=a(6373),s=a(2265),i=a(7511);let c=(0,a(2112).R)(({className:e,children:t,variation:a,...c},o)=>s.createElement(i.G,{className:(0,l.A)(n.M.Card,(0,r.wq)(n.M.Card,a),e),ref:o,...c},t));c.displayName="Card"},4686:function(e,t,a){a.d(t,{p:function(){return u}});var l=a(2265),n=a(9965),r=a(4010),s=a(6373),i=a(2112),c=a(5220),o=a(7511),m=a(7757),d=a(5293);let u=(0,i.R)(({children:e,className:t,isDisabled:a,legend:i,legendHidden:u,size:f,testId:h,variation:M="plain",...p},v)=>{let{isFieldsetDisabled:E}=(0,d.w)(),g=E||a,w=l.useMemo(()=>({isFieldsetDisabled:g}),[g]),b=(0,n.A)(r.M.Fieldset,(0,s.wq)(r.M.Fieldset,M),(0,s.wq)(r.M.Fieldset,f),t),C=(0,n.A)(r.M.FieldsetLegend,(0,s.wq)(r.M.FieldsetLegend,f),{[r.M.VisuallyHidden]:u});return l.createElement(d.P.Provider,{value:w},l.createElement(c.k,{as:"fieldset",className:b,ref:v,disabled:g,testId:h,...p},l.createElement(m.T,{as:"legend"},i),l.createElement(o.G,{as:"div","aria-hidden":"true",className:C},i),e))});u.displayName="Fieldset"},6820:function(e,t,a){a.d(t,{X:function(){return m}});var l=a(2265),n=a(9965),r=a(4010),s=a(6373),i=a(7511),c=a(2112);let o={1:"h1",2:"h2",3:"h3",4:"h4",5:"h5",6:"h6"},m=(0,c.R)(({className:e,children:t,isTruncated:a,level:c=6,...m},d)=>l.createElement(i.G,{as:o[c],className:(0,n.A)(r.M.Heading,(0,s.wq)(r.M.Heading,c),(0,s.T2)(r.M.Heading,"truncated",a),e),ref:d,...m},t));m.displayName="Heading"},7816:function(e,t,a){a.d(t,{y:function(){return r}});var l=a(2265);let n=l.createContext({});function r(e){let t=l.useContext(n);if(e&&t)return t[e]}},3625:function(e,t,a){a.d(t,{v:function(){return A}});var l=a(2265),n=a(9965),r=a(4010),s=a(5220),i=a(2112);let c=(0,i.R)(({children:e,className:t,...a},i)=>l.createElement(s.k,{className:(0,n.A)(r.M.MessageHeading,t),ref:i,...a},e));c.displayName="MessageHeading";var o=a(7511);let m=l.createContext({dismissed:!1,setDismissed:()=>{}}),d=()=>l.useContext(m),u=e=>{let{className:t,...a}=e;return l.createElement(o.G,{as:"span",width:"1em",height:"1em",className:(0,n.A)(r.M.Icon,t),...a},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z",fill:"currentColor"})))},f=e=>{let{className:t,...a}=e;return l.createElement(o.G,{as:"span",width:"1em",height:"1em",className:(0,n.A)(r.M.Icon,t),...a},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z",fill:"currentColor"})))},h=e=>{let{className:t,...a}=e;return l.createElement(o.G,{as:"span",width:"1em",height:"1em",className:(0,n.A)(r.M.Icon,t),...a},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",fill:"currentColor"})))},M=e=>{let{className:t,...a}=e;return l.createElement(o.G,{as:"span",width:"1em",height:"1em",className:(0,n.A)(r.M.Icon,t),...a},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z",fill:"currentColor"})))};var p=a(7816);let v=(0,i.R)(({className:e,...t},a)=>{let s;let i=(0,p.y)("message"),{colorTheme:c}=d();switch(c){case"info":s=i?.info??l.createElement(h,null);break;case"error":s=i?.error??l.createElement(f,null);break;case"warning":s=i?.warning??l.createElement(M,null);break;case"success":s=i?.success??l.createElement(u,null)}return s?l.createElement(o.G,{className:(0,n.A)(r.M.MessageIcon,e),"aria-hidden":"true",ref:a,...t},s):null});v.displayName="MessageIcon";var E=a(6373),g=a(4668),w=a(7757);let b=e=>{let{className:t,size:a,...s}=e;return l.createElement(o.G,{as:"span",width:a??"1em",height:a??"1em",className:(0,n.A)(r.M.Icon,t),...s},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:a?{width:a,height:a}:void 0},l.createElement("path",{d:"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",fill:"currentColor"})))};var C=a(435);let N=(0,i.R)(({onDismiss:e,dismissLabel:t,hasIcon:a=!0,children:s,className:i,...c},o)=>{let{setDismissed:m}=d(),u=(0,p.y)("message"),f=l.useCallback(()=>{m(!0),(0,E.mf)(e)&&e()},[m,e]);return l.createElement(g.z,{variation:"link",colorTheme:"overlay",className:(0,n.A)(r.M.MessageDismiss,i),ref:o,onClick:f,...c},a?u?.close??l.createElement(b,{"aria-hidden":"true"}):null,s||l.createElement(w.T,null,t||C.b9.Message.dismissLabel))});N.displayName="MessageContent";let y=(0,i.R)(({children:e,className:t,...a},i)=>l.createElement(s.k,{className:(0,n.A)(r.M.MessageContent,t),ref:i,...a},e));y.displayName="MessageContent";let T=(0,i.R)(({children:e,className:t,colorTheme:a="neutral",variation:i="filled",...c},o)=>{let[d,u]=l.useState(!1),f=l.useMemo(()=>({colorTheme:a,dismissed:d,setDismissed:u}),[a,d]);return l.createElement(m.Provider,{value:f},d?null:l.createElement(s.k,{className:(0,n.A)(r.M.Message,(0,E.wq)(r.M.Message,i),(0,E.wq)(r.M.Message,a),t),ref:o,...c},e))});T.displayName="MessageContainer";let A=(0,i.R)(({children:e,heading:t,dismissLabel:a,isDismissible:n,onDismiss:r,hasIcon:s=!0,colorTheme:i="neutral",variation:o="filled",...m},d)=>l.createElement(T,{colorTheme:i,variation:o,ref:d,...m},s?l.createElement(v,null):null,l.createElement(y,null,t?l.createElement(c,null,t):null,e),n?l.createElement(N,{onDismiss:r,dismissLabel:a}):null));A.displayName="Message"},9682:function(e,t,a){a.d(t,{m:function(){return w}});var l=a(2265),n=a(9965),r=a(4010),s=a(6373),i=a(4552),c=a(3807),o=a(5220),m=a(4132),d=a(7816),u=a(7511);let f=e=>{let{className:t,...a}=e;return l.createElement(u.G,{as:"span",width:"1em",height:"1em",className:(0,n.A)(r.M.Icon,t),...a},l.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z",fill:"currentColor"})))};var h=a(5293),M=a(2112);let p=(0,M.R)(({autoComplete:e,className:t,size:a,variation:i,value:c,defaultValue:m,hasError:M,icon:p,iconColor:v,children:E,placeholder:g,isDisabled:w,isRequired:b,isMultiple:C=!1,selectSize:N=1,...y},T)=>{let A=void 0===c&&void 0===m&&g,L=C||N>1,k=(0,n.A)(r.M.Select,r.M.FieldGroupControl,(0,s.wq)(r.M.Select,a),(0,s.wq)(r.M.Select,i),(0,s.T2)(r.M.Select,"error",M),(0,s.T2)(r.M.Select,"expanded",L),t),H=(0,d.y)("select"),{isFieldsetDisabled:x}=(0,h.w)();return l.createElement(u.G,{className:r.M.SelectWrapper},l.createElement(u.G,{"aria-invalid":M,as:"select",autoComplete:e,value:c,defaultValue:A?"":m,isDisabled:x||w,multiple:C,size:N,required:b,className:k,ref:T,...y},g&&l.createElement("option",{value:""},g),E),L?null:l.createElement(o.k,{className:(0,n.A)(r.M.SelectIcon,(0,s.wq)(r.M.SelectIcon,a)),color:v},p??H?.expand??l.createElement(f,null)))});p.displayName="Select";var v=a(2240),E=a(3881);let g=({children:e,options:t})=>e?(t?.length&&console.warn("Amplify UI: <SelectField> component  defaults to rendering children over `options`. When using the `options` prop, omit children."),e):t?.map((e,t)=>l.createElement("option",{label:e,value:e,key:`${e}-${t}`},e)),w=(0,M.R)((e,t)=>{let{children:a,className:d,descriptiveText:u,errorMessage:f,hasError:h=!1,id:M,label:w,labelHidden:b=!1,options:C,size:N,testId:y,inputStyles:T,...A}=e,L=(0,E.A)(M),k=(0,E.A)(),H=u?k:void 0,{styleProps:x,rest:R}=(0,v.d)(A);return l.createElement(o.k,{className:(0,n.A)(r.M.Field,(0,s.wq)(r.M.Field,N),r.M.SelectField,d),testId:y,...x},l.createElement(m._,{htmlFor:L,visuallyHidden:b},w),l.createElement(i.D,{id:k,labelHidden:b,descriptiveText:u}),l.createElement(p,{"aria-describedby":H,hasError:h,id:L,ref:t,size:N,...R,...T},g({children:a,options:C})),l.createElement(c.d,{hasError:h,errorMessage:f}))});w.displayName="SelectField"},398:function(e,t,a){a.d(t,{i:function(){return c}});var l=a(2265),n=a(9965),r=a(4010),s=a(6373),i=a(7511);let c=(0,a(2112).R)(({caption:e,children:t,className:a,highlightOnHover:c=!1,size:o,variation:m,...d},u)=>{let f=(0,n.A)(r.M.Table,(0,s.wq)(r.M.Table,o),(0,s.wq)(r.M.Table,m),a);return l.createElement(i.G,{as:"table",className:f,"data-highlightonhover":c,ref:u,...d},e&&l.createElement(i.G,{as:"caption",className:r.M.TableCaption},e),t)});c.displayName="Table"},3418:function(e,t,a){a.d(t,{R:function(){return i}});var l=a(2265),n=a(9965),r=a(4010),s=a(7511);let i=(0,a(2112).R)(({children:e,className:t,...a},i)=>l.createElement(s.G,{as:"tbody",className:(0,n.A)(r.M.TableBody,t),ref:i,...a},e));i.displayName="TableBody"},8364:function(e,t,a){a.d(t,{p:function(){return i}});var l=a(2265),n=a(9965),r=a(4010),s=a(7511);let i=(0,a(2112).R)(({as:e="td",children:t,className:a,...i},c)=>l.createElement(s.G,{as:e,className:(0,n.A)("td"===e?r.M.TableTd:r.M.TableTh,a),ref:c,...i},t));i.displayName="TableCell"},8767:function(e,t,a){a.d(t,{s:function(){return i}});var l=a(2265),n=a(9965),r=a(4010),s=a(7511);let i=(0,a(2112).R)(({children:e,className:t,...a},i)=>l.createElement(s.G,{as:"thead",className:(0,n.A)(r.M.TableHead,t),ref:i,...a},e));i.displayName="TableHead"},1774:function(e,t,a){a.d(t,{S:function(){return i}});var l=a(9965),n=a(4010),r=a(2265),s=a(7511);let i=(0,a(2112).R)(({children:e,className:t,...a},i)=>r.createElement(s.G,{as:"tr",className:(0,l.A)(n.M.TableRow,t),ref:i,...a},e));i.displayName="TableRow"},3984:function(e,t,a){a.d(t,{m:function(){return M}});var l=a(2265),n=a(2112),r=a(6373),s=a(9965),i=a(4010),c=a(7511);let o=l.createContext({activeTab:"",setActiveTab:()=>{}}),m=(0,n.R)(({className:e,value:t,children:a,onClick:n,as:m="button",role:d="tab",...u},f)=>{let{activeTab:h,setActiveTab:M}=l.useContext(o),p=h===t;return l.createElement(c.G,{...u,role:d,as:m,id:`${t}-tab`,"aria-selected":p,"aria-controls":`${t}-panel`,tabIndex:p?void 0:-1,className:(0,s.A)(i.M.TabsItem,(0,r.T2)(i.M.TabsItem,"active",h===t),e),ref:f,onClick:e=>{(0,r.YX)(n)&&n?.(e),M(t)}},a)});m.displayName="Tabs.Item";let d=e=>l.isValidElement(e),u=(0,n.R)(({className:e,children:t,indicatorPosition:a,spacing:n,role:m="tablist",...u},f)=>{let h=l.useRef(null),{activeTab:M,setActiveTab:p}=l.useContext(o);l.useImperativeHandle(f,()=>h.current);let v=l.useMemo(()=>l.Children.toArray(t).map(e=>{if(e&&d(e))return e.props.value}).filter(e=>!!e),[t]),E=v.indexOf(M),g=l.useCallback(()=>{let e=E===v.length-1?0:E+1,t=h.current?.querySelectorAll("button")??[];for(;t[e].disabled;)e===v.length-1?e=0:e++;let a=v[e];if(a){p(a);let l=t[e];l?.focus(),l?.click()}},[E,p,v]),w=l.useCallback(()=>{let e=0===E?v.length-1:E-1,t=h.current?.querySelectorAll("button")??[];for(;t[e].disabled;)0===e?e=v.length-1:e--;let a=v[e];if(a){p(a);let l=t[e];l?.focus(),l?.click()}},[E,p,v]),b=l.useCallback(e=>{switch(e.key){case"ArrowLeft":e.preventDefault(),e.stopPropagation(),w();break;case"ArrowUp":case"ArrowRight":e.preventDefault(),e.stopPropagation(),g()}},[w,g]);return l.createElement(c.G,{...u,role:m,onKeyDown:b,className:(0,s.A)(i.M.TabsList,a?(0,r.wq)(i.M.TabsList,a):null,n?(0,r.wq)(i.M.TabsList,n):null,e),ref:h},t)});u.displayName="Tabs.List";let f=(0,n.R)(({className:e,value:t,children:a,role:n="tabpanel",...m},d)=>{let{activeTab:u,isLazy:f}=l.useContext(o);return f&&u!==t?null:l.createElement(c.G,{...m,role:n,id:`${t}-panel`,"aria-labelledby":`${t}-tab`,className:(0,s.A)(i.M.TabsPanel,(0,r.T2)(i.M.TabsPanel,"active",u===t),e),ref:d},a)});f.displayName="Tabs.Panel";let h=(0,n.R)(({children:e,defaultValue:t,className:a,value:n,onValueChange:m,isLazy:d,...u},f)=>{let h=void 0!==n,[M,p]=l.useState(()=>h?n:t),v=h?n:M??"",E=l.useCallback(e=>{(0,r.mf)(m)&&m(e),h||p(e)},[m,h]),g=l.useMemo(()=>({activeTab:v,isLazy:d,setActiveTab:E}),[v,E,d]);return l.createElement(o.Provider,{value:g},l.createElement(c.G,{...u,ref:f,className:(0,s.A)(a,i.M.Tabs)},e))});h.displayName="Tabs.Container";let M=Object.assign((0,n.R)(({items:e,indicatorPosition:t,justifyContent:a,spacing:n,...r},s)=>l.createElement(h,{...r,ref:s},l.createElement(u,{indicatorPosition:t,justifyContent:a,spacing:n},e?.map(({value:e,label:t,content:a,...n})=>l.createElement(m,{...n,key:e,value:e},t))),e?.map(({value:e,content:t,isDisabled:a})=>l.createElement(f,{key:e,value:e,isDisabled:a},t)))),{Item:m,List:u,Panel:f,Container:h});M.displayName="Tabs"},7757:function(e,t,a){a.d(t,{T:function(){return i}});var l=a(2265),n=a(9965),r=a(4010),s=a(7511);let i=(0,a(2112).R)(({as:e="span",children:t,className:a,...i},c)=>l.createElement(s.G,{as:e,className:(0,n.A)(r.M.VisuallyHidden,a),ref:c,...i},t));i.displayName="VisuallyHidden"}}]);