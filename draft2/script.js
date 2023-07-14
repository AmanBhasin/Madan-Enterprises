// Get references to HTML elements
const entryForm = document.getElementById('entryForm');
const entryTable = document.getElementById('entryTable').getElementsByTagName('tbody')[0];
const dropdownBtn = document.getElementById('dropdownBtn');
const totalBtn = document.getElementById('totalBtn');
const dashboardBtn = document.getElementById('dashboardBtn');

// Handle dropdown button click
dropdownBtn.addEventListener('click', function() {
  entryForm.style.display = entryForm.style.display === 'none' ? 'block' : 'none';
});

// Handle form submission
entryForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const weight = parseFloat(document.getElementById('weight').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const product = document.getElementById('product').value;
  const customer = document.getElementById('customer').value;
  const amountPaid = parseFloat(document.getElementById('amountPaid').value);

  // Calculate amount due
  const amountDue = isNaN(weight) || isNaN(rate) ? '' : (weight * rate - amountPaid).toFixed(2);

  // Create table row and cells
  const newRow = document.createElement('tr');
  const cells = [
    document.createElement('td'),
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
  cells[3].textContent = amountDue;
  cells[4].textContent = amountPaid;
  cells[5].textContent = customer;
  cells[6].innerHTML = '<button class="delete-btn">Delete</button>';

  // Add light-green class if amountDue is zero
  if (amountDue === '0.00') {
    newRow.classList.add('light-green');
  }

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
  const amountsDue = Array.from(entryTable.getElementsByClassName('amount-due'));
  const totalAmountDue = amountsDue.reduce((total, amountDueCell) => {
    const amountDue = parseFloat(amountDueCell.textContent);
    return isNaN(amountDue) ? total : total + amountDue;
  }, 0);

  alert('Total Amount Due: ' + totalAmountDue.toFixed(2));
});
