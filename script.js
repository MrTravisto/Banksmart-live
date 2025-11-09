document.getElementById('compareBtn').addEventListener('click', function() {
  const salary = parseFloat(document.getElementById('salary').value);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  
  if (isNaN(salary) || salary <= 0) {
    resultsDiv.innerHTML = '<p>Please enter a valid salary amount.</p>';
    return;
  }

  const banks = [
    { name: 'Capitec Global One', fee: 6.50, interest: 0.03 },
    { name: 'FNB Easy Account', fee: 8.00, interest: 0.025 },
    { name: 'Standard Bank MyMo', fee: 10.00, interest: 0.022 },
    { name: 'ABSA Transact', fee: 5.75, interest: 0.02 },
    { name: 'Nedbank MiGoals', fee: 7.50, interest: 0.021 }
  ];

  banks.forEach(b => {
    b.value = (salary * b.interest / 12) - b.fee;
  });

  banks.sort((a, b) => b.value - a.value);

  banks.forEach((bank, index) => {
    const div = document.createElement('div');
    div.classList.add('result-card');
    if (index === 0) div.classList.add('best');
    div.innerHTML = `<strong>${bank.name}</strong><br>
      Monthly Fee: R${bank.fee.toFixed(2)}<br>
      Interest: ${(bank.interest * 100).toFixed(1)}%<br>
      Net Value: R${bank.value.toFixed(2)} per month`;
    resultsDiv.appendChild(div);
  });
});
