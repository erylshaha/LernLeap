/* Init: first render, layout, global listeners. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== init ===== */
function layoutAll(){pickers.forEach(p=>p.layout());layoutThread();onScroll()}
let lt=0;const schedule=()=>{cancelAnimationFrame(lt);lt=requestAnimationFrame(layoutAll)};
applyTheme();applyLang();
initPickState();
{const q=new URLSearchParams(location.search).get('level'),i=LV.indexOf((q||savedLv||'').toUpperCase());if(i>=0)selectAll(i,null)}
go();renderAll();layoutAll();
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',schedule);addEventListener('load',schedule);
$$('img').forEach(i=>i.complete||i.addEventListener('load',schedule));
if(D.fonts&&D.fonts.ready)D.fonts.ready.then(schedule);
mq.addEventListener&&mq.addEventListener('change',schedule);
