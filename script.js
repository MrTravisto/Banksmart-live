console.log('BankSmart loaded');

let ACCOUNTS = [];

fetch('fees.json')
  .then(r => r.json())
  .then(data => ACCOUNTS = data)
  .catch(() => {
    document.getElementById('results').innerHTML = '<p>Failed to load fee data.</p>';
  });

function showResults(salary, feeCap) {
  const results = document.getElementById('results');
  const status = document.getElementById('status');

  let matches = ACCOUNTS.filter(a =>
    (a.minSalary || 0) <= salary &&
    a.fee <= feeCap
  );

  status.textContent = `Found ${matches.length} matching account(s)`;

  if (!matches.length) {
    results.innerHTML = '<p>No matches found.</p>';
    return;
  }

  matches.sort((a,b) => a.fee - b.fee);

  results.innerHTML = matches.map((a,i) => `
    <div class="card ${i===0?'best':''}">
      <h3>${i===0?'⭐ Best Match: ':''}${a.bank} — ${a.account}</h3>
      <p><strong>Monthly Fee:</strong> R${a.fee}</p>
      <p>${a.notes}</p>
      <a href="${a.url}" target="_blank">Apply Now →</a>
    </div>
  `).join('');
}

document.getElementById('btnCompare').addEventListener('click', () => {
  const salary = Number(document.getElementById('salary').value) || 0;
  const feeCapInput = document.getElementById('feeCap').value;
  const feeCap = feeCapInput === "" ? Infinity : Number(feeCapInput);
  showResults(salary, feeCap);
});
