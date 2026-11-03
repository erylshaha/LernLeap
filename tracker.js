/* Learning timer, streak, goal engine, donation dialog. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== v10: learning time, streak and goal engine ===== */
/* Settings. The donation link is deliberately empty: set it to your real donation page (https only). */
const LL_CFG={idleMs:60000,defaultMinutes:15,checkpointMs:10000,segmentGapMs:300000,buffer:1.15,warnMinutes:120,maxMonths:60,weeksPerMonth:52.1429/12,donationUrl:''};
let HOURS={};try{HOURS=JSON.parse($('#cefr-hours').textContent)}catch(e){}
/*CORE-START*/
const LLCore=(()=>{
  const LVS=['A1','A2','B1','B2','C1','C2'];
  const p2=n=>String(n).padStart(2,'0');
  const key=(d=new Date())=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
  const dayNum=k=>{const [y,m,d]=k.split('-').map(Number);return Math.round(Date.UTC(y,m-1,d)/864e5)};
  const weekStart=k=>{const n=dayNum(k),s=n-((n+3)%7);return new Date(s*864e5).toISOString().slice(0,10)};
  function hours(table,cur,tgt){const a=LVS.indexOf(cur),b=LVS.indexOf(tgt);if(a<0||b<=a)throw new Error('Invalid CEFR level range.');let h=0;
    for(let i=a;i<b;i++){const v=table&&table[LVS[i]]&&table[LVS[i]][LVS[i+1]];if(!Number.isFinite(v)||v<=0)throw new Error('Missing learning estimate: '+LVS[i]+' -> '+LVS[i+1]);h+=v}return h}
  function session({hours:H,months,sessionsPerWeek,buffer=1.15,weeksPerMonth=52.1429/12}){
    if(!Number.isInteger(months)||months<1)throw new Error('Months must be a positive integer.');
    if(!Number.isInteger(sessionsPerWeek)||sessionsPerWeek<1||sessionsPerWeek>7)throw new Error('Sessions per week must be 1-7.');
    return Math.ceil(H*60*buffer/(months*weeksPerMonth*sessionsPerWeek))}
  const newDay=(date,tz,rule,requiredSeconds)=>({date,timezone:tz,activeLearningSeconds:0,qualifyingSessionSeconds:0,sessionsMet:0,activities:{},rule,requiredSeconds,completed:false,streakEarned:false,updatedAt:0});
  /* once a day is completed it stays completed: later goal changes never touch it */
  function check(r){if(r.completed)return false;const v=r.rule==='goal'?r.qualifyingSessionSeconds:r.activeLearningSeconds;if(v>=r.requiredSeconds){r.completed=r.streakEarned=true;return true}return false}
  function credit(r,type,n,seg){r.activeLearningSeconds+=n;r.activities[type]=(r.activities[type]||0)+n;seg.sec+=n;
    if(seg.sec>r.qualifyingSessionSeconds)r.qualifyingSessionSeconds=seg.sec;
    if(r.rule==='goal'&&!seg.met&&seg.sec>=r.requiredSeconds){seg.met=true;r.sessionsMet++}return check(r)}
  function streaks(days,today){const t=dayNum(today),ks=Object.keys(days).filter(k=>days[k].streakEarned).map(dayNum).filter(n=>n<=t).sort((a,b)=>a-b);
    let longest=0,run=0,prev=null;for(const n of ks){run=prev!==null&&n===prev+1?run+1:1;if(run>longest)longest=run;prev=n}
    const set=new Set(ks);let c=set.has(t)?t:t-1,cur=0;while(set.has(c)){cur++;c--}
    return{current:cur,longest,total:ks.length,todayEarned:set.has(t)}}
  /* same date on two devices: keep the larger value, never add (no double counting) */
  function merge(a,b){const o=JSON.parse(JSON.stringify(a||{}));for(const k in b||{}){const x=o[k],y=b[k];if(!x){o[k]=JSON.parse(JSON.stringify(y));continue}
    x.activeLearningSeconds=Math.max(x.activeLearningSeconds,y.activeLearningSeconds);x.qualifyingSessionSeconds=Math.max(x.qualifyingSessionSeconds,y.qualifyingSessionSeconds);x.sessionsMet=Math.max(x.sessionsMet||0,y.sessionsMet||0);
    for(const t in y.activities||{})x.activities[t]=Math.max(x.activities[t]||0,y.activities[t]);x.completed=x.streakEarned=!!(x.completed||y.completed)}return o}
  return{LVS,key,dayNum,weekStart,hours,session,newDay,check,credit,streaks,merge};
})();
/*CORE-END*/
const TZ=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){return''}})();
function loadRec(){const o=rd('ll-rec'),days={};if(o&&o.days&&typeof o.days==='object')for(const k in o.days){const d=o.days[k];
  if(/^\d{4}-\d{2}-\d{2}$/.test(k)&&d&&Number.isFinite(d.activeLearningSeconds)&&d.activeLearningSeconds>=0&&d.activeLearningSeconds<=86400){
    days[k]=Object.assign(LLCore.newDay(k,TZ,'default',900),d,{activities:d.activities&&typeof d.activities==='object'?d.activities:{}})}}
  return{v:1,days}}
