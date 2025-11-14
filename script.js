async function loadFees(){
  const res = await fetch('fees.json');
  return await res.json();
}

document.getElementById('btnCompare').addEventListener('click', async () => {
  const salary = Number(document.getElementById('salary').value);
  const data = await loadFees();

  const filtered = data.filter(a => a.minSalary <= salary)
                       .sort((a,b)=>a.fee-b.fee);

  let html = "<table><tr><th>Bank</th><th>Account</th><th>Fee</th><th>Notes</th></tr>";

  filtered.forEach(a=>{
    html += `<tr>
      <td>${a.bank}</td>
      <td>${a.account}</td>
      <td>${a.fee === 0 ? "FREE" : "R " + a.fee.toFixed(2)}</td>
      <td>${a.notes}</td>
    </tr>`;
  });

  html += "</table>";
  document.getElementById('results').innerHTML = html;
});
