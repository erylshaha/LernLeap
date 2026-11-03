/* Ziel setzen, learning path, goal dialogs. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== v6: goal, learning path, dialogs ===== */
const TX={"de": {"thread": "Fädle deinen Lernpfad ein", "goal.set": "Ziel setzen", "goal.mine": "Mein Ziel", "goal.level": "Level", "goal.focus": "Schwerpunkt", "goal.by": "Bis", "goal.week": "Einheiten pro Woche", "goal.left": "Noch", "goal.days": "Tage", "goal.over": "Frist abgelaufen", "goal.note": "Fortschritt wird noch nicht gemessen: Es sind noch keine Aktivitäten erfasst.", "goal.learn": "Weiterlernen", "goal.edit": "Ziel ändern", "goal.del": "Ziel löschen", "goal.del2": "Wirklich löschen?", "gd.title": "Level wählen und Ziel setzen", "gd.sub": "Dein Ziel erscheint oben in der Leiste, auf jeder Seite. Es bleibt in diesem Browser gespeichert.", "gd.save": "Ziel speichern", "gd.e1": "Wähle ein Datum, das nicht in der Vergangenheit liegt.", "cancel": "Abbrechen", "close": "Schließen", "foc.level": "Ein Level erreichen", "foc.grammar": "Grammatik meistern", "foc.vocab": "Wortschatz aufbauen", "foc.exam": "Auf eine Prüfung vorbereiten", "p.lv": "Dein Level: {l}", "p.s1": "Woran willst du arbeiten?", "cat.grammar": "Grammatik", "cat.vocab": "Wortschatz", "cat.skills": "Einzelne Fertigkeiten", "cat.cert": "Zertifikatsvorbereitung", "sk.lesen": "Lesen", "sk.hoeren": "Hören", "sk.schreiben": "Schreiben", "sk.sprechen": "Sprechen", "p.certn": "Die Liste richtet sich nach deinem Level. Vorbereitungsmodule sind noch in Arbeit.", "p.soon": "bald verfügbar", "p.s2": "Wie möchtest du weitermachen?", "p.acc": "Anmelden oder Konto erstellen", "p.accd": "Mit Konto speicherst du Ziel, Fortschritt und gemerkte Inhalte auf allen Geräten.", "p.accn": "Konten sind noch nicht verfügbar. Starte ohne Konto: Ziel und Plan bleiben in diesem Browser.", "p.guest": "Ohne Konto fortfahren", "p.guestn": "Deine Daten bleiben nur in diesem Browser auf diesem Gerät.", "p.s3": "Wie willst du lernen?", "p.lib": "Deine Lernbibliothek", "p.libd": "Erklärungen, Beispiele, Tabellen und PDFs zum Nachschlagen.", "p.prac": "Direkt üben", "p.pracd": "Interaktive Aufgaben mit Erklärung zu jeder Antwort.", "p.go": "Los geht’s", "p.e1": "Wähle mindestens einen Bereich.", "p.e2": "Wähle mindestens eine Fertigkeit.", "p.e3": "Wähle mindestens ein Zertifikat.", "p.e4": "Wähle, wie du lernen willst.", "fmt.library": "Lernbibliothek", "fmt.practice": "Üben", "plan.t": "Dein Lernpfad", "plan.x": "Plan entfernen", "plan.n": "Die Inhalte dieser Bereiche sind noch in Arbeit. Dein Plan bleibt gespeichert.", "ft.terms": "Nutzungsbedingungen", "ft.priv": "Datenschutz", "ft.upd": "Updates", "ft.fb": "Feedback", "i.terms": "Nutzungsbedingungen", "i.terms.b": "Platzhalter: Die Nutzungsbedingungen werden ergänzt, bevor das Angebot startet. Dieser Text ist kein verbindlicher Inhalt.", "i.priv": "Datenschutz", "i.priv.b": "Platzhalter: Die Datenschutzerklärung folgt. Bis dahin gilt: Ziel, Plan und Einstellungen liegen nur im localStorage dieses Browsers.", "i.upd": "Updates", "i.upd.b": "Noch keine Einträge. Neue Lerninhalte und Änderungen erscheinen hier, sobald es sie gibt.", "i.fb": "Feedback", "fb.cat": "Art des Feedbacks", "fb.bug": "Fehler melden", "fb.content": "Inhalt", "fb.feature": "Funktionswunsch", "fb.general": "Allgemein", "fb.msg": "Deine Nachricht", "fb.send": "Prüfen", "fb.e": "Bitte schreibe mindestens 10 Zeichen.", "fb.ok": "Nicht gesendet: Der Versand ist noch nicht eingerichtet. Dein Text bleibt in diesem Formular."}, "en": {"thread": "Thread your learning path", "goal.set": "Set a goal", "goal.mine": "My goal", "goal.level": "Level", "goal.focus": "Focus", "goal.by": "By", "goal.week": "Sessions per week", "goal.left": "Left", "goal.days": "days", "goal.over": "Deadline passed", "goal.note": "Progress is not measured yet: no activity has been recorded.", "goal.learn": "Keep learning", "goal.edit": "Change goal", "goal.del": "Delete goal", "goal.del2": "Really delete?", "gd.title": "Choose a level and set a goal", "gd.sub": "Your goal shows in the top bar on every page. It is saved in this browser.", "gd.save": "Save goal", "gd.e1": "Pick a date that is not in the past.", "cancel": "Cancel", "close": "Close", "foc.level": "Reach a level", "foc.grammar": "Master grammar", "foc.vocab": "Build vocabulary", "foc.exam": "Prepare for an exam", "p.lv": "Your level: {l}", "p.s1": "What do you want to work on?", "cat.grammar": "Grammar", "cat.vocab": "Vocabulary", "cat.skills": "Individual skills", "cat.cert": "Certificate preparation", "sk.lesen": "Reading", "sk.hoeren": "Listening", "sk.schreiben": "Writing", "sk.sprechen": "Speaking", "p.certn": "The list follows your level. Preparation modules are still in progress.", "p.soon": "coming soon", "p.s2": "How do you want to continue?", "p.acc": "Sign in or create an account", "p.accd": "An account saves your goal, progress and saved items across devices.", "p.accn": "Accounts are not available yet. Start without one: your goal and plan stay in this browser.", "p.guest": "Continue without an account", "p.guestn": "Your data stays in this browser on this device only.", "p.s3": "How do you want to learn?", "p.lib": "Your Learning Library", "p.libd": "Explanations, examples, tables and PDFs to look things up.", "p.prac": "Start practising", "p.pracd": "Interactive exercises with an explanation for every answer.", "p.go": "Let’s go", "p.e1": "Choose at least one area.", "p.e2": "Choose at least one skill.", "p.e3": "Choose at least one certificate.", "p.e4": "Choose how you want to learn.", "fmt.library": "Learning Library", "fmt.practice": "Practice", "plan.t": "Your learning path", "plan.x": "Remove plan", "plan.n": "The content in these areas is still in progress. Your plan stays saved.", "ft.terms": "Terms", "ft.priv": "Privacy", "ft.upd": "Updates", "ft.fb": "Feedback", "i.terms": "Terms", "i.terms.b": "Placeholder: the terms will be added before launch. This text is not binding content.", "i.priv": "Privacy", "i.priv.b": "Placeholder: the privacy policy is to follow. Until then: goal, plan and settings are kept only in this browser’s localStorage.", "i.upd": "Updates", "i.upd.b": "No entries yet. New learning content and changes will appear here when there are any.", "i.fb": "Feedback", "fb.cat": "Type of feedback", "fb.bug": "Bug report", "fb.content": "Content feedback", "fb.feature": "Feature suggestion", "fb.general": "General feedback", "fb.msg": "Your message", "fb.send": "Check", "fb.e": "Please write at least 10 characters.", "fb.ok": "Not sent: delivery is not set up yet. Your text stays in this form."}};Object.assign(T.de,TX.de);Object.assign(T.en,TX.en);
const tt=k=>T[lang][k]!=null?T[lang][k]:k;
const CERTS=[{id:'goethe',name:'Goethe-Zertifikat',levels:['A1','A2','B1','B2','C1','C2'],ready:false,route:'#/level'},{id:'telc',name:'telc Deutsch',levels:['A1','A2','B1','B2','C1'],ready:false,route:'#/level'},{id:'testdaf',name:'TestDaF',levels:['B2','C1'],ready:false,route:'#/level'}];
const FOC=['level','grammar','vocab','exam'],DEST={grammar:'#/lab',vocab:'#/lab',dictation:'#/lab',pronunciation:'#/lab',skills:'#/level',cert:'#/level'};
const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const fmtD=v=>new Date(v+'T00:00').toLocaleDateString(lang==='de'?'de-DE':'en-GB',{day:'2-digit',month:'2-digit',year:'numeric'});
const rd=k=>{try{return JSON.parse(store.get(k)||'null')}catch(e){return null}};
const okD=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(new Date(v));
function loadGoal(){const g=rd('ll-goal');if(!g)return null;const a=LV.indexOf(g.currentLevel),b=LV.indexOf(g.targetLevel),I=Number.isInteger;return a>=0&&b>a&&I(g.months)&&g.months>=1&&g.months<=60&&I(g.sessionsPerWeek)&&g.sessionsPerWeek>=1&&g.sessionsPerWeek<=7&&I(g.minutesPerSession)&&g.minutesPerSession>0&&g.estimatedHours>0&&g.bufferFactor>0&&okD(g.effectiveFrom)?g:null}
function loadPlan(){const p=rd('ll-plan');return p&&LV.includes(p.level)&&Array.isArray(p.cats)&&p.cats.every(c=>c in DEST)&&['library','practice'].includes(p.fmt)&&Array.isArray(p.skills)&&Array.isArray(p.certs)?p:null}
goal=loadGoal();let plan=loadPlan(),delArm=false;
const lvNow=()=>sel>=0?LV[sel]:(goal?goal.currentLevel:'');
const gp=$('#goalPop'),gb=$('#goalBtn'),gd=$('#goalDlg'),pd=$('#pathDlg'),idg=$('#infoDlg');
function gpOpen(o){gp.hidden=!o||!goal;gb.setAttribute('aria-expanded',String(!gp.hidden));if(gp.hidden)delArm=false}
const fmtMin=m=>m>=60?(Math.round(m/6)/10).toString().replace('.',lang==='de'?',':'.')+' h':m+' min';
function monthsLeft(g){const el=(Date.now()-new Date(g.effectiveFrom+'T00:00'))/(864e5*30.44);return Math.max(0,Math.ceil(g.months-el))}
function weekDone(){const k=LLCore.key(),ws=LLCore.weekStart(k);let n=0;for(const d in REC.days)if(d>=ws&&d<=k)n+=REC.days[d].sessionsMet||0;return n}
function renderGoal(){
  const g=goal;
  $('#goalTxt').innerHTML=g?`<span class="gl">${g.currentLevel}→${g.targetLevel}</span> <b>${g.minutesPerSession}</b> ${tt('unit.min')}`:tt('goal.add');
  $('#goalShort').textContent=g?g.minutesPerSession+'′':'+';gb.classList.toggle('empty',!g);
  gb.setAttribute('aria-label',g?tt('goal.mine')+': '+g.currentLevel+' → '+g.targetLevel+', '+g.minutesPerSession+' '+tt('cm.per'):tt('goal.add'));
  if(g){const left=monthsLeft(g),over=left<=0;
    gp.innerHTML=`<p class="gp-t">${tt('goal.mine')}</p><dl class="gp-d"><div><dt>${tt('g.lv')}</dt><dd>${g.currentLevel} → ${g.targetLevel}</dd></div><div><dt>${tt('g.mps')}</dt><dd>${g.minutesPerSession} ${tt('unit.min')}</dd></div><div><dt>${tt('goal.week')}</dt><dd>${g.sessionsPerWeek}×</dd></div><div><dt>${tt('g.rem')}</dt><dd>${left}</dd></div><div><dt>${tt('g.stat')}</dt><dd>${over?tt('g.over'):tt('g.act')}</dd></div></dl><p class="gp-n">${tt('goal.note2')}</p><div class="gp-b"><button type="button" class="btn sm" data-act="edit">${tt('cm.edit')}</button><button type="button" class="ibtn" data-act="learn">${tt('plan.t')}</button><button type="button" class="ibtn" data-act="del">${delArm?tt('goal.del2'):tt('goal.del')}</button></div>`}
  else gp.innerHTML='';
  renderCommit();
}
function renderCommit(){
  const c=$('#commit'),g=goal,was=!c.hidden;c.hidden=!g;if(!g){c.innerHTML='';if(was)schedule();return}
  const left=monthsLeft(g),wk=g.minutesPerSession*g.sessionsPerWeek,r=REC.days[LLCore.key()],best=r?Math.floor(r.qualifyingSessionSeconds/60):0,need=g.minutesPerSession;
  c.innerHTML=`<div class="cm-h"><span id="cmT">${tt('cm.t')}</span><span class="cm-lv">${g.currentLevel} → ${g.targetLevel}</span></div>
<p class="cm-big"><b>${g.minutesPerSession}</b><span>${tt('cm.per')}</span></p>
<p class="cm-d">${tt('cm.line').replace('{s}',g.sessionsPerWeek).replace('{w}',fmtMin(wk)).replace('{m}',left)}</p>
${g.minutesPerSession>LL_CFG.warnMinutes?`<p class="cm-w">${tt('gd.warn')}</p>`:''}
<div class="cm-p" aria-live="polite"><span>${best>=need?tt('cm.done'):best>0?tt('cm.today').replace('{a}',best).replace('{n}',need):tt('cm.none')}</span><progress max="${need}" value="${Math.min(best,need)}"></progress><span>${tt('cm.week').replace('{d}',Math.min(weekDone(),g.sessionsPerWeek)).replace('{s}',g.sessionsPerWeek)}</span></div>
<div class="cm-b"><a class="btn sm" href="#/lab">${tt('cm.go')}</a><button type="button" class="ibtn" data-act="edit2">${tt('cm.edit')}</button></div>`;
  if(!was)schedule();
}
$('#commit').addEventListener('click',e=>{if(e.target.closest('[data-act=edit2]'))openGoal()});
gp.addEventListener('click',e=>{e.stopPropagation();const a=e.target.closest('[data-act]');if(!a)return;const k=a.dataset.act;
  if(k==='learn'){gpOpen(false);openPath()}else if(k==='edit'){gpOpen(false);openGoal()}
  else if(!delArm){delArm=true;renderGoal();$('[data-act=del]',gp).focus()}
  else{goal=null;store.set('ll-goal','');gpOpen(false);syncRule();renderAll();gb.focus()}});
