// Loads fees.json and renders comparison table (no 'best match' - sorted list)
async function loadFees(){
  try {
    const res = await fetch('fees.json',{cache:'no-cache'});
    if(!res.ok) throw new Error('Failed to load fees.json');
    const data = await res.json();
    return data;
  } catch(e){
    console.error(e);
    return [];
  }
}

function calculateTotalCost(acc, monthlyTransactions){
  let total = Number(acc.fee || 0);
  const included = Number(acc.includedTransactions || 0);
  const txCost = Number(acc.transactionCost || 0);
  if(txCost > 0 && monthlyTransactions > included){
    total += (monthlyTransactions - included) * txCost;
  }
  return total;
}

function renderTable(accounts, salary, monthlyTransactions){
  const results = document.getElementById('results');
  if(!accounts || accounts.length === 0){
    results.innerHTML = '<div class="card"><p style="padding:16px;color:var(--muted)">No account data available.</p></div>';
    return;
  }

  // Filters
  const showDigital = document.getElementById('filterDigital').checked;
  const showTraditional = document.getElementById('filterTraditional').checked;
  const showPremium = document.getElementById('filterPremium').checked;

  let matches = accounts.filter(a => (a.minSalary || 0) <= salary)
                        .filter(a => {
                          if(a.type === 'digital' && !showDigital) return false;
                          if(a.type === 'traditional' && !showTraditional) return false;
                          if(a.type === 'premium' && !showPremium) return false;
                          return true;
                        });

  if(matches.length === 0){
    results.innerHTML = '<div class="card"><p style="padding:16px;color:var(--muted)">No accounts match your filters.</p></div>';
    return;
  }

  // Compute total cost
  matches = matches.map(acc => {
    acc.totalCost = calculateTotalCost(acc, monthlyTransactions);
    return acc;
  });

  // Sort by totalCost then fee
  matches.sort((a,b) => (a.totalCost - b.totalCost) || (a.fee - b.fee));

  // Build table
  let html = '<div class="card"><table class="table"><thead><tr><th>Bank</th><th>Account</th><th>Monthly fee</th><th>Total cost</th><th>Notes</th><th></th></tr></thead><tbody>';
  matches.forEach(acc => {
    html += `<tr>
      <td>${acc.bank}</td>
      <td>${acc.account}</td>
      <td>${acc.fee === 0 ? 'FREE' : 'R ' + Number(acc.fee).toFixed(2)}</td>
      <td>R ${Number(acc.totalCost).toFixed(2)}</td>
      <td>${acc.notes || ''}</td>
      <td><a class="apply" href="${acc.url || '#'}" target="_blank" rel="noopener noreferrer">Verify & Apply →</a></td>
    </tr>`;
  });
  html += '</tbody></table></div>';
  results.innerHTML = html;

  const status = document.getElementById('status');
  status.textContent = `Showing ${matches.length} account(s) — sorted by lowest total monthly cost. Fees loaded from fees.json`;
}

document.getElementById('btnCompare').addEventListener('click', async () => {
  const salary = Number(document.getElementById('salary').value) || 0;
  const monthlyTransactions = Number(document.getElementById('transactions').value) || 15;
  if(!salary || salary <= 0){ alert('Please enter a valid monthly salary (R)'); return; }
  const accounts = await loadFees();
  renderTable(accounts, salary, monthlyTransactions);
});

document.getElementById('btnReset').addEventListener('click', () => {
  document.getElementById('salary').value = '18000';
  document.getElementById('transactions').value = '15';
  document.getElementById('filterDigital').checked = true;
  document.getElementById('filterTraditional').checked = true;
  document.getElementById('filterPremium').checked = true;
  document.getElementById('btnCompare').click();
});

// Auto-run on load
window.addEventListener('DOMContentLoaded', async () => {
  const accounts = await loadFees();
  document.getElementById('status').textContent = `Loaded ${accounts.length} accounts from fees.json`;
  // initial render
  renderTable(accounts, Number(document.getElementById('salary').value || 18000), Number(document.getElementById('transactions').value || 15));
});
