import{d as S,r as c,o as i,c as H,a as y,w as F,b as v,T as z,e as s,f as X,v as ce,g as Pe,i as me,h as $,j as Me,p as E,k as q,l as C,F as de,m as he,n as T,q as Y,t as B,s as ze,u as J,x as w,y as ye,z as ge,A as Ke,B as Z,C as Qe,D as Xe}from"./vendor.af505df4.js";const Ye=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const _ of d.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&o(_)}).observe(document,{childList:!0,subtree:!0});function n(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerpolicy&&(d.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?d.credentials="include":t.crossorigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(t){if(t.ep)return;t.ep=!0;const d=n(t);fetch(t.href,d)}};Ye();var Je="/css-maximum-reversi/assets/cmr_opening.4f5e5ff3.mp3",Ze="/css-maximum-reversi/assets/cmr_main.fb183609.mp3",es="/css-maximum-reversi/assets/cmr_ending.62baf71e.mp3";var b=(e,a)=>{const n=e.__vccOpts||e;for(const[o,t]of a)n[o]=t;return n};const ee=e=>(E("data-v-4ea29986"),e=e(),q(),e),ss={key:0,class:"modal-backdrop"},ts={key:0,class:"modal"},as={class:"modal-content"},ns=ee(()=>s("h2",null,"New Game",-1)),ls=C(" Start a new game! "),os={class:"turn"},is=ee(()=>s("span",{class:"name"},"Turn",-1)),rs={class:"next-btn"},us=ee(()=>s("label",{class:"disk-btn","data-tg-off":"1st","data-tg-on":"2nd",for:"turn"},null,-1)),cs={class:"level"},ds={class:"tabs"},vs=ee(()=>s("label",{class:"tab",for:"easy"},[s("span",{class:"easy-symbol"}),C("Easy")],-1)),ps=ee(()=>s("label",{class:"tab",for:"normal"},[s("span",{class:"normal-symbol"}),C("Normal")],-1)),_s=ee(()=>s("span",{class:"glider"},null,-1)),fs={class:"modal-action"},ms=S({props:{isOpen:{type:Boolean}},emits:["start","cancel"],setup(e,{emit:a}){const n=c(!1);let o=c(!1);const t=c("normal"),d=()=>{o.value?a("start",{turn:n.value==!1?1:2,level:t.value}):a("cancel"),n.value=!1,o.value=!1,t.value="normal"},_=c(!1),h=c(null);return(f,p)=>(i(),H(Me,{to:"body"},[y(z,{name:"fade",onAfterEnter:p[6]||(p[6]=u=>_.value=!0)},{default:F(()=>[e.isOpen?(i(),v("div",ss,[y(z,{name:"fade",onAfterLeave:p[5]||(p[5]=u=>d())},{default:F(()=>[_.value?(i(),v("div",ts,[s("div",as,[ns,ls,s("div",os,[is,s("div",rs,[X(s("input",{id:"turn",class:"disk disk-flip",type:"checkbox","onUpdate:modelValue":p[0]||(p[0]=u=>n.value=u)},null,512),[[ce,n.value]]),us])]),s("div",cs,[s("div",ds,[X(s("input",{type:"radio",id:"easy",value:"easy","onUpdate:modelValue":p[1]||(p[1]=u=>t.value=u)},null,512),[[Pe,t.value]]),vs,X(s("input",{type:"radio",id:"normal",value:"normal","onUpdate:modelValue":p[2]||(p[2]=u=>t.value=u)},null,512),[[Pe,t.value]]),ps,_s])])]),s("div",fs,[s("button",{ref_key:"startRef",ref:h,class:"btn new-game",onClick:p[3]||(p[3]=u=>{me(o)?o.value=!0:o=!0,_.value=!1})},"Start",512),s("button",{class:"btn",onClick:p[4]||(p[4]=u=>_.value=!1)},"Cancel")])])):$("",!0)]),_:1})])):$("",!0)]),_:1})]))}});var hs=b(ms,[["__scopeId","data-v-4ea29986"]]);const ys={class:"board"},gs=["onClick"],$s=S({props:{cells:null,selfCandidates:null,prevPlacedCell:null,prePlaceCell:null,currentTurn:null},emits:["prePlace","endPrePlace"],setup(e,{emit:a}){const n=e,o=d=>[18,22,50,54].includes(d),t=d=>n.selfCandidates.some(_=>_==d);return(d,_)=>(i(),v("div",ys,[(i(!0),v(de,null,he(e.cells,(h,f)=>(i(),v("div",{class:T(["cell",{candidate:t(f),"prev-placed":f==e.prevPlacedCell,"cell-circle":o(f)}]),onClick:p=>a("prePlace",f)},[h>0?(i(),v("div",{key:0,class:T(["disk black",{"black-back":h!=1}])},null,2)):$("",!0),h>0?(i(),v("div",{key:1,class:T(["disk white",{"white-front":h==2}])},null,2)):$("",!0),e.prePlaceCell==f?(i(),v("div",{key:2,class:T(["pre-place-disk",{black:e.currentTurn==1}]),onAnimationend:_[0]||(_[0]=p=>a("endPrePlace"))},null,34)):$("",!0)],10,gs))),256))]))}});var ks=b($s,[["__scopeId","data-v-47c21940"]]);const bs={class:"area-gauge-wrapper"},ws={class:"area-gauge"},xs={class:"gauge-num"},Ss=S({props:{selfTurn:null,selfGauge:null},setup(e){return(a,n)=>(i(),v("div",bs,[s("div",ws,[s("div",{class:T(["top",{black:e.selfTurn!=1}]),style:Y({height:100-e.selfGauge+"%"})},null,6),s("div",{class:T(["bottom",{black:e.selfTurn==1}]),style:Y({height:e.selfGauge+"%"})},null,6)]),s("div",xs,B(e.selfGauge)+" %",1)]))}});var Cs=b(Ss,[["__scopeId","data-v-404d13fc"]]);const Ts={},Is={class:"gg-heart"};function Ps(e,a){return i(),v("i",Is)}var Ms=b(Ts,[["render",Ps],["__scopeId","data-v-5ccbaa70"]]);const Ns={},As={class:"gg-sand-clock"};function Os(e,a){return i(),v("i",As)}var Bs=b(Ns,[["render",Os],["__scopeId","data-v-3de014c4"]]);const Gs={class:"chalkboard"},Fs={class:"state"},Ls={class:"symbol"},Rs={class:"contents"},Ds={class:"time"},Vs={class:"symbol"},Es=S({props:{resultName:null,finalMinute:{type:Boolean},timeLeft:null},setup(e){return(a,n)=>(i(),v("div",Gs,[s("div",Fs,[s("span",Ls,[y(Ms)]),s("span",Rs,B(e.resultName),1)]),s("div",Ds,[s("span",Vs,[y(Bs)]),s("span",{class:T(["contents",{"final-minute":e.finalMinute}])},B(e.timeLeft),3)])]))}});var qs=b(Es,[["__scopeId","data-v-e52b36fc"]]);const Us=e=>(E("data-v-e8681bf8"),e=e(),q(),e),Ws={class:"name"},js={class:"score"},Hs={class:"number"},zs=C(),Ks=Us(()=>s("span",null,"disks",-1)),Qs={class:"passes"},Xs={class:"number"},Ys=C(" passes"),Js=S({props:{turn:null,name:null,score:null,passes:null,thinking:{type:Boolean},level:null},setup(e){const a=e,n=()=>a.name=="AI"?a.level+"-symbol":"";return(o,t)=>(i(),v("div",{class:T(["player",{glow:e.thinking,black:e.turn==1,white:e.turn==2,thinking:e.thinking}])},[s("div",Ws,[s("div",{class:T(n())},B(e.name),3)]),s("div",js,[s("span",Hs,B(e.score),1),zs,Ks]),s("div",Qs,[s("span",Xs,B(e.passes),1),Ys])],2))}});var Ne=b(Js,[["__scopeId","data-v-e8681bf8"]]);const Zs={},et=e=>(E("data-v-0679dea8"),e=e(),q(),e),st={class:"wrapper"},tt=et(()=>s("div",{class:"inner"},[s("span")],-1)),at=[tt];function nt(e,a){return i(),v("div",st,at)}var lt=b(Zs,[["render",nt],["__scopeId","data-v-0679dea8"]]);const ot={key:0,class:"announce"},it={class:"call"},rt=S({props:{isOpen:{type:Boolean}},emits:["close"],setup(e,{emit:a}){return(n,o)=>(i(),H(z,{name:"fade",onAnimationend:o[0]||(o[0]=t=>a("close"))},{default:F(()=>[e.isOpen?(i(),v("div",ot,[s("div",it,[ze(n.$slots,"default",{},void 0,!0)])])):$("",!0)]),_:3}))}});var Ae=b(rt,[["__scopeId","data-v-6890716e"]]);const ut={},ct={class:"gg-volume"};function dt(e,a){return i(),v("i",ct)}var $e=b(ut,[["render",dt],["__scopeId","data-v-a34d41f8"]]);const I=e=>new Promise(a=>setTimeout(a,e)),x=(e,a)=>e+Math.floor(Math.random()*(a-e+1));const vt={key:0,class:"speech-balloon"},pt=["innerHTML"],_t={key:0,class:"thinking-balloon"},ft={class:"maxim"},mt=S({props:{isOpen:{type:Boolean}},setup(e){const a=c(1),n=c(!1),o=c(!1),t=J(['This is &quot;<span class="marked blue-line">CSS Maximum Reversi.</span>','This is created by <span class="marked green-line">hinastory</span>.','Opening BGM title is &quot;<span class="marked orange-line">Maximum The CSS</span>&quot;.','Main BGM title is &quot;<span class="marked yellow-line">CSS MEETS VUE</span>&quot;.','Ending BGM title is &quot;<span class="marked pink-line">NO CSS NO LIFE</span>&quot;.']),d=J(["Change before you have to.","If you can dream it, you can do it.","If you can imagine it, you can make it.","Peace begins with a smile.","Everything is practice.","If you want to be happy, be.","Happiness depends upon ourselves.","Good artists copy, great artists steal.","Imagination means nothing without doing.","Everybody has talent, but ability takes hard work.","Information is not knowledge.","Name the greatest of all inventors. Accident.","Every day is a new day.","To live is to think.","I think, therefore I am.","The die is cast.","Stay hungry. Stay foolish.","Fear always springs from ignorance.","The first and best victory is to conquer self.","Often you have to rely on intuition.","A goal without a plan is just a wish.","Patience is also a form of action.","Do something worth remembering.","I am free, that is why I\u2019m lost.","Love truth, but pardon error.","The more you reason the less you create.","Find purpose, the means will follow.","I do not seek, I find.","Without haste, but without rest.","Never, never, never, never give up.","Things do not change; we change.","Keep looking up.. That\u2019s the secret of life..","Quality questions create a quality life.","Hell is other people.","Conquer yourself rather than the world.","Example is leadership.","As you think, so shall you become.","Truth is always strange, stranger than fiction.","The cry of equality pulls everyone down.","When you learn, teach, when you get, give.","Be happy, but never satisfied.","In the middle of difficulty lies opportunity.","Think rich, look poor.","To understand is to perceive patterns.","Don\u2019t find fault,find a remedy.","Peace begins with a smile.","Now or never!","Don\u2019t think, feel!","No pain, no gain.","Be a giver!","Whatever you are, be a good one.","There is always light behind the clouds.","Never regret anything that made you smile.","Quality means doing it right when no one is looking.","Fate shuffles the cards and we play.","God is in the details.","Go figure. Nobody lent me a brain."]),_=async()=>{await I(x(7e3,15e3)),n.value=!0,a.value=x(0,t.length-1),await I(x(1e4,15e3)),n.value=!1},h=async()=>{await I(x(7e3,15e3)),o.value=!0,a.value=x(0,d.length-1),await I(x(1e4,15e3)),o.value=!1};return _(),(f,p)=>(i(),v(de,null,[y(z,{name:"fade",onAfterLeave:p[0]||(p[0]=u=>h())},{default:F(()=>[n.value?(i(),v("div",vt,[s("span",{class:"content",innerHTML:w(t)[a.value]},null,8,pt)])):$("",!0)]),_:1}),y(z,{name:"fade",onAfterLeave:p[1]||(p[1]=u=>_())},{default:F(()=>[o.value?(i(),v("div",_t,[s("span",ft,B(w(d)[9]),1)])):$("",!0)]),_:1})],64))}});var ht=b(mt,[["__scopeId","data-v-1f14cc7a"]]);const ke=e=>(E("data-v-d5533ae6"),e=e(),q(),e),yt={class:"scene"},gt=ke(()=>s("div",null,"CSS",-1)),$t=ke(()=>s("div",null,"Maximum",-1)),kt=ke(()=>s("div",null,"Reversi",-1)),bt=[gt,$t,kt],wt=S({setup(e){ye(n=>({ee1e654e:a.value}));const a=c("#f40");return(n,o)=>(i(),v("div",yt,bt))}});var xt=b(wt,[["__scopeId","data-v-d5533ae6"]]);const St={class:"scene"},Ct={key:0},Tt={key:1,class:"dance"},It=ge("<span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>I</span><span data-v-420552f1>m</span><span data-v-420552f1>a</span><span data-v-420552f1>g</span><span data-v-420552f1>e</span><span data-v-420552f1>.</span>\xA0\xA0 <span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>S</span><span data-v-420552f1>V</span><span data-v-420552f1>G</span><span data-v-420552f1>.</span>",17),Pt=[It],Mt={key:0},Nt={key:1,class:"dance"},At=ge("<span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>E</span><span data-v-420552f1>m</span><span data-v-420552f1>o</span><span data-v-420552f1>j</span><span data-v-420552f1>i</span><span data-v-420552f1>.</span>\xA0\xA0 <span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>C</span><span data-v-420552f1>a</span><span data-v-420552f1>n</span><span data-v-420552f1>v</span><span data-v-420552f1>a</span><span data-v-420552f1>s</span><span data-v-420552f1>.</span>",20),Ot=[At],Bt={key:0},Gt={key:1,class:"dance"},Ft=ge("<span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>W</span><span data-v-420552f1>e</span><span data-v-420552f1>b</span><span data-v-420552f1>G</span><span data-v-420552f1>L</span><span data-v-420552f1>.</span>\xA0\xA0 <span data-v-420552f1>N</span><span data-v-420552f1>o</span>\xA0<span data-v-420552f1>A</span><span data-v-420552f1>j</span><span data-v-420552f1>a</span><span data-v-420552f1>x</span><span data-v-420552f1>.</span>",18),Lt=[Ft],Rt=S({setup(e){const a=_=>new Promise(h=>setTimeout(h,_)),n=c(!1),o=c(!1),t=c(!1);return(async()=>{n.value=!0,await a(3e3),o.value=!0,await a(3e3),t.value=!0})(),(_,h)=>(i(),v("div",St,[s("div",null,[n.value?$("",!0):(i(),v("div",Ct,"\xA0")),n.value?(i(),v("div",Tt,Pt)):$("",!0)]),s("div",null,[o.value?$("",!0):(i(),v("div",Mt,"\xA0")),o.value?(i(),v("div",Nt,Ot)):$("",!0)]),s("div",null,[t.value?$("",!0):(i(),v("div",Bt,"\xA0")),t.value?(i(),v("div",Gt,Lt)):$("",!0)])]))}});var Dt=b(Rt,[["__scopeId","data-v-420552f1"]]);const ve=e=>(E("data-v-20f3ce20"),e=e(),q(),e),Vt={class:"scene"},Et=ve(()=>s("div",null,"CSS Maximum Reversi",-1)),qt=ve(()=>s("div",null,[s("div",null,"explore the best of Reversi UI/UX"),s("div",null,[C(" with "),s("span",{class:"css"},"CSS 3"),C(" and "),s("span",{class:"vue"},"Vue 3")])],-1)),Ut=ve(()=>s("div",null,[s("div",null,"Source Code:"),s("div",null,[C("GitHub "),s("a",{href:"https://github.com/hinastory/css-maximum-reversi",class:"link",target:"_blank"},"hinastory/css-maximum-reversi")])],-1)),Wt=ve(()=>s("div",{style:{display:"block",width:"100px"}},null,-1)),jt={class:"volume"},Ht=S({props:{volumeFlag:{type:Boolean}},emits:["change-volume","next"],setup(e,{emit:a}){ye(o=>({"6c9dc3d6":n.value}));const n=c("#f40");return(o,t)=>(i(),v("div",Vt,[Et,qt,Ut,s("div",null,[Wt,s("div",{class:"next",onClick:t[0]||(t[0]=d=>a("next")),ref:"nextRef"},"Next",512),s("div",jt,[X(s("input",{id:"volume",type:"checkbox","onUpdate:modelValue":t[1]||(t[1]=d=>me(volumeFlag)?volumeFlag.value=d:null)},null,512),[[ce,e.volumeFlag]]),s("label",{for:"volume",onClick:t[2]||(t[2]=d=>a("change-volume",e.volumeFlag))},[y($e,{style:{"--ggs":"1"}})])])])]))}});var zt=b(Ht,[["__scopeId","data-v-20f3ce20"]]);const Kt=e=>(E("data-v-09a3cc67"),e=e(),q(),e),Qt={class:"opening"},Xt=Kt(()=>s("div",{class:"stars"},[s("div",{class:"small"}),s("div",{class:"medium"}),s("div",{class:"big"})],-1)),Yt=S({props:{volumeFlag:{type:Boolean}},emits:["changeVolume","next"],setup(e,{emit:a}){ye(u=>({"7d5940e7":d.value,"7b9ed839":_.value,"6296e7e0":h.value}));const n=c([]),o=u=>n.value.includes(u),t=u=>{let m=[];for(let A=0;A<u;A++)m.push(`${x(0,800)}px ${x(0,3e3)}px #FFF`);return m},d=c(t(300)),_=c(t(100)),h=c(t(50)),f=async()=>{n.value.push(0),await I(9e3),n.value.push(1),await I(15400),n.value.push(2)},p=u=>{a("changeVolume",u)};return f(),(u,m)=>(i(),v("div",Qt,[Xt,o(0)?(i(),H(xt,{key:0})):$("",!0),o(1)?(i(),H(Dt,{key:1})):$("",!0),o(2)?(i(),H(zt,{key:2,"volume-flag":e.volumeFlag,onNext:m[0]||(m[0]=A=>a("next")),onChangeVolume:p},null,8,["volume-flag"])):$("",!0)]))}});var Jt=b(Yt,[["__scopeId","data-v-09a3cc67"]]);const Zt={class:"player-wrapper"},ea={key:0,class:"confetti back"},sa={key:0,class:"result-text"},ta={class:"name"},aa={class:"score"},na={class:"number"},la=C(" disks"),oa={class:"passes"},ia={class:"number"},ra=C(" passes"),ua={key:1,class:"confetti front"},ca=S({props:{turn:null,player:null,name:null,score:null,totalScore:null,passes:null,result:null},setup(e){const a=e,n=G=>G?"Winner":"Lose",o=()=>a.player!=a.result&&a.result!=3,t=3e3,d=500,_=30,h=["#e290a7","#2f7ba1","#d2b155","#f1e53e","#ac7db1","#d62d81","#d84d2a","#96d3d6","#3f8f4a","#e79549"],f=G=>{const K=[];for(let P=1;P<=G;P++){const U=x(0,t*.5),ne={left:`${P*(100/(G+1))}%`,width:`${x(6,12)}px`,height:`${x(6,12)}px`,transform:`rotate(${x(-80,80)}deg)`,"animation-delay":`${U}ms`,"animation-duration":`${x(t*.7,t*1.2)}ms`},se={"animation-delay":`${U}ms`,"animation-duration":`${x(d*.7,d*1.2)}ms`,"background-color":h[x(0,10)]};K.push([ne,se])}return K},p=J(f(_*.3)),u=J(f(_*.7)),m=()=>`confettiMove${x(1,6)}`,A=()=>`confettiRotate${x(1,3)}`;return(G,K)=>(i(),v("div",Zt,[e.result==e.player?(i(),v("div",ea,[(i(!0),v(de,null,he(w(u),P=>(i(),v("span",{class:T(["piece",m()]),style:Y(P[0])},[s("span",{class:T(["piece-inner",A()]),style:Y(P[1])},null,6)],6))),256))])):$("",!0),s("div",{class:T(["player",{black:e.turn==1,winner:e.result==e.player,lose:o(),"draw-left":e.result==3&&e.player==1,"draw-right":e.result==3&&e.player==2}])},[e.result!=3?(i(),v("span",sa,B(n(e.result==e.player)),1)):$("",!0),s("div",ta,B(e.name),1),s("div",aa,[s("span",na,B(e.score),1),la]),s("div",oa,[s("span",ia,B(e.passes),1),ra])],2),e.result==e.player?(i(),v("div",ua,[(i(!0),v(de,null,he(w(p),P=>(i(),v("span",{class:T(["piece",m()]),style:Y(P[0])},[s("span",{class:T(["piece-inner",A()]),style:Y(P[1])},null,6)],6))),256))])):$("",!0)]))}});var Oe=b(ca,[["__scopeId","data-v-f60c2382"]]);const N=e=>(E("data-v-e0da363e"),e=e(),q(),e),da={key:0,class:"credit"},va=N(()=>s("div",{class:"item title"},"CSS Maximum Reversi",-1)),pa=N(()=>s("div",{class:"item"},"\u301C CSS Limits God Only Knows \u301C",-1)),_a=N(()=>s("div",{class:"item"},"Staff",-1)),fa=N(()=>s("div",{class:"item"},[s("span",{class:"role"},"Programmer"),C("hinastory")],-1)),ma=N(()=>s("div",{class:"item"},[s("span",{class:"role"},"Graphic Designer"),C("hinastory")],-1)),ha=N(()=>s("div",{class:"item"},[s("span",{class:"role"},"Motion Designer"),C("hinastory")],-1)),ya=N(()=>s("div",{class:"item"},[s("span",{class:"role"},"Music Composer"),C("hinastory")],-1)),ga=N(()=>s("div",{class:"item"},"Special Thanks",-1)),$a=N(()=>s("div",{class:"item"},"CSS Creator and Contributors",-1)),ka=N(()=>s("div",{class:"item"},"Vue Creator and Contributors",-1)),ba=N(()=>s("div",{class:"item"},"CodePen and CSS Special Works",-1)),wa=N(()=>s("div",{class:"item"},"and All Software Contributors...",-1)),xa=S({props:{isOpen:{type:Boolean}},emits:["end","fadeout"],setup(e,{emit:a}){return(n,o)=>(i(),H(z,{name:"fade",onAfterLeave:o[1]||(o[1]=t=>a("fadeout"))},{default:F(()=>[e.isOpen?(i(),v("div",da,[va,pa,_a,fa,ma,ha,ya,ga,$a,ka,ba,wa,s("div",{class:"item",onAnimationend:o[0]||(o[0]=t=>a("end"))},"and you...",32)])):$("",!0)]),_:1}))}});var Sa=b(xa,[["__scopeId","data-v-e0da363e"]]);const Ca=e=>(E("data-v-88d2c152"),e=e(),q(),e),Ta={key:0,class:"game-ending"},Ia={key:0,class:"result-board"},Pa={key:0,class:"draw"},Ma={class:"action"},Na=Ca(()=>s("div",{style:{display:"block",width:"120px"}},null,-1)),Aa={class:"volume"},Oa=S({props:{isOpen:{type:Boolean},gameResult:null,playerName:null,selfTurn:null,selfScore:null,selfPasses:null,opponentScore:null,opponentPasses:null,volumeFlag:{type:Boolean}},emits:["change","start","next"],setup(e,{emit:a}){const n=e,o=c(n.selfScore+n.opponentScore),t=c(!1),d=c(!0),_=c(null);Ke(()=>{n.isOpen&&_.value.focus()});const h=async()=>{await I(14e3),d.value=!1},f=async()=>{t.value=!1,d.value=!0,a("next")};return(p,u)=>(i(),H(Me,{to:"body"},[y(z,{name:"fade",onAfterEnter:u[5]||(u[5]=m=>h())},{default:F(()=>[e.isOpen?(i(),v("div",Ta,[y(z,{name:"fade",onAfterLeave:u[0]||(u[0]=m=>t.value=!0)},{default:F(()=>[d.value?(i(),v("div",Ia,[e.gameResult==3?(i(),v("div",Pa,"Draw")):$("",!0),y(Oe,{turn:e.selfTurn%2+1,player:2,name:e.playerName[1],score:e.opponentScore,"total-score":o.value,passes:e.opponentPasses,result:e.gameResult},null,8,["turn","name","score","total-score","passes","result"]),y(Oe,{turn:e.selfTurn,player:1,name:e.playerName[0],score:e.selfScore,"total-score":o.value,passes:e.selfPasses,result:e.gameResult},null,8,["turn","name","score","total-score","passes","result"])])):$("",!0)]),_:1}),y(Sa,{"is-open":t.value,onEnd:u[1]||(u[1]=m=>t.value=!1),onFadeout:u[2]||(u[2]=m=>d.value=!0)},null,8,["is-open"]),s("div",Ma,[Na,s("div",{class:"next",onClick:f,ref_key:"nextRef",ref:_},"Next",512),s("div",Aa,[X(s("input",{id:"volume",type:"checkbox","onUpdate:modelValue":u[3]||(u[3]=m=>me(volumeFlag)?volumeFlag.value=m:null)},null,512),[[ce,e.volumeFlag]]),s("label",{for:"volume",onClick:u[4]||(u[4]=m=>a("change",e.volumeFlag))},[y($e,{style:{"--ggs":"2"}})])])])])):$("",!0)]),_:1})]))}});var Ba=b(Oa,[["__scopeId","data-v-88d2c152"]]);const Ga=[[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]],Be=(e,a,n)=>{const[o,t]=[a%8,Math.floor(a/8)];let d=0;return Ga.forEach(([_,h])=>{let[f,p]=[o,t],u=0;for(;;){[f,p]=[f+_,p+h];let m=0;if(f<0||f>7||p<0||p>7||(m=n[p][f],m<=0)){u=0;break}else if(m==e)break;u++}[f,p]=[o,t],d+=u;for(let m=0;m<u;m++)[f,p]=[f+_,p+h],n[p][f]=e}),d==0?[!1,[[]]]:[!0,n]};function Fa(){return new Worker("/css-maximum-reversi/assets/searcher.a2f9f0fa.js",{type:"module"})}const pe=e=>(E("data-v-765c4381"),e=e(),q(),e),La={class:"screen"},Ra=pe(()=>s("source",{src:Je},null,-1)),Da=[Ra],Va=pe(()=>s("source",{src:Ze},null,-1)),Ea=[Va],qa=pe(()=>s("source",{src:es},null,-1)),Ua=[qa],Wa={class:"left status-column"},ja={class:"player-wrapper"},Ha={class:"action"},za={class:"volume"},Ka=C("Pass"),Qa=pe(()=>s("div",{class:"final-minute"},"Final Minute!",-1)),Xa={class:"board-edge"},Ya={class:"board-wrapper"},Ja={class:"right status-column"},Za=S({setup(e){const a=["You","AI"],n=c(1),o=c(!1),t=r=>r%2+1,d=Z(()=>t(n.value)),_=c(0),h=c(!1),f=c(!1),p=c(!1),u=c(!1),m=c(!1),A=c(!1),G=c(0),K=r=>r==k.value&&D.value==0&&!f.value,P=c(!1),U=c(!1),ne=c(new Date),se=c(new Date),Ge=c(60*10),Q=c(-1),O=c(!1),be=c(null),we=c(null),xe=c(null),le=c("normal");let oe=Array(64).fill(0),Se=new Date;const te=c(-1),Fe=async()=>{for(;;)D.value==0&&!U.value&&!m.value&&(se.value=new Date),await I(1e3)},Le=Z(()=>{let r=Math.floor((se.value.getTime()-ne.value.getTime())/1e3);if(r=Ge.value-r,r<=0)return u.value=!0,U.value=!0,R.splice(0,R.length),o.value=!0,"00:00";r<=60&&u.value==!1&&D.value==0&&!m.value&&(u.value=!0,document.hidden||(p.value=!0));const l=r%60,g=(r-l)/60;return`${("00"+g).slice(-2)}:${("00"+l).slice(-2)} `}),k=c(1),M=J(Array(64).fill(0)),ie=()=>{const r=[],l=M.concat();for(;l.length;)r.push(l.splice(0,8));return r},L=(r,l)=>{const g={main:be,opening:we,ending:xe};if(r&&O.value){for(let[,V]of Object.entries(g))V.value.pause();return}for(let[V,ae]of Object.entries(g))V==l?(ae.value.muted=!1,ae.value.volume=.2,ae.value.play()):(ae.value.muted=!0,ae.value.play())},_e=new Fa,Ce=()=>{if(M.filter(r=>r==0).length==1){const r=M.indexOf(0),l=t(k.value),g=ie(),[V]=Be(l,r,g);if(!V)return P.value=!0,h.value=!0,O.value&&L(!1,"ending"),!0}return!1},Re=async(r,l)=>{const V=new Date().getTime()-Se.getTime()<1500?1500:100;if(await I(V),r>=0)Q.value=r,oe=l.flat(),te.value=-1;else{if(Ce()||j.value==0)return;A.value=!0,G.value+=1,k.value=t(k.value),ue(),console.log("no")}},De=r=>{for(const l of r)R.push(l);if(R.length==0){if(D.value!=0||Ce())return;A.value=!0,_.value+=1,k.value=t(k.value),fe()}};_e.addEventListener("message",async r=>{if(r.data.type=="best"){const[,l,g]=r.data.data;await Re(l,g)}else r.data.type=="candidate"&&De(r.data.data)},!1);const R=J([]),Ve=r=>{if(U.value||n.value!=k.value)return;const l=ie();if(M[r]==0){const[g,V]=Be(k.value,r,l);if(!g)return;Q.value=r,oe=V.flat(),te.value=-1}},Ee=async()=>{if(oe.flat().forEach((r,l)=>{M[l]=r}),R.splice(0,R.length),M[Q.value]=k.value,te.value=Q.value,Q.value=-1,oe=[],M.filter(r=>r==0).length==0){h.value=!0,O.value&&L(!1,"ending");return}k.value==n.value?(k.value=t(k.value),fe()):(await I(1e3),k.value=t(k.value),ue()),D.value!=0&&D.value!=4&&(h.value=!0,O.value&&L(!1,"ending"))},re=(r,l,g)=>M[r+l*8]=g,Te=r=>M.filter(l=>l==r).length,W=Z(()=>Te(n.value)),j=Z(()=>Te(d.value)),qe=Z(()=>W.value+j.value==0?50:Math.floor(W.value/(W.value+j.value)*100)),D=Z(()=>M.filter(l=>l==0).length==64?0:U.value?4:W.value==0?2:j.value==0?1:M.filter(l=>l==0).length==0||P.value==!0?W.value>j.value?1:W.value<j.value?2:3:0),Ue=["In Play",`${a[0]} Win`,`${a[0]} Lose`,"Draw","Time is up"],Ie=()=>{re(3,3,2),re(4,3,1),re(3,4,1),re(4,4,2)},ue=()=>{const r=ie();_e.postMessage({type:"candidate",data:{turn:k.value,matrix:r}})},fe=async()=>{Se=new Date,await I(100);const r=ie(),l=le.value=="normal"?5:1;_e.postMessage({type:"best",data:{turn:k.value,level:l,matrix:r}})},We=async({turn:r,level:l})=>{O.value&&L(!1,"opening"),f.value=!0,await I(2e3),M.fill(0),m.value=!0,await I(2e3),le.value=l,o.value=!1,te.value=-1,R.splice(0,R.length),n.value=r,P.value=!1,k.value=1,U.value=!1,u.value=!1,Ie(),_.value=0,G.value=0,m.value=!0},je=async()=>{m.value=!1,ne.value=new Date,se.value=new Date,await I(1500),O.value&&L(!1,"main"),n.value==2?fe():ue()},He=()=>{o.value=!1,O.value&&L(!1,"main")};return Ie(),ue(),Fe(),(r,l)=>(i(),v("div",La,[s("audio",{ref_key:"openingBGM",ref:we,loop:""},Da,512),s("audio",{ref_key:"mainBGM",ref:be,loop:""},Ea,512),s("audio",{ref_key:"endingBGM",ref:xe,loop:""},Ua,512),y(hs,{isOpen:o.value,onCancel:l[0]||(l[0]=g=>He()),onStart:We},null,8,["isOpen"]),y(Ba,{isOpen:h.value,gameResult:w(D),playerName:a,selfTurn:n.value,selfScore:w(W),selfPasses:_.value,opponentScore:w(j),opponentPasses:G.value,volumeFlag:O.value,onChange:l[1]||(l[1]=g=>L(!0,"ending")),onNext:l[2]||(l[2]=g=>{h.value=!1,o.value=!0})},null,8,["isOpen","gameResult","selfTurn","selfScore","selfPasses","opponentScore","opponentPasses","volumeFlag"]),s("div",Wa,[s("div",ja,[y(Ne,{turn:w(d),name:a[1],score:w(j),passes:G.value,thinking:K(w(d)),level:le.value},null,8,["turn","name","score","passes","thinking","level"]),y(ht,{isOpen:!0})]),s("div",Ha,[s("div",za,[X(s("input",{id:"volume",type:"checkbox","onUpdate:modelValue":l[3]||(l[3]=g=>O.value=g)},null,512),[[ce,O.value]]),s("label",{for:"volume",onClick:l[4]||(l[4]=g=>L(!0,"main"))},[y($e,{style:{"--ggs":"2.3"}})])]),y(lt,{onClick:l[5]||(l[5]=g=>o.value=!0),disabled:k.value!=n.value&&w(D)==0},null,8,["disabled"])])]),s("div",{class:T(["board-column",{"board-spin":f.value==!0,"board-spin-stop":m.value}]),onAnimationend:l[11]||(l[11]=g=>f.value=!1)},[y(Ae,{isOpen:A.value,onClose:l[6]||(l[6]=g=>A.value=!1)},{default:F(()=>[Ka]),_:1},8,["isOpen"]),y(Ae,{isOpen:p.value,onClose:l[7]||(l[7]=g=>p.value=!1)},{default:F(()=>[Qa]),_:1},8,["isOpen"]),f.value?(i(),v("div",{key:0,class:"board-back",onAnimationend:l[10]||(l[10]=Qe(()=>{},["stop"]))},[y(Jt,{onNext:l[8]||(l[8]=g=>je()),volumeFlag:O.value,onChangeVolume:l[9]||(l[9]=g=>L(!0,"opening"))},null,8,["volumeFlag"])],32)):$("",!0),s("div",Xa,[s("div",Ya,[y(ks,{cells:w(M),selfCandidates:w(R),prevPlacedCell:te.value,prePlaceCell:Q.value,currentTurn:k.value,onPrePlace:Ve,onEndPrePlace:Ee},null,8,["cells","selfCandidates","prevPlacedCell","prePlaceCell","currentTurn"])])])],34),s("div",Ja,[y(qs,{resultName:Ue[w(D)],finalMinute:u.value,timeLeft:w(Le)},null,8,["resultName","finalMinute","timeLeft"]),y(Cs,{selfTurn:n.value,selfGauge:w(qe)},null,8,["selfTurn","selfGauge"]),y(Ne,{turn:n.value,name:a[0],score:w(W),passes:_.value,thinking:K(n.value),level:le.value},null,8,["turn","name","score","passes","thinking","level"])])]))}});var en=b(Za,[["__scopeId","data-v-765c4381"]]);const sn={setup(e){return(a,n)=>(i(),H(en))}};Xe(sn).mount("#app");