/* goal dialog: levels come from the yarn picker, never asked again */
const gdM=$('#gdMonths'),gdW=$('#gdWeek');
function gdCalc(){
  const res=$('#gdRes'),err=$('#gdErr'),raw=gdM.value.trim(),m=+raw;err.textContent='';let H;
  try{H=LLCore.hours(HOURS,LV[sel],LV[tsel])}catch(e){res.hidden=true;err.textContent=tt('gd.e.cfg');return null}
  if(!/^\d+$/.test(raw)||m<1||m>LL_CFG.maxMonths){res.hidden=true;if(raw)err.textContent=tt('gd.e.m');return null}
  const s=+gdW.value,mins=LLCore.session({hours:H,months:m,sessionsPerWeek:s,buffer:LL_CFG.buffer,weeksPerMonth:LL_CFG.weeksPerMonth});
  res.hidden=false;
  res.innerHTML=`<span>${tt('gd.res')}</span><b>${mins}</b><span>${tt('cm.per')}</span><p class="hint-s">${tt('gd.detail').replace('{s}',s).replace('{h}',fmtMin(mins*s))}</p><p class="hint-s">${tt('gd.basis').replace('{h}',H).replace('{b}',Math.round((LL_CFG.buffer-1)*100))}</p>${mins>LL_CFG.warnMinutes?`<p class="cm-w" role="alert">${tt('gd.warn')}</p>`:''}`;
  return{H,m,s,mins};
}
function openGoal(){
  if(!locked||tsel<=sel){location.hash='#level';return}
  const g=goal&&goal.currentLevel===LV[sel]&&goal.targetLevel===LV[tsel]?goal:null;
  $('#gdFrom').textContent=LV[sel];$('#gdTo').textContent=LV[tsel];
  gdM.value=g?g.months:6;gdW.value=g?g.sessionsPerWeek:4;$('#gdWeekO').textContent=gdW.value;gdCalc();gd.showModal();gdM.focus();
}
gdM.addEventListener('input',()=>{gdM.value=gdM.value.replace(/\D/g,'').slice(0,2);gdCalc()});
gdW.addEventListener('input',()=>{$('#gdWeekO').textContent=gdW.value;gdCalc()});
$('#goalForm').addEventListener('submit',e=>{e.preventDefault();
  const c=gdCalc();if(!c){if(!$('#gdErr').textContent)$('#gdErr').textContent=tt('gd.e.m');return}
  const now=iso(new Date()),prev=goal;
  if(prev){const h=rd('ll-goal-hist')||[];h.push(Object.assign({},prev,{replacedOn:now}));store.set('ll-goal-hist',JSON.stringify(h.slice(-50)))}
  /* a new goal applies from today on; already earned days are never re-evaluated */
  goal={currentLevel:LV[sel],targetLevel:LV[tsel],months:c.m,sessionsPerWeek:c.s,estimatedHours:c.H,bufferFactor:LL_CFG.buffer,minutesPerSession:c.mins,createdAt:prev?prev.createdAt:now,updatedAt:now,effectiveFrom:now};
  store.set('ll-goal',JSON.stringify(goal));gd.close();syncRule();renderAll();
  if(route==='start')scrollTo({top:0,behavior:rm()?'auto':'smooth'});
});
gb.addEventListener('click',()=>{popOpen(false);if(!goal){const l=$('#level');if(route==='start'&&l)l.scrollIntoView({behavior:rm()?'auto':'smooth'});else location.hash='#level';return}const o=gp.hidden;gpOpen(o);if(o)$('button',gp).focus()});
setBtn.addEventListener('click',()=>gpOpen(false));
D.addEventListener('keydown',e=>{if(e.key==='Escape'&&!gp.hidden){gpOpen(false);gb.focus()}});
D.addEventListener('click',e=>{if(!gp.hidden&&!gp.contains(e.target)&&!gb.contains(e.target))gpOpen(false);
  const c=e.target.closest('[data-close]');if(c)c.closest('dialog').close();
  if(e.target.tagName==='DIALOG')e.target.close();
  const i=e.target.closest('[data-info]');if(i)openInfo(i.dataset.info);
  if(e.target.closest('[data-plan-x]')){plan=null;store.set('ll-plan','');renderPlan()}});
