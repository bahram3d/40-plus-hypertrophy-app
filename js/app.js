import {buildPlan} from './planner.js';
const d=document;
const user=JSON.parse(localStorage.getItem('h40user')||'{}');
if(user.bw)d.getElementById('bw').value=user.bw;
if(user.wrist)d.getElementById('wrist').value=user.wrist;

d.getElementById('save-user').onclick=()=>{
  const u={bw:+d.getElementById('bw').value, wrist:+d.getElementById('wrist').value};
  localStorage.setItem('h40user',JSON.stringify(u));
  localStorage.setItem('h40plan',JSON.stringify(buildPlan(u)));
  showTab('plan');
  renderPlan();
};

d.getElementById('tab-onboarding').onclick=()=>showTab('onboarding');
d.getElementById('tab-plan').onclick=()=>{renderPlan();showTab('plan');};
d.getElementById('tab-log').onclick=()=>{renderLog();showTab('log');};
d.getElementById('save-session').onclick=saveSession;

function showTab(id){['onboarding','plan','log'].forEach(v=>{
  d.getElementById('view-'+v).hidden=v!==id;
  d.getElementById('tab-'+v).classList.toggle('active',v===id);
})}

function renderPlan(){
  const plan=JSON.parse(localStorage.getItem('h40plan'));
  const html=Object.entries(plan[0]).map(([day,lifts])=>
    `<h3>${day}</h3>${lifts.map(l=>`<p>${l.name} ${l.sets}×${l.reps}</p>`).join('')}`
  ).join('');
  d.getElementById('plan-view').innerHTML=html;
}
function renderLog(){
  const plan=JSON.parse(localStorage.getItem('h40plan'));
  const today=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
  const lifts=plan[0][today]||[];
  const html=lifts.map((l,i)=>`
    <div>
      <strong>${l.name}</strong>
      ${Array.from({length:l.sets},(_,s)=>`
        <input data-lift="${i}" data-set="${s}" type="number" placeholder="reps" size="3">
        <input data-lift="${i}" data-set="${s}" type="number" placeholder="RIR" size="2">`).join('')}
    </div>`).join('');
  d.getElementById('log-view').innerHTML=html||'<p>Rest day – mobility only.</p>';
}
function saveSession(){
  const rows=[...d.querySelectorAll('#log-view input[data-lift]')];
  const data=rows.map(r=>({lift:+r.dataset.lift,set:+r.dataset.set,reps:r.value||0,rir:r.nextElementSibling.value||0}));
  const key='log_'+new Date().toISOString().slice(0,10);
  localStorage.setItem(key,JSON.stringify(data));
  alert('Session saved offline');
}