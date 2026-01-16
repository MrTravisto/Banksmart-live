let ACCOUNTS=[];let DATA_LOADED=false;

window.addEventListener('DOMContentLoaded',()=>{
fetch('fees.json')
.then(r=>r.json())
.then(d=>{ACCOUNTS=d;DATA_LOADED=true;})
});

function showResults(){
if(!DATA_LOADED)return;
const salary = Number(document.getElementById('salary').value)||0;
const res = document.getElementById('results');
const tbl = document.getElementById('compareTable');

if(salary<=0){
res.innerHTML='<p>Please enter a valid salary.</p>';
tbl.innerHTML='';
return;
}

const filtered = ACCOUNTS.filter(a=>salary>=a.minIncome);
if(filtered.length===0){
res.innerHTML='<p>No accounts match your salary.</p>';
tbl.innerHTML='';
return;
}

res.innerHTML = filtered.map(a=>`
<div class="card">
<strong>${a.bank} – ${a.account}</strong><br>
Monthly fee: R${a.fee}<br>
ATM: R${a.ownATM} / R${a.otherATM}<br>
Cash@Till: R${a.cashAtTill}
</div>`).join("");

tbl.innerHTML = `
<table>
<thead>
<tr>
<th>Bank</th><th>Account</th><th>Monthly Fee</th>
<th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th>
</tr>
</thead>
<tbody>
${filtered.map(a=>`
<tr>
<td>${a.bank}</td>
<td>${a.account}</td>
<td>R${a.fee}</td>
<td>R${a.ownATM}</td>
<td>R${a.otherATM}</td>
<td>R${a.cashAtTill}</td>
</tr>`).join("")}
</tbody>
</table>`;
}