let REC=loadRec(),dirty=false;
function saveRec(){const ks=Object.keys(REC.days).sort().slice(-800),o={};ks.forEach(k=>o[k]=REC.days[k]);REC.days=o;store.set('ll-rec',JSON.stringify(REC));dirty=false}
const ruleNow=()=>goal?{rule:'goal',req:goal.minutesPerSession*60}:{rule:'default',req:LL_CFG.defaultMinutes*60};
function syncRule(){const r=REC.days[LLCore.key()];if(r&&!r.completed){const x=ruleNow();r.rule=x.rule;r.requiredSeconds=x.req;saveRec()}}
/* --- active learning timer: counts seconds from timestamps, only while an activity is registered, the tab is visible, the person interacted within idleMs (or media plays), and this tab holds the single "counting" lock --- */
const TAB=Math.random().toString(36).slice(2),TRK={type:null,last:Date.now(),input:0,media:0,acc:0,gap:0,seg:{date:'',sec:0,met:false}};
function hasLock(){const L=rd('ll-tlock'),n=Date.now();if(L&&L.id!==TAB&&n-L.ts<4000)return false;
  if(!L||L.id!==TAB){REC=loadRec()}if(!L||L.id!==TAB||n-L.ts>1500)store.set('ll-tlock',JSON.stringify({id:TAB,ts:n}));return true}
const isActive=()=>!!TRK.type&&!D.hidden&&(TRK.media>0||Date.now()-TRK.input<=LL_CFG.idleMs)&&hasLock();
function credit(n){const k=LLCore.key();if(TRK.seg.date!==k)TRK.seg={date:k,sec:0,met:false};
  let r=REC.days[k];if(!r){const x=ruleNow();r=REC.days[k]=LLCore.newDay(k,TZ,x.rule,x.req)}
  const earned=LLCore.credit(r,TRK.type,n,TRK.seg);r.updatedAt=Date.now();dirty=true;if(earned){saveRec();renderStatus(true)}}
function tick(){const now=Date.now(),dt=Math.min(now-TRK.last,2000);TRK.last=now;if(!TRK.type)return;
  if(isActive()){TRK.gap=0;TRK.acc+=dt;const n=Math.floor(TRK.acc/1000);if(n){TRK.acc-=n*1000;credit(n)}}
  else{TRK.gap+=dt;if(TRK.gap>LL_CFG.segmentGapMs)TRK.seg={date:'',sec:0,met:false}}}
setInterval(tick,1000);setInterval(()=>{if(dirty)saveRec();renderStatus(false)},LL_CFG.checkpointMs);
['pointerdown','keydown','touchstart','wheel','pointermove'].forEach(ev=>addEventListener(ev,()=>{TRK.input=Date.now()},{passive:true,capture:true}));
['play','playing'].forEach(ev=>D.addEventListener(ev,e=>{if(e.target.matches&&e.target.matches('audio,video'))e.target._on=1,TRK.media=$$('audio,video').filter(m=>!m.paused).length||1},true));
['pause','ended'].forEach(ev=>D.addEventListener(ev,e=>{if(e.target.matches&&e.target.matches('audio,video'))TRK.media=$$('audio,video').filter(m=>!m.paused&&!m.ended).length},true));
D.addEventListener('visibilitychange',()=>{TRK.last=Date.now();if(D.hidden&&dirty)saveRec()});addEventListener('pagehide',()=>{if(dirty)saveRec()});
addEventListener('storage',e=>{if(e.key==='ll-rec'){REC=loadRec();renderStatus(false)}});
/* Pages register what counts as learning: <section data-learning-activity="vocabulary_game"> (visible = counting), or LernLeapTracker.begin(type)/end() */
function scanActivities(){const el=$$('[data-learning-activity]').find(e=>e.offsetParent!==null&&!e.closest('[hidden]'));if(el)api.begin(el.dataset.learningActivity);else if(TRK.auto)api.end()}
const api=window.LernLeapTracker={begin(type){TRK.auto=false;if(!/^[a-z_]{2,30}$/.test(type))return;TRK.type=type;TRK.input=Date.now();TRK.last=Date.now()},end(){TRK.type=null;TRK.acc=0;if(dirty)saveRec()},
  setMedia(on){TRK.media=on?1:0},days:()=>JSON.parse(JSON.stringify(REC.days)),mergeGuestRecords(d){REC.days=LLCore.merge(REC.days,d);saveRec();renderStatus(false)}};
