
const ACCOUNTS = [
  {bank:"TymeBank",account:"EveryDay",fee:0,minSalary:0,notes:"Zero monthly fee"},
  {bank:"Bank Zero",account:"Personal",fee:0,minSalary:0,notes:"Zero fee"},
  {bank:"Capitec",account:"Global One",fee:7.50,minSalary:0,notes:"Low monthly fee"},
  {bank:"Absa",account:"Transact",fee:6.50,minSalary:0,notes:"Low-cost"},
  {bank:"African Bank",account:"MyWORLD",fee:69,minSalary:0,notes:"Bundle"},
  {bank:"FNB",account:"Easy Account",fee:69,minSalary:0,notes:"Entry-level"}
];

function showResults(accounts, salary) {
  const results = document.getElementById('results');
  let matches = accounts.filter(a => a.minSalary <= salary).sort((a,b)=>a.fee-b.fee);

  if (matches.length === 0) {
    results.innerHTML = "<p>No matching accounts.</p>";
    return;
  }

  const best = matches[0];
  let html = `
    <div class="best">
      <h3>${best.bank} — ${best.account}</h3>
      <p><strong>Monthly fee:</strong> ${best.fee === 0 ? "FREE" : "R " + best.fee.toFixed(2)}</p>
      <p>${best.notes}</p>
    </div>
  `;

  results.innerHTML = html;
}

document.getElementById("btnCompare").addEventListener("click", () => {
  const salary = Number(document.getElementById("salary").value) || 0;
  if (!salary || salary <= 0) { alert("Enter valid salary"); return; }
  showResults(ACCOUNTS, salary);
});

document.getElementById("status").textContent = `Loaded ${ACCOUNTS.length} accounts`;
showResults(ACCOUNTS, 18000);
