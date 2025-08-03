document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('employee-table-body');
    const modal = document.getElementById('add-employee-modal');
    const addBtn = document.getElementById('add-employee-btn');
    const closeBtn = document.querySelector('.close-button');
    const cancelBtn = document.querySelector('.form-buttons .cancel');
    const form = document.getElementById('add-employee-form');
    const modalTitle = document.getElementById('modal-title');
    const submitBtn = document.getElementById('submit-button');

    // Hàm để hiển thị danh sách nhân viên
    function renderEmployees(data = employees) {
        tableBody.innerHTML = '';
        data.forEach(emp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox"></td>
                <td class="table-actions">
                    <button class="view-btn" data-stt="${emp.stt}">👁️</button>
                    <button class="edit-btn" data-stt="${emp.stt}">📝</button>
                    <button class="delete-btn" data-stt="${emp.stt}">❌</button>
                </td>
                <td>${emp.stt}</td>
                <td>${emp.ten}</td>
                <td>${emp.hoDem}</td>
                <td>${emp.diaChi}</td>
                <td>
                    <div class="active-status ${emp.hoatDong ? 'active' : 'inactive'}">
                        ${emp.hoatDong ? '✔️' : '❌'}
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Mở modal
    addBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Thêm Nhân viên';
        submitBtn.textContent = 'Thêm';
        form.reset();
        hideAllErrors();
        document.getElementById('stt').value = '';
        modal.style.display = 'block';
    });

    // Đóng modal
    function closeModal() {
        modal.style.display = 'none';
        form.reset();
        hideAllErrors();
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Hàm hiển thị lỗi
    function showError(field, message) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Hàm ẩn tất cả lỗi
    function hideAllErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Xác thực và gửi form (Thêm/Sửa)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        hideAllErrors();

        let isValid = true;
        const stt = document.getElementById('stt').value;
        const ten = document.getElementById('ten').value.trim();
        const hoDem = document.getElementById('hoDem').value.trim();
        const diaChi = document.getElementById('diaChi').value.trim();

        if (ten === '') {
            showError('ten', 'Tên không được bỏ trống.');
            isValid = false;
        } else if (ten.length > 15) {
            showError('ten', 'Tên không được quá 15 ký tự.');
            isValid = false;
        }

        if (hoDem === '') {
            showError('hoDem', 'Họ đệm không được bỏ trống.');
            isValid = false;
        } else if (hoDem.length > 20) {
            showError('hoDem', 'Họ đệm không được quá 20 ký tự.');
            isValid = false;
        }

        if (diaChi === '') {
            showError('diaChi', 'Địa chỉ không được bỏ trống.');
            isValid = false;
        } else if (diaChi.length > 50) {
            showError('diaChi', 'Địa chỉ không được quá 50 ký tự.');
            isValid = false;
        }

        if (isValid) {
            if (stt) {
                // Sửa nhân viên
                const index = employees.findIndex(emp => emp.stt == stt);
                if (index !== -1) {
                    employees[index].ten = ten;
                    employees[index].hoDem = hoDem;
                    employees[index].diaChi = diaChi;
                }
                alert('Cập nhật nhân viên thành công!');
            } else {
                // Thêm nhân viên mới
                const newEmployee = {
                    stt: employees.length > 0 ? employees[employees.length - 1].stt + 1 : 1,
                    ten: ten,
                    hoDem: hoDem,
                    diaChi: diaChi,
                    hoatDong: true
                };
                employees.push(newEmployee);
                alert('Thêm nhân viên thành công!');
            }
            renderEmployees();
            closeModal();
        }
    });

    // Xử lý các nút Sửa, Xóa và Xem chi tiết (icon con mắt)
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-btn')) {
            const stt = event.target.dataset.stt;
            const employeeToView = employees.find(emp => emp.stt == stt);
            if (employeeToView) {
                alert(`Thông tin chi tiết của nhân viên STT ${stt}: \n` +
                      `Tên: ${employeeToView.ten} \n` +
                      `Họ đệm: ${employeeToView.hoDem} \n` +
                      `Địa chỉ: ${employeeToView.diaChi} \n` +
                      `Trạng thái: ${employeeToView.hoatDong ? 'Đang hoạt động' : 'Không hoạt động'}`);
            }
        }
        
        if (event.target.classList.contains('edit-btn')) {
            const stt = event.target.dataset.stt;
            const employeeToEdit = employees.find(emp => emp.stt == stt);
            if (employeeToEdit) {
                document.getElementById('stt').value = employeeToEdit.stt;
                document.getElementById('ten').value = employeeToEdit.ten;
                document.getElementById('hoDem').value = employeeToEdit.hoDem;
                document.getElementById('diaChi').value = employeeToEdit.diaChi;
                modalTitle.textContent = 'Sửa Thông tin Nhân viên';
                submitBtn.textContent = 'Cập nhật';
                modal.style.display = 'block';
                hideAllErrors();
            }
        }

        if (event.target.classList.contains('delete-btn')) {
            const stt = event.target.dataset.stt;
            if (confirm(`Bạn có chắc chắn muốn xóa nhân viên STT ${stt} không?`)) {
                const index = employees.findIndex(emp => emp.stt == stt);
                if (index !== -1) {
                    employees.splice(index, 1);
                    renderEmployees();
                    alert('Xóa nhân viên thành công!');
                }
            }
        }
    });
    
    // Khởi tạo hiển thị
    renderEmployees();
});