/* goal dialog */
/* path dialog */
function openPath(){
  const l=lvNow(),pf=$('#pathForm'),same=plan&&plan.level===l?plan:null;
  $('#pdLv').textContent=tt('p.lv').replace('{l}',l||'–');
  $('#pCertList').innerHTML=CERTS.filter(c=>!l||c.levels.includes(l)).map(c=>`<label><input type="checkbox" name="ce" value="${c.id}"${same&&same.certs.includes(c.id)?' checked':''}><span>${c.name} · ${c.levels[0]}–${c.levels[c.levels.length-1]}${c.ready?'':' · '+tt('p.soon')}</span></label>`).join('');
  $$('input[name=cat]',pf).forEach(i=>i.checked=!!same&&same.cats.includes(i.value));
  $$('input[name=sk]',pf).forEach(i=>i.checked=!!same&&same.skills.includes(i.value));
  $$('input[name=fmt]',pf).forEach(i=>i.checked=!!same&&same.fmt===i.value);
  $('#pAccN').hidden=true;$('#pErr').textContent='';pathToggle();pd.showModal();
}
function pathToggle(){const pf=$('#pathForm'),on=v=>$('input[name=cat][value='+v+']',pf).checked;$('#pSkills').hidden=!on('skills');$('#pCerts').hidden=!on('cert')}
$('#pCats').addEventListener('change',pathToggle);
$('#pAcc').addEventListener('click',()=>{$('#pAccN').hidden=false});
function planHref(c){return DEST[c]+'?level='+plan.level+'&cat='+c+'&fmt='+plan.fmt+(c==='skills'?'&skills='+plan.skills.join(','):'')+(c==='cert'?'&cert='+plan.certs.join(','):'')}
$('#pathForm').addEventListener('submit',e=>{e.preventDefault();const pf=e.target,v=n=>$$('input[name='+n+']:checked',pf).map(i=>i.value);
  const cats=v('cat'),sk=v('sk'),ce=v('ce'),fmt=v('fmt')[0]||'practice',er=!cats.length?'p.e1':cats.includes('skills')&&!sk.length?'p.e2':cats.includes('cert')&&!ce.length?'p.e3':!fmt?'p.e4':'';
  if(er){$('#pErr').textContent=tt(er);return}
  plan={level:lvNow(),cats,skills:cats.includes('skills')?sk:[],certs:cats.includes('cert')?ce:[],fmt,mode:'guest'};store.set('ll-plan',JSON.stringify(plan));
  pd.close();renderPlan();location.hash=planHref(cats[0]);});
