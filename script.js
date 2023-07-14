// Get references to HTML elements
const entryForm = document.getElementById('entryForm');
const entryTable = document.getElementById('entryTable').getElementsByTagName('tbody')[0];
const dropdownBtn = document.getElementById('dropdownBtn');
const totalBtn = document.getElementById('totalBtn');

// Handle dropdown button click
dropdownBtn.addEventListener('click', function() {
  entryForm.style.display = entryForm.style.display === 'none' ? 'inline' : 'none';
});

// Handle form submission
entryForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const weight = parseFloat(document.getElementById('weight').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const product = document.getElementById('product').value;
  const customer = document.getElementById('customer').value;

  // Calculate amount
  const amount = isNaN(weight) || isNaN(rate) ? '' : (weight * rate).toFixed(2);

  // Create table row and cells
  const newRow = document.createElement('tr');
  const cells = [
    document.createElement('td'),
    document.createElement('td'),
    document.createElement('td'),
    document.createElement('td'),
    document.createElement('td'),
    document.createElement('td')
  ];

  // Set cell values
  cells[0].textContent = isNaN(weight) ? '' : weight;
  cells[1].textContent = isNaN(rate) ? '' : rate;
  cells[2].textContent = product;
  cells[3].textContent = amount;
  cells[4].textContent = customer;
  cells[5].innerHTML = '<button class="delete-btn">Delete</button>';

  // Append cells to the row
  cells.forEach(cell => {
    newRow.appendChild(cell);
  });

  // Append row to the table
  entryTable.appendChild(newRow);

  // Clear form inputs
  entryForm.reset();

  // Hide the form after submission
  entryForm.style.display = 'none';
});

// Handle delete button clicks
entryTable.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const row = event.target.parentNode.parentNode;
    row.remove();
  }
});

// Handle total button click
totalBtn.addEventListener('click', function() {
  const amounts = Array.from(entryTable.getElementsByClassName('amount'));
  const totalAmount = amounts.reduce((total, amountCell) => {
    const amount = parseFloat(amountCell.textContent);
    return isNaN(amount) ? total : total + amount;
  }, 0);
  alert('Total Amount: ' + totalAmount.toFixed(2));
});
