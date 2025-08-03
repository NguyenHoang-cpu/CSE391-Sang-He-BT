let currentPage = 1;
const rowsPerPage = 5;

function renderTable() {
  const tbody = document.getElementById('employeeTable');
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedItems = employees.slice(start, end);

  paginatedItems.forEach((emp, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="row-check"></td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.address}</td>
      <td>${emp.phone}</td>
      <td class="actions">
        <i class="fas fa-edit edit-icon"></i>
        <i class="fas fa-trash delete-icon" onclick="deleteEmployee(${start + index})"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  renderPagination();
  updateEntryInfo();
}

function renderPagination() {
  const pageSpan = document.getElementById('pageNumbers');
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  pageSpan.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pageSpan.appendChild(btn);
  }
}

function updateEntryInfo() {
  document.getElementById('entryInfo').textContent =
    `Showing ${Math.min(currentPage * rowsPerPage, employees.length)} out of ${employees.length} entries`;
}

function nextPage() {
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function openForm() {
  document.getElementById('employeeModal').style.display = 'flex';
  document.getElementById('employeeForm').reset();
  document.getElementById('errorMsg').innerText = "";
}

function closeForm() {
  document.getElementById('employeeModal').style.display = 'none';
}

function validateInput(name, email, address, phone) {
  if (!name || !email || !address || !phone) {
    return "All fields are required.";
  }
  if (!/^0\\d{9}$/.test(phone)) {
    return "Phone must start with 0 and be exactly 10 digits.";
  }
  return "";
}

function addEmployee(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const error = validateInput(name, email, address, phone);
  if (error) {
    document.getElementById('errorMsg').innerText = error;
    return;
  }

  employees.push({ name, email, address, phone });
  closeForm();
  renderTable();
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderTable();
  }
}

function toggleAll(source) {
  const checkboxes = document.querySelectorAll('.row-check');
  checkboxes.forEach(cb => cb.checked = source.checked);
}

function deleteSelected() {
  const checkboxes = Array.from(document.querySelectorAll('.row-check'));
  const indexesToDelete = [];

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      indexesToDelete.push((currentPage - 1) * rowsPerPage + i);
    }
  });

  if (indexesToDelete.length === 0) return;

  if (confirm(`Delete ${indexesToDelete.length} selected employee(s)?`)) {
    indexesToDelete.sort((a, b) => b - a);
    indexesToDelete.forEach(i => employees.splice(i, 1));
    renderTable();
  }
}

function searchEmployee() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = employees.filter(emp =>
    emp.name.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query) ||
    emp.address.toLowerCase().includes(query) ||
    emp.phone.includes(query)
  );
  renderSearchResults(results);
}

function renderSearchResults(filteredList) {
  const tbody = document.getElementById('employeeTable');
  tbody.innerHTML = "";

  filteredList.forEach((emp, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="row-check"></td>
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.address}</td>
      <td>${emp.phone}</td>
      <td class="actions">
        <i class="fas fa-edit edit-icon"></i>
        <i class="fas fa-trash delete-icon" onclick="deleteEmployee(${index})"></i>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('entryInfo').textContent = `Showing ${filteredList.length} result(s)`;
  document.getElementById('pageNumbers').innerHTML = "";
}

window.onload = renderTable;
