/*
 Full pricing calculations (Option 2)
 Heavy user preset used as defaults.
 Data below are illustrative and should be verified.
*/

const ACCOUNTS = [
  // TymeBank / Bank Zero / Spot Money
  {bank:"TymeBank", account:"EveryDay", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:5, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"digital", notes:"Zero monthly fee (digital)"},
  {bank:"Bank Zero", account:"Personal", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:5, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"digital", notes:"Zero monthly fee (app-only)"},
  {bank:"Spot Money", account:"Digital", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:5, eftFee:5, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"digital", notes:"Digital account - low fees"},

  // Capitec
  {bank:"Capitec", account:"Global One", monthlyFee:7.50, debitOrderFee:0.5, cardFee:0.9, atmFee:9.50, eftFee:6.50, cashDepositFee:10, includedTransactions:5, minSalary:0, type:"traditional", notes:"Low monthly fee, pay-as-you-transact after included"},

  // Absa - multiple
  {bank:"Absa", account:"Transact", monthlyFee:7.00, debitOrderFee:2.8, cardFee:1.0, atmFee:10, eftFee:7, cashDepositFee:15, includedTransactions:0, minSalary:0, type:"traditional", notes:"Value account"},
  {bank:"Absa", account:"Flexi Bundle", monthlyFee:95, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:30, minSalary:0, type:"bundled", notes:"Bundle with included transactions"},
  {bank:"Absa", account:"Premier Bundle", monthlyFee:399, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:120, minSalary:40000, type:"premium", notes:"Premium bundle"},

  // FNB - multiple
  {bank:"FNB", account:"Easy PAYT", monthlyFee:7.50, debitOrderFee:2.5, cardFee:1.3, atmFee:12, eftFee:9, cashDepositFee:12, includedTransactions:0, minSalary:0, type:"traditional", notes:"Pay-as-you-transact (PAYT)"},
  {bank:"FNB", account:"Easy Bundled", monthlyFee:73.50, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:30, minSalary:0, type:"bundled", notes:"Bundle with free transactions"},
  {bank:"FNB", account:"Premier", monthlyFee:265, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:100, minSalary:25000, type:"premium", notes:"Premier package"},

  // Nedbank - multiple
  {bank:"Nedbank", account:"MiGoals PAYT", monthlyFee:0, debitOrderFee:2.5, cardFee:1.2, atmFee:12, eftFee:8, cashDepositFee:12, includedTransactions:0, minSalary:0, type:"traditional", notes:"PAYT MiGoals"},
  {bank:"Nedbank", account:"MiGoals Plus", monthlyFee:105, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:30, minSalary:0, type:"bundled", notes:"Bundled MiGoals Plus"},
  {bank:"Nedbank", account:"Private One", monthlyFee:675, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:150, minSalary:80000, type:"premium", notes:"Private banking"},

  // Standard Bank - multiple
  {bank:"Standard Bank", account:"MyMo", monthlyFee:0, debitOrderFee:2.5, cardFee:1.0, atmFee:10, eftFee:7, cashDepositFee:15, includedTransactions:0, minSalary:0, type:"traditional", notes:"Entry-level"},
  {bank:"Standard Bank", account:"MyMo Plus", monthlyFee:125, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:35, minSalary:0, type:"bundled", notes:"Bundled MyMo Plus"},
  {bank:"Standard Bank", account:"Prestige Plus", monthlyFee:385, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:120, minSalary:35000, type:"premium", notes:"Prestige package"},

  // African Bank
  {bank:"African Bank", account:"MyWORLD", monthlyFee:75, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:25, minSalary:0, type:"bundled", notes:"Bundle with pockets"},

  // Discovery
  {bank:"Discovery Bank", account:"Gold PAYT", monthlyFee:32.50, debitOrderFee:0.5, cardFee:0.9, atmFee:10, eftFee:7, cashDepositFee:10, includedTransactions:0, minSalary:0, type:"traditional", notes:"Pay-as-you-transact with Vitality rewards"},
  {bank:"Discovery Bank", account:"Gold Suite", monthlyFee:234, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:60, minSalary:0, type:"bundled", notes:"Bundled Gold Suite"},

  // Investec / Private banks
  {bank:"Investec", account:"Private Bank", monthlyFee:675, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:200, minSalary:80000, type:"premium", notes:"Private banking"},

  // Student accounts (examples)
  {bank:"FNB", account:"Student Account", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"student", notes:"Zero fees for students"},
  {bank:"Standard Bank", account:"Student Achiever", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"student", notes:"Student account - zero fee"},
  {bank:"Absa", account:"Student Silver", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:0, eftFee:0, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"student", notes:"Student - zero monthly fee"},

  // Spot / other digital
  {bank:"Spot Money", account:"Digital", monthlyFee:0, debitOrderFee:0, cardFee:0, atmFee:5, eftFee:5, cashDepositFee:0, includedTransactions:0, minSalary:0, type:"digital", notes:"Digital payments"},

  // A few extra common accounts
  {bank:"Capitec", account:"Student Global One", monthlyFee:7.50, debitOrderFee:0.5, cardFee:0.9, atmFee:9.50, eftFee:6.50, cashDepositFee:10, includedTransactions:5, minSalary:0, type:"student", notes:"Student Global One"}
];