new MutationObserver(()=>{if($$('[data-learning-activity]').length||TRK.auto){clearTimeout(scanActivities.t);scanActivities.t=setTimeout(()=>{const a=$$('[data-learning-activity]').find(e=>e.offsetParent!==null);if(a)api.begin(a.dataset.learningActivity),TRK.auto=true;else if(TRK.auto){api.end();TRK.auto=false}},200)}}).observe(D.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
if(/[?&]debug=1/.test(location.search))api._credit=(t,s)=>{TRK.type=t;for(let i=0;i<s;i+=10)credit(Math.min(10,s-i));saveRec();renderStatus(false)};
/* --- streak display --- */
const stBtn=$('#streak'),stPop=$('#stPop');let prevDone=null;
function renderStreak(earnedNow){
  const k=LLCore.key(),s=LLCore.streaks(REC.days,k),r=REC.days[k],all=Object.values(REC.days),tot=all.reduce((a,d)=>a+d.activeLearningSeconds,0),dd=all.filter(d=>d.activeLearningSeconds>0).length;
  $('#stN').textContent=s.current;$('#stX').textContent=tt('streak.sfx');stBtn.dataset.done=s.todayEarned?'1':'0';
  const need=goal?goal.minutesPerSession:LL_CFG.defaultMinutes,got=r?Math.floor((goal?r.qualifyingSessionSeconds:r.activeLearningSeconds)/60):0;
  const today=s.todayEarned?tt('streak.y'):tt('streak.no').replace('{a}',Math.min(got,need)).replace('{n}',need);
  stBtn.setAttribute('aria-label',tt('streak.n').replace('{n}',s.current)+'. '+today);
  stPop.innerHTML=`<p class="gp-t">${tt('streak.n').replace('{n}',s.current)}</p><p class="gp-n">${today}</p><div class="st-g"><div><b>${s.longest}</b><span>${tt('st.long')}</span></div><div><b>${s.total}</b><span>${tt('st.total')}</span></div><div><b>${fmtMin(Math.round(tot/60))}</b><span>${tt('st.time')}</span></div><div><b>${dd?fmtMin(Math.round(tot/60/dd)):'–'}</b><span>${tt('st.avg')}</span></div></div><p class="gp-n">${tt(goal?'st.rule.g':'st.rule.d').replace('{n}',need)}</p>`;
  if(earnedNow&&prevDone===false){stBtn.classList.add('earn');setTimeout(()=>stBtn.classList.remove('earn'),1000);$('#stLive').textContent=tt('streak.earned')}
  prevDone=s.todayEarned;
}
function renderStatus(e){renderStreak(e);renderCommit()}
stBtn.addEventListener('click',e=>{e.stopPropagation();const o=stPop.hidden;stPop.hidden=!o;stBtn.setAttribute('aria-expanded',String(o))});
D.addEventListener('click',e=>{if(!stPop.hidden&&!stPop.contains(e.target)&&!stBtn.contains(e.target)){stPop.hidden=true;stBtn.setAttribute('aria-expanded','false')}});
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&!stPop.hidden){stPop.hidden=true;stBtn.setAttribute('aria-expanded','false');stBtn.focus()}});
/* --- LernLib: status and flashcard tracking --- */
function setSt(c,s){if(c){c.status=s;store.set('ll-lib',JSON.stringify(lib));renderLib()}}
$('#libList').addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;const c=lib.find(x=>x.id===b.dataset.st),o=['new','hard','known'];if(c)setSt(c,o[(o.indexOf(c.status||'new')+1)%3])});
$('#libCards').addEventListener('click',()=>{if(lib.length)api.begin('flashcards')});fc.addEventListener('close',()=>api.end());
/* --- donation --- */
const dn=$('#donDlg');
function openDon(){const u=LL_CFG.donationUrl;let ok=false;try{ok=u&&new URL(u).protocol==='https:'}catch(e){}
  $('#donB').innerHTML=ok?`<a class="btn" href="${encodeURI(u)}" target="_blank" rel="noopener noreferrer">${tt('don.go')}</a>`:`<span class="btn" aria-disabled="true">${tt('don.go')}</span><p class="hint-s">${tt('don.off')}</p>`;dn.showModal()}
D.addEventListener('click',e=>{if(e.target.closest('[data-donate]'))openDon()});
