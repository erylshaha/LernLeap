/* Level picker: red yarn ball, green target yarn. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== level picker: the yarn ball rolls along the ground and shrinks as it unwinds ===== */
let sel=-1,savedLv=store.get('ll-level'),goal=null,locked=false,tsel=-1;
const uw=()=>Math.max(5,Math.min(7.6,.0056*innerWidth));
/* green target yarn: the same yarn artwork, re-coloured once from the brand token --green */
let greenP=null;
function greenYarn(){
  if(greenP)return greenP;
  return greenP=new Promise(res=>{
    const im=new Image();
    im.onload=()=>{try{
      const hex=getComputedStyle(R).getPropertyValue('--green').trim()||'#A5C500',n=parseInt(hex.slice(1),16),
        r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;
      let th=d===0?0:mx===r?((g-b)/d%6):mx===g?(b-r)/d+2:(r-g)/d+4;th=((th*60)+360)%360;
      const c=D.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);
      const id=x.getImageData(0,0,c.width,c.height),p=id.data,f=(n,h,s,l)=>{const k=(n+h/30)%12,a=s*Math.min(l,1-l);return l-a*Math.max(-1,Math.min(k-3,9-k,1))};
      for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const R0=p[i]/255,G0=p[i+1]/255,B0=p[i+2]/255,M=Math.max(R0,G0,B0),m=Math.min(R0,G0,B0),l=(M+m)/2,dd=M-m;
        if(dd<.08)continue;const s=dd/(1-Math.abs(2*l-1)||1),ns=Math.min(1,s*1.2);p[i]=f(0,th,ns,l)*255;p[i+1]=f(8,th,ns,l)*255;p[i+2]=f(4,th,ns,l)*255}
      x.putImageData(id,0,0);c.toBlob(bl=>res(bl?URL.createObjectURL(bl):''),'image/png')
    }catch(e){res('')}};
    im.onerror=()=>res('');im.src=ASSET.yarn;
  });
}
const levelHTML=(t,i)=>{const d=t.lv[i];return '<span class="lv-intro">'+d.i+'</span><span class="lv-lead">'+t.lvLead+'</span><ul class="lv-pts">'+d.b.map(x=>'<li>'+x+'</li>').join('')+'</ul>'};
function makePicker(root){
  root.innerHTML=`<div class="stage"><svg class="track" aria-hidden="true" focusable="false"><g class="ticks"></g><path class="trBg"/><path class="trFg"/><path class="trTo"/><path class="trT"/></svg><div class="hit" aria-hidden="true"></div><img class="ball" data-asset="yarn" alt="" aria-hidden="true"><img class="ball ball2" alt="" aria-hidden="true" hidden><span class="lbl lblC" hidden></span><span class="lbl lblT" hidden></span><div class="nodes" role="radiogroup" data-i18n-label="lv.group">${LV.map(l=>`<button type="button" class="node" role="radio" aria-checked="false">${l}</button>`).join('')}</div></div><div class="lv-info"><p class="lv-code" aria-hidden="true">?</p><div class="lv-desc" aria-live="polite"></div><div class="lv-act"><button type="button" class="btn lvBtn" aria-disabled="true"></button><a class="ibtn lvUnsure" href="#/level"></a><button type="button" class="ibtn lvEdit" hidden></button><p class="lv-st" role="status"></p></div></div>`;
  fillAssets(root);
  const q=s=>$(s,root),stage=q('.stage'),ticks=q('.ticks'),trBg=q('.trBg'),trFg=q('.trFg'),trTo=q('.trTo'),trT=q('.trT'),hit=q('.hit'),ball=q('.ball'),ball2=q('.ball2'),lblC=q('.lblC'),lblT=q('.lblT'),nodes=$$('.node',root),code=q('.lv-code'),desc=q('.lv-desc'),btn=q('.lvBtn'),uns=q('.lvUnsure'),edit=q('.lvEdit'),st=q('.lv-st');
  greenYarn().then(u=>{if(u)ball2.src=u;else{ball2.src=ASSET.yarn;ball2.style.filter='hue-rotate(68deg) saturate(1.1)'}});
  const M={W:0,Hs:0,gx:0,x0:0,xe:0,G:0,R0:0,Rm:0,rc:0,pad:0};
  let cur=0,tgt=0,tcur=0,ttgt=0,raf=0,drag=false,cand=-1,tcand=-1;
  const xAt=f=>M.x0+(M.xe-M.x0)*f/5,rAt=f=>M.R0+(M.Rm-M.R0)*f/5;
  /* a ball keeps its own size/rotation; once the level is locked both shrink so they never overlap */
  function ballAt(img,f){const x=xAt(f),r0=rAt(f),k=(M.R0-M.Rm)/(M.xe-M.x0),ang=Math.log(M.R0/r0)/k*180/Math.PI,cap=locked?(M.xe-M.x0)/5*.46:1e9,r=Math.min(r0,cap);
    img.dataset.sz='1';img.style.width=2*r+'px';img.style.left=(x-r)+'px';img.style.top=(M.G-2*r)+'px';img.style.transform=`rotate(${ang.toFixed(2)}deg)`;return{x,r}}
  function draw(){
    if(!M.W)return;
    const a=ballAt(ball,cur);trFg.setAttribute('d',`M${M.gx} ${M.G}L${a.x} ${M.G}`);
    if(locked&&tsel>=0){const b=ballAt(ball2,tcur),d=`M${a.x} ${M.G}L${b.x} ${M.G}`;trTo.setAttribute('d',d);trT.setAttribute('d',d);
      lblC.style.left=a.x+'px';lblC.style.top=(M.G+8)+'px';lblT.style.left=b.x+'px';lblT.style.top=(M.G+8)+'px';lblT.style.transform=tcand>=5?'translateX(-100%)':'translateX(-50%)'}
    else{trTo.setAttribute('d','');trT.setAttribute('d','')}
  }
  function loop(){raf=0;let busy=false,d=tgt-cur;if(Math.abs(d)<.003)cur=tgt;else{cur+=d*.07;busy=true}d=ttgt-tcur;if(Math.abs(d)<.003)tcur=ttgt;else{tcur+=d*.07;busy=true}draw();if(busy)raf=requestAnimationFrame(loop)}
  function kick(){if(rm()||!M.W){cur=tgt;tcur=ttgt;draw();return}if(!raf)raf=requestAnimationFrame(loop)}
  function layout(){
    const W=stage.clientWidth,Hs=stage.clientHeight;if(!W)return;
    const pad=Math.max(12,stage.getBoundingClientRect().left),half=(nodes[0].offsetWidth||44)/2;
    M.W=W;M.Hs=Hs;M.pad=pad;
    M.R0=Math.max(34,Math.min(96,(Hs-64)/2,W*.2));M.Rm=Math.max(18,M.R0*.27);
    M.rc=Math.min(14,pad*.5);M.gx=-pad*.3;M.x0=M.gx+M.R0;
    M.xe=W-Math.max(half,M.Rm)-2;M.G=Hs-6;
    const w=uw();trFg.style.strokeWidth=trT.style.strokeWidth=w.toFixed(1);trTo.style.strokeWidth=(w+3.5).toFixed(1);trBg.style.strokeWidth=(w*.6).toFixed(1);
    trBg.setAttribute('d',`M${M.gx} ${M.G}L${M.xe} ${M.G}`);
    ticks.innerHTML=LV.map((_,i)=>`<line x1="${xAt(i)}" x2="${xAt(i)}" y1="${half*2+8}" y2="${M.G-6}"/>`).join('');
    nodes.forEach((b,i)=>{b.style.left=xAt(i)+'px';b.style.top=(half+2)+'px'});
    draw();
  }
  function marks(){const sh=locked?tcand:cand;nodes.forEach((b,j)=>{const off=locked&&j<=sel;b.setAttribute('aria-checked',j===sh);b.setAttribute('aria-disabled',String(off));b.tabIndex=(sh<0?j===0:j===sh)?0:-1;b.classList.toggle('reached',locked?j<=sel:j<=sh);b.classList.toggle('here',locked&&j===sel)})}
  function info(){
    const t=T[lang];uns.textContent=t.lvUnsure;uns.hidden=locked;
    if(!locked){
      code.textContent=cand<0?'?':LV[cand];desc.innerHTML=cand<0?t.lvNone:levelHTML(t,cand);
      btn.textContent=sel<0?t.lvCtaOff:sel>=5?t.lvTop:t.lvConfirm.replace('{l}',LV[sel]);btn.setAttribute('aria-disabled',String(sel<0||sel>=5));
      st.textContent=sel>=5?'':t.lvStep1;edit.hidden=true;
    }else{
      const c=tcand<0?sel+1:tcand;code.textContent=LV[c];
      desc.innerHTML='<span class="lv-intro"><b>'+t.lvFrom.replace('{a}',LV[sel]).replace('{b}',LV[c])+'</b></span>'+levelHTML(t,c);
      btn.textContent=t.lvCta.replace('{l}',LV[c]);btn.setAttribute('aria-disabled','false');st.textContent=t.lvStepT;
      edit.hidden=false;edit.textContent=t.lvChange.replace('{l}',LV[sel]);lblC.textContent=t.lvYou.replace('{l}',LV[sel]);lblT.textContent=t.lvTarget.replace('{l}',LV[c]);
    }
  }
  /* full sync from the shared state (sel / locked / tsel) */
  function sync(instant){
    tgt=sel<0?0:sel;cand=sel;tcand=tsel;const on=locked&&tsel>=0;ttgt=on?tsel:tgt;
    if(on&&M.W){ballAt(ball2,tcur);draw()}ball2.hidden=lblC.hidden=lblT.hidden=!on;marks();info();
    if(instant){cur=tgt;tcur=ttgt;draw()}else kick();
  }
  const P={layout,refresh:info,stage,M,info:q('.lv-info'),
    apply(i,focus,instant){sync(instant);if(focus&&i>=0)nodes[i].focus()},
    applyT(i,focus,instant){sync(instant);if(focus&&i>=0)nodes[i].focus()},
    onLock(){tcur=cur=sel;sync(false)}};
  nodes.forEach((b,i)=>{
    b.addEventListener('click',()=>{if(locked){if(i>sel)selectTarget(i,P)}else selectAll(i,P)});
    b.addEventListener('keydown',e=>{const k=e.key,lo=locked?sel+1:0,at=locked?(tsel<0?lo:tsel):(sel<0?-1:sel);let n=null;
      if(k==='ArrowRight'||k==='ArrowDown')n=Math.min(5,Math.max(lo,at+1));else if(k==='ArrowLeft'||k==='ArrowUp')n=Math.max(lo,(at<0?i:at)-1);else if(k==='Home')n=lo;else if(k==='End')n=5;
      if(n!==null){e.preventDefault();locked?selectTarget(n,P,true):selectAll(n,P,true)}});
  });
  const posFrom=e=>{const sr=stage.getBoundingClientRect();return Math.max(0,Math.min(5,(e.clientX-sr.left-M.x0)/(M.xe-M.x0)*5))};
  const mv=e=>{const p=posFrom(e);
    if(!locked){tgt=p;kick();const c=Math.round(p);if(c!==cand){cand=c;marks();info()}}
    else if(sel<5){ttgt=Math.max(sel+1,p);kick();const c=Math.max(sel+1,Math.round(p));if(c!==tcand){tcand=c;marks();info()}}};
  hit.addEventListener('pointerdown',e=>{drag=true;hit.setPointerCapture(e.pointerId);stage.classList.add('drag');mv(e)});
  hit.addEventListener('pointermove',e=>{if(drag)mv(e)});
  const end=()=>{if(!drag)return;drag=false;stage.classList.remove('drag');locked?(tcand>sel&&selectTarget(tcand,P)):selectAll(cand,P)};
  hit.addEventListener('pointerup',end);hit.addEventListener('pointercancel',end);
  btn.addEventListener('click',()=>{if(!locked){if(sel>=0&&sel<5)lockCurrent()}else if(tsel>sel)openGoal()});
  edit.addEventListener('click',()=>unlockCurrent());
  pickers.push(P);return P;
}
/* shared state: sel = current level (red, fixed once locked), tsel = target level (green) */
function selectAll(i,src,focus){if(locked&&i!==sel)return;sel=i;if(i>=0){savedLv=LV[i];store.set('ll-level',savedLv)}pickers.forEach(p=>p.apply(i,p===src&&focus,p!==src))}
function selectTarget(i,src,focus){if(!locked||i<=sel||i>5)return;tsel=i;store.set('ll-target',LV[i]);pickers.forEach(p=>p.applyT(i,p===src&&focus,p!==src))}
function lockCurrent(){if(sel<0||sel>=5)return;locked=true;tsel=sel+1;store.set('ll-lock','1');store.set('ll-target',LV[tsel]);pickers.forEach(p=>p.onLock())}
function unlockCurrent(){locked=false;tsel=-1;store.set('ll-lock','');pickers.forEach(p=>p.apply(sel,false,false))}
$$('[data-picker]').forEach(makePicker);
