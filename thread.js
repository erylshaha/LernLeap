/* The continuous red thread that follows the scroll. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== one continuous thread =====
   A belt of tangent lines between "pulleys" (yarn balls, the cat's paw, small curls). Every join shares a tangent direction. */
const startV=views.start,svg=$('#thread'),heroBox=$('#heroBox'),logoBall=$('#logoBall');
const art2=$('#art2 img'),artRun=$('#art3 img'),sbYarn=$('#art5 .sb-yarn'),sbBody=$('#ueber .sx-body'),pk=pickers[0];
const tA=$('#tA'),tB=$('#tB'),tH=$('#tH'),tAc=$('#tAc'),pawC=$('#pawC'),svg2=$('#thread2');
const PS=[{els:[tA,tAc],L:0,ys:[],cur:0,tgt:0},{els:[tB],L:0,ys:[],cur:0,tgt:0},{els:[tH],L:0,ys:[],cur:0,tgt:0}];
let raf=0,mt=0;
const rel=el=>{const r=el.getBoundingClientRect(),m=startV.getBoundingClientRect();return{l:r.left-m.left,t:r.top-m.top,w:r.width,h:r.height}};
const TAU=Math.PI*2,mod=a=>((a%TAU)+TAU)%TAU,vec=a=>({x:Math.cos(a),y:Math.sin(a)}),rot90=u=>({x:-u.y,y:u.x});
function belt(N,offs){
  const out=[];
  for(let i=0;i<N.length-1;i++){
    const a=N[i],b=N[i+1];let P1=a.c,P2=b.c,uL,uA;
    for(let it=0;it<3;it++){
      const Dx=b.c.x-a.c.x,Dy=b.c.y-a.c.y,len=Math.hypot(Dx,Dy)||1;
      const phi=it===0?Math.atan2(Dy,Dx)-Math.asin(Math.max(-1,Math.min(1,(b.r*b.s-a.r*a.s)/len))):Math.atan2(P2.y-P1.y,P2.x-P1.x);
      const [oL,oA]=offs[i]||[-a.s*.3,b.s*.3];
      uL=vec(phi+oL);uA=vec(phi+oA);
      const nL=rot90(uL),nA=rot90(uA);
      P1={x:a.c.x-a.r*a.s*nL.x,y:a.c.y-a.r*a.s*nL.y};P2={x:b.c.x-b.r*b.s*nA.x,y:b.c.y-b.r*b.s*nA.y};
    }
    const k=.4*Math.hypot(P2.x-P1.x,P2.y-P1.y);
    out.push({P1,P2,uL,uA,c1:{x:P1.x+uL.x*k,y:P1.y+uL.y*k},c2:{x:P2.x-uA.x*k,y:P2.y-uA.y*k}});
  }
  return out;
}
const cub=s=>`C${s.c1.x} ${s.c1.y} ${s.c2.x} ${s.c2.y} ${s.P2.x} ${s.P2.y}`;
function arc(n,sIn,sOut){const a0=Math.atan2(sIn.uA.y,sIn.uA.x),a1=Math.atan2(sOut.uL.y,sOut.uL.x),d=n.s>0?mod(a1-a0):mod(a0-a1);return `A${n.r} ${n.r} 0 ${d>Math.PI?1:0} ${n.s>0?1:0} ${sOut.P1.x} ${sOut.P1.y}`}
/* same as arc(), but winds one extra full turn first (the thread trips the cat) */
function loopArc(n,sIn,sOut){const P=sIn.P2,O={x:2*n.c.x-P.x,y:2*n.c.y-P.y},sw=n.s>0?1:0;return `A${n.r} ${n.r} 0 1 ${sw} ${O.x} ${O.y}A${n.r} ${n.r} 0 1 ${sw} ${P.x} ${P.y}`+arc(n,sIn,sOut)}
const ballOf=(img,m)=>{const r=rel(img);return{c:{x:r.l+r.w*m.cx,y:r.t+r.h*m.cy},r:r.w*m.r,rect:r}};
function layoutThread(){
  const W=startV.clientWidth,H=startV.clientHeight;if(!W||startV.hidden)return;
  mt=startV.getBoundingClientRect().top+scrollY;
  [svg,svg2].forEach(v=>{v.setAttribute('width',W);v.setAttribute('height',H);v.setAttribute('viewBox',`0 0 ${W} ${H}`)});
  const UW=uw(),wide=W>=820,u=Math.max(.6,Math.min(1,W/1100));
  const hb=rel(heroBox),hx=x=>hb.l+hb.w*(x-70)/740,hy=y=>hb.t+hb.h*(y-60)/900,hs=hb.w/740;
  const B1={c:{x:hx(490),y:hy(649)},r:295*hs},B2=ballOf(art2,MET.sitc);
  /* cat: thread drops beside the text, loops once around the front leg, then sweeps left to the level picker */
  const rr=rel(artRun),PAW={x:rr.l+rr.w*.106,y:rr.t+rr.h*.735},rp=Math.max(14,rr.w*.055);
  const runSec=rel($('#lerncheck')),runBot=runSec.t+runSec.h;
  const M=pk.M,sb=rel(pk.stage),G=sb.t+M.G,pad=sb.l,xL=pad+M.gx-M.rc,CUx=pad+M.gx;
  const rV=30*u,rD=36*u,rW=28*u;
  const V={c:{x:Math.max(PAW.x-135*u-rV,xL+rW+rV+10),y:rr.t+30*u},r:rV,s:1};
  const lineY=runBot+64,D={c:{x:PAW.x-10*u,y:lineY-rD},r:rD,s:1},Wn={c:{x:xL+rW,y:lineY+rW},r:rW,s:-1};
  const CU={c:{x:CUx,y:G-M.rc},r:M.rc,s:-1};
  /* paw wrap: 1.5 helical turns round the forearm (behind, in front, behind) */
  const e1={x:.5,y:.866},e2={x:-.866,y:.5},A=rr.w*.066,bb=UW*.5,p2=UW*2.6,HS=[];
  for(let f=0;f<=3*Math.PI+1e-6;f+=Math.PI/30){const u=-A*Math.cos(f),v=-bb*Math.sin(f)+p2*(f/Math.PI-1.5);HS.push({f,x:PAW.x+u*e1.x+v*e2.x,y:PAW.y+u*e1.y+v*e2.y})}
  const Ps=HS[0],Pe=HS[HS.length-1],kk=UW*5;
  const N=[{c:B1.c,r:0,s:1},{c:B2.c,r:.72*B2.r,s:-1},{c:Ps,r:0,s:1}];
  const S=belt(N,[null,null]),SP=belt([{c:Pe,r:0,s:1},D,Wn,CU],[[0,0],[0,0],[0,0]]),endA={uL:{x:1,y:0},P1:{x:CUx,y:G}};
  const c2a={x:Ps.x-e2.x*kk,y:Ps.y-e2.y*kk},c1b={x:Pe.x+e2.x*kk,y:Pe.y+e2.y*kk};
  const dA=`M${S[0].P1.x} ${S[0].P1.y}`+cub(S[0])+arc(N[1],S[0],S[1])+`C${S[1].c1.x} ${S[1].c1.y} ${c2a.x} ${c2a.y} ${Ps.x} ${Ps.y}`+HS.slice(1).map(q=>`L${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join('')+`C${c1b.x} ${c1b.y} ${SP[0].c2.x} ${SP[0].c2.y} ${SP[0].P2.x} ${SP[0].P2.y}`+arc(D,SP[0],SP[1])+cub(SP[1])+arc(Wn,SP[1],SP[2])+cub(SP[2])+arc(CU,SP[2],endA);
  /* from the end of the level track, down to the sleeping cat's yarn, and out into a heart */
  const xe=pad+M.xe,rE=Math.max(14,20*u),EB={c:{x:xe,y:G+rE},r:rE,s:1};
  const B5=ballOf(sbYarn,{cx:.5,cy:.5,r:.49}),body=rel(sbBody),sec=rel($('#ueber'));
  const hsz=wide?2.5:2.1,hxc=wide?body.l+Math.min(70,body.w*.3):body.l+body.w*.5;
  const tipy=Math.max(sec.t+sec.h-18,body.t+body.h+16+37*hsz*1.12),rT=22*u,Tn={c:{x:hxc-rT,y:tipy},r:rT,s:-1};
  const S2=belt([EB,{c:B5.c,r:.72*B5.r,s:-1},Tn],[null,null]),endT={uL:{x:0,y:-1},P1:{x:hxc,y:tipy}};
  const hS=hsz*1.12,th=8*Math.PI/180,hq=(x,y)=>{const X=x*Math.cos(th)-y*Math.sin(th),Y=x*Math.sin(th)+y*Math.cos(th);return `${(hxc+X*hS).toFixed(1)} ${(tipy+Y*hS).toFixed(1)}`};
  const heart=`C${hq(-1,-7)} ${hq(-16.5,-9)} ${hq(-17.5,-19.5)}C${hq(-18.5,-30.5)} ${hq(-5.5,-36)} ${hq(-1.4,-25)}C${hq(1.5,-33.5)} ${hq(17.5,-32)} ${hq(17.2,-20.5)}C${hq(16.8,-10.5)} ${hq(4.5,-6.5)} ${hq(-1,1.4)}`;
  const dB=`M${xe} ${G}`+arc(EB,{uA:{x:1,y:0}},S2[0])+cub(S2[0])+arc({c:B5.c,r:.72*B5.r,s:-1},S2[0],S2[1])+cub(S2[1])+arc(Tn,S2[1],endT);
  const sw=UW.toFixed(2);[tA,tAc,tB,tH].forEach(p=>p.setAttribute('stroke-width',sw));
  tA.setAttribute('d',dA);tAc.setAttribute('d',dA);tB.setAttribute('d',dB);tH.setAttribute('d',`M${hxc} ${tipy}`+heart);
  /* front half of the loop is drawn over the cat's leg */
  const hh=UW*1.2,fr=HS.filter(q=>q.f>=Math.PI&&q.f<=2*Math.PI);
  pawC.setAttribute('points',fr.map(q=>`${(q.x+e2.x*hh).toFixed(1)},${(q.y+e2.y*hh).toFixed(1)}`).concat(fr.map(q=>`${(q.x-e2.x*hh).toFixed(1)},${(q.y-e2.y*hh).toFixed(1)}`).reverse()).join(' '));
  PS.forEach(s=>{const p=s.els[0];s.L=p.getTotalLength();s.els.forEach(e=>{e.style.strokeDasharray=`${s.L} ${s.L}`});s.ys=[];for(let l=0;l<=s.L;l+=6)s.ys.push(p.getPointAtLength(l).y)});
  calc();PS.forEach(s=>{s.cur=rm()?s.tgt:Math.min(s.cur,s.tgt)});paint();if(!rm())kickT();
}
function calc(){
  const line=scrollY+innerHeight*.72-mt,ex=[pk.stage,sbYarn];
  PS.forEach((s,i)=>{
    if(i===2){s.tgt=(rm()||PS[1].cur>=PS[1].L-.6)?s.L:0;return}
    if(rm()){s.tgt=s.L;return}
    let k=0;while(k<s.ys.length&&s.ys[k]<=line)k++;
    s.tgt=k>=s.ys.length?s.L:(k===0?0:Math.max(40,Math.min(s.L,k*6)));
    const r=ex[i].getBoundingClientRect();
    if(i===0?r.top<innerHeight*.92:r.bottom<innerHeight*.95)s.tgt=s.L;
  });
}
function kickT(){cancelAnimationFrame(raf);raf=requestAnimationFrame(ttick)}
function paint(){PS.forEach(s=>s.els.forEach(e=>{e.style.strokeDashoffset=s.L-s.cur;e.style.opacity=s.cur<2?0:1}))}
function ttick(){let busy=false;PS.forEach(s=>{s.cur+=(s.tgt-s.cur)*.14;if(Math.abs(s.tgt-s.cur)<.5)s.cur=s.tgt;else busy=true});{const ht=(rm()||PS[1].cur>=PS[1].L-.6)?PS[2].L:0;if(ht!==PS[2].tgt){PS[2].tgt=ht;busy=true}if(PS[2].cur!==PS[2].tgt)busy=true}paint();raf=busy?requestAnimationFrame(ttick):0}
function onScroll(){if(route!=='start')return;calc();kickT();if(!rm())logoBall.style.transform=`rotate(${scrollY*.35}deg)`}

(function(root){
function MeoRig(svg,opt){
  opt=opt||{};
  var q=function(id){return svg.querySelector('#r-'+id)};
  var E={tA:q('tail-a'),tB:q('tail-b'),tC:q('tail-c'),th:q('thread'),br:q('breath'),hd:q('head-tilt'),
    eL:q('ear-l'),eR:q('ear-r'),yL:q('eye-l'),yR:q('eye-r'),gz:q('gaze')};
  var P={tA:[208,572],tB:[139.6,480],tC:[138.7,400],th:[772,596],br:[430,580],hd:[440,400],
    eL:[323,166],eR:[549,173],yL:[370,295],yR:[518,300]};
  var TAU=Math.PI*2,rm=matchMedia('(prefers-reduced-motion: reduce)');
  var rot=function(a,p){return 'rotate('+a.toFixed(3)+' '+p[0]+' '+p[1]+')'};
  var sm=function(x){x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)};
  function Spring(k,c){this.k=k;this.c=c;this.x=0;this.v=0;this.t=0}
  Spring.prototype.step=function(dt){var n=Math.ceil(dt/.008),h=dt/n;for(var i=0;i<n;i++){this.v+=(this.k*(this.t-this.x)-this.c*this.v)*h;this.x+=this.v*h}return this.x};
  var head=new Spring(55,10),gx=new Spring(170,21),gy=new Spring(170,21),earL=new Spring(85,6.5),earR=new Spring(85,6.5);
  var T0=-99,wagAt=-99,wagAmp=1,happyAt=-99,blinkAt=1.6+Math.random()*2,blinkStart=-9,nextWag=5+Math.random()*4,nextEar=4+Math.random()*3,nextSac=2,sac=[0,0];
  var nx=0,ny=0,lastPtr=-99,paused=false,raf=0,last=0,visible=true,tNow=0;
  function frame(now){
    raf=requestAnimationFrame(frame);
    var t=now/1000,dt=Math.min(.033,Math.max(.001,t-last||.016));last=t;tNow=t;
    var active=t-lastPtr<2.5;if(!active){nx*=.97;ny*=.97}
    /* scheduled idle events */
    if(t>blinkAt){blinkStart=t;blinkAt=t+2.6+Math.random()*3.4;if(Math.random()<.2)blinkAt=t+.38}
    if(t>nextWag){wagAt=t;wagAmp=.6;nextWag=t+7+Math.random()*5}
    if(t>nextEar){(Math.random()<.5?earL:earR).v+=(Math.random()<.5?-1:1)*34;nextEar=t+5+Math.random()*5}
    if(t>nextSac){sac=[(Math.random()-.5)*4,(Math.random()-.5)*2.4];nextSac=t+1.6+Math.random()*2.6}
    /* head and gaze (eyes lead, head follows, ears lag) */
    var idle=1.0*Math.sin(t*TAU/11)+.6*Math.sin(t*TAU/7.3+1);
    head.t=idle+nx*2.6;head.step(dt);
    gx.t=nx*7+(active?0:sac[0]);gy.t=ny*5+(active?0:sac[1]);gx.step(dt);gy.step(dt);
    earL.t=-head.x*.55;earR.t=-head.x*.55;earL.step(dt);earR.step(dt);
    /* blink */
    var u=t-blinkStart,bl=u<0||u>.26?0:(u<.075?sm(u/.075):1-sm((u-.075)/.185));
    var sv=1-.94*bl,dy=2*bl;
    /* breath and hop (head lives inside breath so the neck never shears) */
    var b=(1-Math.cos(t*TAU/4.2))/2,hu=(t-happyAt)/1.1,hop=0,hw=0;
    if(hu>=0&&hu<1){hop=13*Math.abs(Math.sin(hu*TAU))*(1-hu);hw=1-hu}
    /* tail: idle sway plus decaying wag travelling up the segments */
    var wu=t-wagAt,env=wu>=0&&wu<2.4?Math.pow(1-wu/2.4,1.2):0;env*=wagAmp;
    var wag=function(lag){return env*Math.sin(TAU*2.1*(wu-lag))};
    var sway=1.2*Math.sin(t*TAU/5);
    var hap=hw?Math.sin(TAU*3*hu)*hw*7:0;
    E.tA.setAttribute('transform',rot(sway+wag(0)*3.2+hap*.4,P.tA));
    E.tB.setAttribute('transform',rot(.5*sway+wag(.09)*4+hap*.5,P.tB));
    E.tC.setAttribute('transform',rot(.4*sway+wag(.18)*5.2+hap*.7,P.tC));
    E.th.setAttribute('transform',rot(1.5*Math.sin(t*TAU/5+1)+wag(.12)*1.1+(hw?Math.sin(TAU*2*hu)*hw*3:0),P.th));
    E.br.setAttribute('transform','translate(0 '+(-hop).toFixed(2)+') translate(430 580) scale(1 '+(1+.011*b).toFixed(5)+') translate(-430 -580)');
    E.hd.setAttribute('transform',rot(head.x,P.hd));
    E.eL.setAttribute('transform',rot(earL.x,P.eL));E.eR.setAttribute('transform',rot(earR.x,P.eR));
    E.gz.setAttribute('transform','translate('+gx.x.toFixed(2)+' '+gy.x.toFixed(2)+')');
    E.yL.setAttribute('transform','translate(0 '+dy.toFixed(2)+') translate(370 295) scale(1 '+sv.toFixed(3)+') translate(-370 -295)');
    E.yR.setAttribute('transform','translate(0 '+dy.toFixed(2)+') translate(518 300) scale(1 '+sv.toFixed(3)+') translate(-518 -300)');
  }
  function reset(){Object.keys(E).forEach(function(k){E[k]&&E[k].removeAttribute('transform')})}
  function start(){if(!raf&&!paused&&!rm.matches&&visible){last=0;raf=requestAnimationFrame(frame)}}
  function stop(){if(raf){cancelAnimationFrame(raf);raf=0}}
  var io=('IntersectionObserver' in root)?new IntersectionObserver(function(es){visible=es[0].isIntersecting;visible?start():stop()}):null;
  if(io)io.observe(svg);
  rm.addEventListener&&rm.addEventListener('change',function(){rm.matches?(stop(),reset()):start()});
  var api={
    lookAt:function(x,y){var r=svg.getBoundingClientRect();if(!r.width)return;var cx=r.left+r.width*.42,cy=r.top+r.height*.3;
      nx=Math.max(-1,Math.min(1,(x-cx)/(r.width*.6)));ny=Math.max(-1,Math.min(1,(y-cy)/(r.height*.6)));lastPtr=tNow||performance.now()/1000},
    blink:function(){blinkStart=tNow},
    wag:function(){wagAt=tNow;wagAmp=1},
    ears:function(){earL.v-=36;earR.v+=36},
    happy:function(){happyAt=tNow;wagAt=tNow;wagAmp=1;earL.v-=30;earR.v+=30;blinkStart=tNow+.35},
    pause:function(p){paused=!!p;paused?stop():start()},
    destroy:function(){stop();io&&io.disconnect()}
  };
  start();return api;
}
root.MeoRig=MeoRig;
})(typeof window!=='undefined'?window:this);