function renderPlan(){
  if(typeof renderLab==='function')renderLab();
  const cur=new URLSearchParams(location.hash.split('?')[1]||'').get('cat');
  $$('[data-plan]').forEach(b=>{if(!plan){b.hidden=true;b.innerHTML='';return}b.hidden=false;
    b.innerHTML=`<div class="plan-h"><b>${tt('plan.t')}</b><span class="muted">${plan.level} · ${tt('fmt.'+plan.fmt)}</span><button type="button" class="ibtn" data-plan-x>${tt('plan.x')}</button></div><ul>${plan.cats.map(c=>`<li${c===cur?' aria-current="true"':''}><a href="${planHref(c)}">${tt('cat.'+c)}${c==='skills'?': '+plan.skills.map(x=>tt('sk.'+x)).join(', '):''}${c==='cert'?': '+plan.certs.map(x=>(CERTS.find(z=>z.id===x)||{name:''}).name).join(', '):''}</a></li>`).join('')}</ul><p class="muted">${tt('plan.n')}</p>`});
}
function renderAll(){renderGoal();renderPlan();if(typeof renderLabMenu==='function'){renderLabMenu();renderStreak()}pickers.forEach(p=>p.refresh());if(typeof renderLib==='function'){renderLib();renderLvlCerts();if(tr.open)renderTour()}}
