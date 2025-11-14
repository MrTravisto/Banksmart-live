// BankSmart v2 - script.js
// Built for Trevor Barnard
// - Compare button enabled only when salary entered
// - TymeBank removed (per request)
// - Separate CSS + JS, ready to upload to GitHub
// - Placeholder for live fee fetch (API-ready)

// DOM elements
const salaryInput = document.getElementById('salary');
const transactionsSelect = document.getElementById('transactions');
const compareButton = document.getElementById('btnCompare');
const resetButton = document.getElementById('btnReset');
const salaryError = document.getElementById('salaryError');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');

// Static accounts (TymeBank removed). Update as needed or wire to live API.
const ACCOUNTS = [
  // Digital / Zero fee
  {bank:"Bank Zero", account:"Personal", fee:0, transactionCost:0, includedTransactions:0, minSalary:0, type:"digital", notes:"Zero monthly fee • App-based", url:"https://www.bankzero.co.za", rating:4.4, reviews:893},

  // Pay-as-you-transact / Budget
  {bank:"Capitec", account:"Global One", fee:7.50, transactionCost:2.00, includedTransactions:5, minSalary:0, type:"traditional", notes:"Low monthly fee + PAYT", url:"https://apply.capitecbank.co.za", rating:4.6, reviews:3562},
  {bank:"Absa", account:"Transact", fee:7.00, transactionCost:2.80, includedTransactions:0, minSalary:0, type:"traditional", notes:"Value-for-money account", url:"https://www.absa.co.za", rating:4.1, reviews:1987},
  {bank:"FNB", account:"Easy PAYT", fee:7.50, transactionCost:2.50, includedTransactions:0, minSalary:0, type:"traditional", notes:"Pay-as-you-transact option", url:"https://www.fnb.co.za", rating:4.3, reviews:2876},

  // Bundled
  {bank:"FNB", account:"Easy Bundled", fee:73.50, transactionCost:0, includedTransactions:30, minSalary:0, type:"traditional", notes:"Bundled account • 30 transactions included", url:"https://www.fnb.co.za", rating:4.0, reviews:3421},
  {bank:"African Bank", account:"MyWORLD", fee:75, transactionCost:0, includedTransactions:25, minSalary:0, type:"traditional", notes:"Bundle account with savings pockets", url:"https://www.africanbank.co.za", rating:3.9, reviews:876},
  {bank:"Standard Bank", account:"MyMo Plus", fee:125, transactionCost:0, includedTransactions:35, minSalary:0, type:"traditional", notes:"Bundle with transactions included", url:"https://www.standardbank.co.za", rating:4.2, reviews:2314},
  {bank:"Nedbank", account:"MiGoals", fee:105, transactionCost:0, includedTransactions:30, minSalary:0, type:"traditional", notes:"Goal-based banking bundle", url:"https://www.nedbank.co.za", rating:4.1, reviews:1567},

  // Premium
  {bank:"FNB", account:"Premier", fee:265, transactionCost:0, includedTransactions:100, minSalary:25000, type:"premium", notes:"Premium benefits & lounge access", url:"https://www.fnb.co.za", rating:4.5, reviews:1567},
  {bank:"Standard Bank", account:"Prestige Plus", fee:385, transactionCost:0, includedTransactions:120, minSalary:35000, type:"premium", notes:"Premium concierge & rewards", url:"https://www.standardbank.co.za", rating:4.3, reviews:987}
];

// Validation and UI
function updateCompareButton(){
  const salary = Number(salaryInput.value) || 0;
  compareButton.disabled = !(salary > 0);
  if(salary > 0){ salaryError.style.display='none'; salaryInput.style.borderColor=''; statusDiv.textContent='Ready — click Compare Accounts'; }
  else { statusDiv.textContent='Enter salary & transactions, then press Compare Accounts.'; }
}

// Salary error
function showSalaryError(){ salaryError.style.display='block'; salaryInput.style.borderColor='#ef4444'; compareButton.disabled=true; statusDiv.textContent='Please fix the errors above.'; }

// Compute total monthly cost for account given transactions
function calculateTotalCost(account, transactions){
  let total = Number(account.fee) || 0;
  if(account.transactionCost && transactions > (account.includedTransactions||0)){
    total += (transactions - (account.includedTransactions||0)) * Number(account.transactionCost);
  }
  return total;
}

