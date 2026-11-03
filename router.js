/* Hash router and active-nav tracking. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== router ===== */
const views={start:$('#v-start'),lab:$('#v-lab'),check:$('#v-check'),lib:$('#v-lib')},navA=$$('.nav [data-r]');
let route='';
function setCurrent(k){navA.forEach(a=>{if(a.dataset.r===k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
function go(){
  const h0=location.hash,h=h0.split('?')[0],qs=new URLSearchParams(h0.split('?')[1]||''),qi=LV.indexOf((qs.get('level')||'').toUpperCase()),r=h==='#/lab'?'lab':h==='#/lib'?'lib':(h==='#/level'||h==='#/check')?'check':'start',anc=r==='start'&&h.length>1&&h[1]!=='/'?h.slice(1):'';
  if(qi>=0&&qi!==sel)selectAll(qi,null);
  if(r!==route){Object.entries(views).forEach(([k,v])=>v.hidden=k!==r);route=r;if(!anc)scrollTo({top:0,behavior:'instant'});setCurrent(r==='start'&&!anc?'start':r);schedule()}
  if(anc&&$('#'+anc)){setCurrent('start');requestAnimationFrame(()=>$('#'+anc).scrollIntoView({behavior:rm()?'auto':'smooth'}))}
  else if(r==='start')setCurrent('start');
  if(typeof renderPlan==='function')renderPlan();
}
addEventListener('hashchange',go);
(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&route==='start')setCurrent('start')}),{rootMargin:'-40% 0px -55% 0px'});['start','ueber'].forEach(id=>io.observe($('#'+id)))})();
