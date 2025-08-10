import React, { useState, useEffect } from 'react';
import '../styles/StudentFormModal.css';

const StudentFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    maSinhVien: '',
    ngaySinh: '',
    khoa: '',
  });
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        hoTen: student.hoTen,
        email: student.email,
        soDienThoai: student.soDienThoai,
        maSinhVien: student.maSinhVien,
        ngaySinh: student.ngaySinh,
        khoa: student.khoa,
      });
      setEmailError(''); // Reset lỗi khi mở modal sửa
    } else {
      setFormData({
        hoTen: '',
        email: '',
        soDienThoai: '',
        maSinhVien: '',
        ngaySinh: '',
        khoa: '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailError(''); // Xóa lỗi khi người dùng bắt đầu nhập
    }
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email phải chứa ký tự "@".';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErrorMessage = validateEmail(formData.email);
    setEmailError(emailErrorMessage);

    if (emailErrorMessage) {
      return;
    }

    if (!formData.hoTen.trim() || !formData.email.trim() || !formData.maSinhVien.trim()) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên, Email, Mã sinh viên).');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{student ? 'Sửa Thông Tin Sinh Viên' : 'Thêm Sinh Viên Mới'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="hoTen">Họ Tên</label>
            <input
              type="text"
              id="hoTen"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="soDienThoai">Số Điện Thoại</label>
            <input
              type="tel"
              id="soDienThoai"
              name="soDienThoai"
              value={formData.soDienThoai}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maSinhVien">Mã Sinh Viên</label>
            <input
              type="text"
              id="maSinhVien"
              name="maSinhVien"
              value={formData.maSinhVien}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ngaySinh">Ngày Sinh</label>
            <input
              type="date"
              id="ngaySinh"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="khoa">Khoa</label>
            <input
              type="text"
              id="khoa"
              name="khoa"
              value={formData.khoa}
              onChange={handleChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">Lưu</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;