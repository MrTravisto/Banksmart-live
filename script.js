let ACCOUNTS=[];let DATA_LOADED=false;

window.addEventListener('DOMContentLoaded',()=>{
 const loader=document.createElement('p');
 loader.id='loading';
 loader.textContent='Loading bank data...';
 loader.style.color='#94a3b8';
 document.getElementById('results').appendChild(loader);

 fetch('fees.json')
 .then(r=>r.json())
 .then(data=>{
   ACCOUNTS=data;
   DATA_LOADED=true;
   loader.remove();
   showResults();
 })
 .catch(()=>loader.textContent='Error loading data.');
});

function showResults(){
 if(!DATA_LOADED)return;

 const salary=Number(document.getElementById('salary').value)||0;
 const res=document.getElementById('results');
 const tbl=document.getElementById('compareTable');

 const filtered = salary===0 ? ACCOUNTS : ACCOUNTS.filter(a=>salary>=a.minIncome);

 if(filtered.length===0){
   res.innerHTML='<p class="no-match">No accounts match your salary.</p>';
   tbl.innerHTML='';
   return;
 }

 const sorted=[...filtered].sort((a,b)=>a.fee-b.fee);

 res.innerHTML = sorted.map(a=>`
   <div class="card">
     <strong>${a.bank} – ${a.account}${a.notes!=='Official'?' ('+a.notes+')':''}</strong><br>
     Monthly fee: R${a.fee}<br>
     ATM: R${a.ownATM} (own) / R${a.otherATM} (other)<br>
     Cash@Till: R${a.cashAtTill}<br>
   </div>
 `).join('');

 tbl.innerHTML = `
 <table>
   <thead>
     <tr>
       <th>Bank</th><th>Account</th><th>Monthly</th><th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th>
     </tr>
   </thead>
   <tbody>
     ${sorted.map(a=>`
       <tr>
         <td>${a.bank}</td>
         <td>${a.account}</td>
         <td>R${a.fee}</td>
         <td>R${a.ownATM}</td>
         <td>R${a.otherATM}</td>
         <td>R${a.cashAtTill}</td>
       </tr>
     `).join('')}
   </tbody>
 </table>`;
}
