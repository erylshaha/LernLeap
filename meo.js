/* MEo the hero cat rig and meow. (classic script: shares one global scope, load order matters, see index.html) */
/* ===== MEo: alive hero cat + meow ===== */
const hsvg=$('#heroSvg'),meowBtn=$('#meowBtn'),miau=$('#miau');
const rig=MeoRig(hsvg);
let AC=null;
function meow(){
  miau.classList.remove('pulse');void miau.offsetWidth;miau.classList.add('pulse');
  try{
    AC=AC||new (window.AudioContext||window.webkitAudioContext)();
    if(AC.state==='suspended')AC.resume();
    if(AC.state!=='running')return;
    const t=AC.currentTime,o=AC.createOscillator(),lfo=AC.createOscillator(),lg=AC.createGain(),f=AC.createBiquadFilter(),f2=AC.createBiquadFilter(),g=AC.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(430,t);o.frequency.exponentialRampToValueAtTime(820,t+.2);o.frequency.exponentialRampToValueAtTime(640,t+.42);o.frequency.exponentialRampToValueAtTime(470,t+.72);
    lfo.frequency.value=6;lg.gain.value=9;lfo.connect(lg);lg.connect(o.frequency);
    f.type='bandpass';f.Q.value=3.2;f.frequency.setValueAtTime(750,t);f.frequency.linearRampToValueAtTime(1750,t+.22);f.frequency.linearRampToValueAtTime(950,t+.72);
    f2.type='lowpass';f2.frequency.value=3600;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.55,t+.07);g.gain.setValueAtTime(.5,t+.4);g.gain.exponentialRampToValueAtTime(.001,t+.78);
    o.connect(f);f.connect(f2);f2.connect(g);g.connect(AC.destination);
    o.start(t);lfo.start(t);o.stop(t+.8);lfo.stop(t+.8);
  }catch(e){}
  meowBtn.classList.add('on');setTimeout(()=>meowBtn.classList.remove('on'),800);
}
const heroAct=()=>{if(!rm())rig.happy();meow()};
heroBox.addEventListener('click',heroAct);
heroBox.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();heroAct()}});
meowBtn.addEventListener('click',e=>{e.stopPropagation();heroAct()});
addEventListener('pointermove',e=>{if(route==='start')rig.lookAt(e.clientX,e.clientY)},{passive:true});