// Preset C - Heavy user (from your choice)
const heavyPreset = {
  debitOrders: 8,
  cardSwipes: 40,
  atmWithdrawals: 4,
  efts: 8,
  cashDeposits: 1
};

function calculateTotal(account, usage) {
  // usage: {debitOrders, cardSwipes, atmWithdrawals, efts, cashDeposits}
  let total = account.monthlyFee || 0;

  // Debit orders
  if (account.debitOrderFee && usage.debitOrders > 0) {
    total += (account.debitOrderFee * usage.debitOrders);
  }

  // Card swipes - assume cardFee applies per swipe if >0
  if (account.cardFee && usage.cardSwipes > 0) {
    total += account.cardFee * usage.cardSwipes;
  }

  // ATM withdrawals - fee per withdrawal
  if (account.atmFee && usage.atmWithdrawals > 0) {
    total += account.atmFee * usage.atmWithdrawals;
  }

  // EFTs
  if (account.eftFee && usage.efts > 0) {
    total += account.eftFee * usage.efts;
  }

  // Cash deposits
  if (account.cashDepositFee && usage.cashDeposits > 0) {
    total += account.cashDepositFee * usage.cashDeposits;
  }

  // If includedTransactions applies, reduce cost for some transactions by assuming card swipes covered first
  const included = account.includedTransactions || 0;
  if (included > 0 && usage.cardSwipes > 0) {
    // reduce cardSwipe charges by included up to included
    const covered = Math.min(included, usage.cardSwipes);
    total -= covered * account.cardFee;
    // included reduces the number of charged swipes
  }

  return total;
}

function formatCurrency(v){ return "R " + v.toFixed(2); }

function renderTable(accounts, usage, salary) {
  const results = document.getElementById('results');
  if (!accounts || accounts.length === 0) {
    results.innerHTML = '<div class="card"><p class="small">No accounts available.</p></div>';
    return;
  }

  const withCost = accounts.map(a => ({...a, total: calculateTotal(a, usage)}));
  withCost.sort((x,y) => x.total - y.total);

  let html = '<div class="card"><h3>Matching accounts (sorted by estimated total monthly cost)</h3>';
  html += '<table class="table"><thead><tr><th>Bank</th><th>Account</th><th>Monthly Fee</th><th>Estimated Total</th><th>Notes</th><th></th></tr></thead><tbody>';

  withCost.forEach(a => {
    html += `<tr>
      <td><strong>${a.bank}</strong></td>
      <td>${a.account}</td>
      <td>${a.monthlyFee === 0 ? 'FREE' : formatCurrency(a.monthlyFee)}</td>
      <td><strong>${formatCurrency(a.total)}</strong></td>
      <td>${a.notes || ''}</td>
      <td><a class="apply-btn" href="${a.url || '#'}" target="_blank">Verify & Apply</a></td>
    </tr>`;
  });

  html += '</tbody></table></div>';
  results.innerHTML = html;

  document.getElementById('status').textContent = `Showing ${withCost.length} accounts • Estimates use heavy-user preset (you can change inputs).`;
}

// Hook up UI
document.getElementById('btnCompare').addEventListener('click', () => {
  const salary = Number(document.getElementById('salary').value) || 0;
  const usage = {
    debitOrders: Number(document.getElementById('debitOrders').value) || heavyPreset.debitOrders,
    cardSwipes: Number(document.getElementById('cardSwipes').value) || heavyPreset.cardSwipes,
    atmWithdrawals: Number(document.getElementById('atmWithdrawals').value) || heavyPreset.atmWithdrawals,
    efts: Number(document.getElementById('efts').value) || heavyPreset.efts,
    cashDeposits: Number(document.getElementById('cashDeposits').value) || heavyPreset.cashDeposits
  };

  renderTable(ACCOUNTS, usage, salary);
});

document.getElementById('btnReset').addEventListener('click', () => {
  document.getElementById('salary').value = 18000;
  document.getElementById('debitOrders').value = heavyPreset.debitOrders;
  document.getElementById('cardSwipes').value = heavyPreset.cardSwipes;
  document.getElementById('atmWithdrawals').value = heavyPreset.atmWithdrawals;
  document.getElementById('efts').value = heavyPreset.efts;
  document.getElementById('cashDeposits').value = heavyPreset.cashDeposits;
  document.getElementById('btnCompare').click();
});

// Auto-run on load
window.addEventListener('load', () => {
  document.getElementById('btnCompare').click();
});
