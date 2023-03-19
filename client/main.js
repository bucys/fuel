// import  './script.js';
import './style.css'


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World</h1>

    <form>
		<label for="date">Date:</label>
		<input type="date" id="date" name="date"><br><br>
		
		<label for="liters">Amount in Liters:</label>
		<input type="number" id="liters" name="liters"><br><br>
		
		<label for="kr">Amount in Kr:</label>
		<input type="number" id="kr" name="kr"><br><br>
		
		<input type="submit" value="Submit">
	</form>
  <br>
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Amount Liters</th>
				<th>Amount Kr</th>
        <th>Total Amount</th>
        <th>Delete</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</body>
</html>

  </div>
`
const form = document.querySelector('form');
const table = document.querySelector('table tbody');

// Load saved data from local storage
const savedData = JSON.parse(localStorage.getItem('tableData')) || [];
for (const data of savedData) {
  const newRow = createTableRow(data.date, data.liters, data.kr, data.total);
  table.appendChild(newRow);
}

table.addEventListener('click', function(event) {
  const target = event.target;
  const row = target.closest('tr');

  if (target.classList.contains('edit')) {
    editRow(row);
  } else if (target.classList.contains('delete')) {
    deleteRow(row);
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Retrieve the input values
  const date = form.elements.date.value;
  const liters = form.elements.liters.value;
  const kr = form.elements.kr.value;
  const total = kr - liters * 6;

  // Check if the input date already exists in the table
  if (table.querySelector(`tr td:first-child[title="${date}"]`)) {
    alert('This date already exists in the table.');
    return;
  }

  // Create a new table row with the input values
  const newRow = createTableRow(date, liters, kr, total);

  // Append the new row to the table
  table.appendChild(newRow);

  // Save the updated table data in local storage
  const tableData = getTableData();
  localStorage.setItem('tableData', JSON.stringify(tableData));

  // Clear the form inputs
  form.reset();
});

function createTableRow(date, liters, kr, total) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td title="${date}">${date}</td>
    <td>${liters}</td>
    <td>${kr}</td>
    <td>${total}</td>
    <td><button class="delete">Delete</button></td>
  `;
  return newRow;
}

function getTableData() {
  const data = [];
  const rows = table.querySelectorAll('tr');
  for (const row of rows) {
    const [date, liters, kr, total] = row.querySelectorAll('td');
    data.push({ date: date.title, liters: liters.textContent, kr: kr.textContent, total: total.textContent });
  }
  return data;
}


function deleteRow(row) {
row.remove();

// Save the updated table data in local storage
const tableData = getTableData();
localStorage.setItem('tableData', JSON.stringify(tableData));
}