// Render results
function renderResults(accounts, salary, transactions){
  // filter by salary eligibility
  const filtered = accounts.filter(a => (a.minSalary||0) <= salary);
  if(filtered.length === 0){
    resultsDiv.innerHTML = `<div class="card"><p style="padding:18px;color:var(--muted)">No accounts match your salary criteria. Try a lower min salary or increase salary input.</p></div>`;
    statusDiv.textContent = 'No matches — adjust your salary.';
    return;
  }

  // map with total cost and sort
  const mapped = filtered.map(a => ({...a, totalCost: calculateTotalCost(a, transactions)})).sort((x,y)=>x.totalCost - y.totalCost);

  // Build HTML (no "best" highlighted as requested earlier to remove Best Match)
  let html = '';
  // Savings block vs avg traditional bank
  const cheapest = mapped[0];
  const avgTraditional = 120;
  const savingsMonthly = Math.max(0, avgTraditional - cheapest.totalCost);
  if(savingsMonthly > 0){
    html += `<div class="savings-card"><h3>💰 Potential Savings</h3><p>Compared to average bank fees, choosing the cheapest option (${cheapest.bank}) could save you:</p><div class="savings-amount">R ${(savingsMonthly*12).toLocaleString()} / year</div></div>`;
  }

  html += `<div class="card"><h3>Matching Accounts (${mapped.length}) — sorted by estimated total monthly cost</h3><table class="table" role="table"><thead><tr><th>Bank</th><th>Account</th><th>Monthly Fee</th><th>Total Est. Cost</th><th>Notes</th><th></th></tr></thead><tbody>`;

  mapped.forEach(acc => {
    html += `<tr ${acc.featured? 'class="capitec-highlight"':''}><td><strong>${acc.bank}</strong></td><td>${acc.account}</td><td>${acc.fee===0?'FREE':'R '+Number(acc.fee).toFixed(2)}</td><td><strong>R ${acc.totalCost.toFixed(2)}</strong></td><td>${acc.notes}</td><td><a class="apply-btn" href="${acc.url}" target="_blank" onclick="trackAffiliateClick('${acc.bank}','${acc.account}')">Apply</a></td></tr>`;
  });

  html += `</tbody></table></div>`;
  resultsDiv.innerHTML = html;
  statusDiv.textContent = `Showing ${mapped.length} result${mapped.length>1?'s':''} — sorted by estimated cost.`;
  // scroll into view
  resultsDiv.scrollIntoView({behavior:'smooth', block:'center'});
}

// Placeholder: fetch live fees from API (not active on GH Pages unless you have an API)
async function fetchLiveFees(){
  // Example structure: GET /api/fees -> [{bank,account,fee,transactionCost,...},...]
  // Right now we return the bundled static ACCOUNTS but this function is ready for a real fetch.
  // When you have a server or service, update this function to call it.
  return ACCOUNTS;
}

// Affiliate tracking (placeholder for analytics)
function trackAffiliateClick(bank, account){
  console.log('Affiliate click:', bank, account);
  // integrate gtag or other analytics here if desired
}

// Event handlers
compareButton.addEventListener('click', async ()=>{
  const salary = Number(salaryInput.value) || 0;
  const transactions = Number(transactionsSelect.value) || 15;
  if(!salary || salary<=0){ showSalaryError(); return; }
  // load live or static data
  const accounts = await fetchLiveFees();
  renderResults(accounts, salary, transactions);
});

resetButton.addEventListener('click', ()=>{
  salaryInput.value='';
  transactionsSelect.value='15';
  updateCompareButton();
  resultsDiv.innerHTML='';
  statusDiv.textContent='Enter salary & transactions, then press Compare Accounts.';
});

salaryInput.addEventListener('input', updateCompareButton);
salaryInput.addEventListener('blur', ()=>{ if(!(Number(salaryInput.value)||0)>0 && salaryInput.value!=='') showSalaryError(); });

// initialize UI
updateCompareButton();
statusDiv.textContent = 'Ready — enter salary to enable Compare Accounts';
console.log('BankSmart v2 script loaded - built for Trevor Barnard');
