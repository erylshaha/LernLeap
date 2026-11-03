/* Info dialogs and the feedback form. (classic script: shares one global scope, load order matters, see index.html) */
/* info dialogs */
function openInfo(k){
  if(!['terms','priv','upd','fb','acc'].includes(k))return;
  $('#idT').textContent=tt('i.'+k);const b=$('#idB');
  $('#idAct').hidden=false;if(k!=='fb')b.innerHTML='<p></p>',b.firstChild.textContent=tt('i.'+k+'.b');
  else{b.innerHTML=`<form id="fbF" novalidate><label class="fl" for="fbC">${tt('fb.cat')}</label><select id="fbC">${['bug','content','feature','general'].map(x=>`<option value="${x}">${tt('fb.'+x)}</option>`).join('')}</select><label class="fl" for="fbM">${tt('fb.msg')}</label><textarea id="fbM"></textarea><p class="err" id="fbS" role="alert"></p><div class="fb-act"><button type="button" class="ibtn" data-close>${tt('close')}</button><button class="btn sm" type="submit">${tt('fb.send')}</button></div></form>`;$('#idAct').hidden=true;
    $('#fbF').addEventListener('submit',e=>{e.preventDefault();$('#fbS').textContent=$('#fbM').value.trim().length<10?tt('fb.e'):tt('fb.ok')})}
  idg.showModal();
}
