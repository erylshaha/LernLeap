/* Settings popover and mobile menu. (classic script: shares one global scope, load order matters, see index.html) */
/* settings popover and mobile menu */
const hdr=$('.hd'),setBtn=$('#setBtn'),pop=$('#setPop'),menuBtn=$('#menuBtn'),nav=$('#nav');
function popOpen(o){pop.hidden=!o;setBtn.setAttribute('aria-expanded',o)}
setBtn.addEventListener('click',()=>{popOpen(pop.hidden);if(!pop.hidden)$('input:checked',pop).focus()});
D.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!pop.hidden){popOpen(false);setBtn.focus()}nav.classList.remove('open');hdr.classList.remove('mopen');menuBtn.setAttribute('aria-expanded','false')}});
D.addEventListener('click',e=>{if(!pop.hidden&&!pop.contains(e.target)&&!setBtn.contains(e.target))popOpen(false)});
menuBtn.addEventListener('click',()=>{const o=nav.classList.toggle('open');hdr.classList.toggle('mopen',o);menuBtn.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');hdr.classList.remove('mopen');menuBtn.setAttribute('aria-expanded','false')}});
