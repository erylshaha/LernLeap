/* Onboarding tour with spotlight. (classic script: shares one global scope, load order matters, see index.html) */
/* tour */
const tr=$('#tourDlg'),TS=[{k:'goal',r:'start',h:'#level'},{k:'lab',r:'lab',h:'#/lab'},{k:'lvl',r:'check',h:'#/level'},{k:'lib',r:'lib',h:'#/lib'}];let ti=0;
function renderTour(){const s=TS[ti];$('#trStep').textContent=tt('tour.step').replace('{i}',ti+1).replace('{n}',TS.length);$('#trT').textContent=tt('tour.'+s.k+'.t');$('#trB').innerHTML=tt('tour.'+s.k+'.b');$('#trBack').disabled=ti===0;$('#trNext').textContent=ti===TS.length-1?tt('tour.done'):tt('tour.next');$('#trGo').setAttribute('href',s.h);
  $$('.nav [data-r]').forEach(a=>a.classList.toggle('tour-hl',a.dataset.r===s.r));$$('#trDots i').forEach((d,j)=>d.classList.toggle('on',j===ti));if(tr.open)placeTour()}
function placeTour(){
  const V=$('#trVeil'),s=TS[ti],el=$(s.k==='goal'?'#goalBtn':'.nav [data-r="'+s.r+'"]'),r=el&&el.getBoundingClientRect(),ok=r&&r.width>0&&r.height>0,w=innerWidth,h=innerHeight,p=6,[a,b,c,d]=V.children,ring=$('#trRing');
  const set=(e,l,t,wd,ht)=>Object.assign(e.style,{left:l+'px',top:t+'px',width:Math.max(0,wd)+'px',height:Math.max(0,ht)+'px'});
  V.hidden=false;
  if(!ok){set(a,0,0,w,h);[b,c,d].forEach(e=>set(e,0,0,0,0));ring.style.display='none';tr.style.cssText='';return}
  const x=r.left-p,y=r.top-p,wd=r.width+2*p,ht=r.height+2*p;
  set(a,0,0,w,y);set(b,0,y+ht,w,h-y-ht);set(c,0,y,x,ht);set(d,x+wd,y,w-x-wd,ht);ring.style.display='';set(ring,x,y,wd,ht);
  if(w<820){tr.style.cssText='';return}
  const dw=tr.offsetWidth||340,left=Math.min(Math.max(12,r.left+r.width/2-dw/2),w-dw-12);
  tr.style.cssText='inset:auto;right:auto;bottom:auto;top:'+(y+ht+12)+'px;left:'+left+'px';
}
addEventListener('resize',()=>{if(tr.open)placeTour()});
function openTour(){ti=0;$('#trDots').innerHTML=TS.map(()=>'<i></i>').join('');renderTour();if(!tr.open)tr.show();placeTour();$('#trNext').focus()}
function closeTour(done){if(tr.open)tr.close();$('#trVeil').hidden=true;tr.style.cssText='';$$('.nav [data-r]').forEach(a=>a.classList.remove('tour-hl'));if(done)store.set('ll-tour','done')}
$('#trBack').addEventListener('click',()=>{if(ti>0){ti--;renderTour()}});
$('#trNext').addEventListener('click',()=>{if(ti===TS.length-1)closeTour(true);else{ti++;renderTour()}});
$('#trX').addEventListener('click',()=>closeTour(false));$('#trGo').addEventListener('click',()=>closeTour(true));
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&tr.open)closeTour(false)});
D.addEventListener('click',e=>{if(e.target.closest('[data-tour]'))openTour()});
