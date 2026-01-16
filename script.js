let ACCOUNTS=[];let DATA_LOADED=false;

window.addEventListener('DOMContentLoaded',()=>{
  fetch('fees.json').then(r=>r.json()).then(d=>{ACCOUNTS=d;DATA_LOADED=true;});
});

function showResults(){
  if(!DATA_LOADED)return;
  const salary=Number(document.getElementById('salary').value);
  const res=document.getElementById('results');
  const tbl=document.getElementById('compareTable');
  const title=document.getElementById('tableTitle');

  if(!salary){
    res.innerHTML='<p>Please enter your salary.</p>';
    tbl.innerHTML=''; title.style.display='none'; return;
  }

  const list=ACCOUNTS.filter(a=>salary>=a.minIncome).sort((a,b)=>a.fee-b.fee);
  if(list.length===0){
    res.innerHTML='<p>No accounts match your salary.</p>';
    tbl.innerHTML=''; title.style.display='none'; return;
  }

  res.innerHTML=list.map(a=>`
    <div class="card">
      <strong>${a.bank} – ${a.account}</strong><br>
      Monthly fee: R${a.fee}<br>
      ATM: R${a.ownATM} / R${a.otherATM}<br>
      Cash@Till: R${a.cashAtTill}
    </div>`).join('');

  title.style.display='block';
  tbl.innerHTML = `
    <table>
      <thead>
        <tr><th>Bank</th><th>Account</th><th>Fee</th><th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th></tr>
      </thead>
      <tbody>
        ${list.map(a=>`
          <tr>
            <td>${a.bank}</td>
            <td>${a.account}</td>
            <td>R${a.fee}</td>
            <td>R${a.ownATM}</td>
            <td>R${a.otherATM}</td>
            <td>R${a.cashAtTill}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}
