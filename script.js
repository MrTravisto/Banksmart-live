
let ACCOUNTS=[];
fetch('fees.json').then(r=>r.json()).then(d=>ACCOUNTS=d);

function showResults(){
 let salary=Number(document.getElementById('salary').value)||0;
 let cap=Infinity;
 let res=document.getElementById('results');
 let tbl=document.getElementById('compareTable');

 let m=ACCOUNTS; 

 if(!m.length){res.innerHTML='No results';return;}

 m.sort((a,b)=>a.fee-b.fee);

 res.innerHTML = m.map((a,i)=>`
   <div class="card ${i===0?'best':''}">
     <h2>${a.bank} – ${a.account}</h2>
     <p>Monthly: R${a.fee}</p>
     <p>Own ATM: R${a.ownATM} | Other ATM: R${a.otherATM} | Cash@Till: R${a.cashAtTill}</p>
     <p>${a.notes}</p>
   </div>
 `).join('');

 tbl.innerHTML = `
 <table>
 <thead><tr>
 <th>Bank</th><th>Account</th><th>Monthly</th>
 <th>Own ATM</th><th>Other ATM</th><th>Cash@Till</th>
 </tr></thead>
 <tbody>
 ${m.map(a=>`
 <tr>
 <td>${a.bank}</td><td>${a.account}</td><td>R${a.fee}</td>
 <td>R${a.ownATM}</td><td>R${a.otherATM}</td><td>R${a.cashAtTill}</td>
 </tr>`).join('')}
 </tbody>
 </table>`;
}
