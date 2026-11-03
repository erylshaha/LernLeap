/* Shared helpers and localStorage wrapper. (classic script: shares one global scope, load order matters, see index.html) */
const D=document,R=D.documentElement,$=(s,c=D)=>c.querySelector(s),$$=(s,c=D)=>[...c.querySelectorAll(s)];
R.classList.add('js');
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const mq=matchMedia('(prefers-reduced-motion: reduce)'),rm=()=>mq.matches;
const LV=['A1','A2','B1','B2','C1','C2'];
