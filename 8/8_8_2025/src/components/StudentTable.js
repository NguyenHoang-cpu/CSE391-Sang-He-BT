import React, { useState, useEffect } from 'react';
import StudentFormModal from './StudentFormModal';
import '../styles/StudentTable.css';

const getInitialData = () => {
  const savedStudents = localStorage.getItem('students');
  if (savedStudents) {
    return JSON.parse(savedStudents);
  } else {
    return [
      {
        id: 1,
        hoTen: 'Michael Holz',
        email: 'michael.holz@example.com',
        soDienThoai: '0123456789',
        maSinhVien: 'MH001',
        ngaySinh: '04/10/2000',
        khoa: 'Công nghệ thông tin',
        dateCreated: '04/10/2013',
      },
      {
        id: 2,
        hoTen: 'Paula Wilson',
        email: 'paula.wilson@example.com',
        soDienThoai: '0987654321',
        maSinhVien: 'PW002',
        ngaySinh: '05/08/2001',
        khoa: 'Kinh tế',
        dateCreated: '05/08/2014',
      },
      {
        id: 3,
        hoTen: 'Antonio Moreno',
        email: 'antonio.moreno@example.com',
        soDienThoai: '0333222111',
        maSinhVien: 'AM003',
        ngaySinh: '11/05/1999',
        khoa: 'Ngôn ngữ Anh',
        dateCreated: '11/05/2015',
      },
      {
        id: 4,
        hoTen: 'Nguyễn Thái Dương',
        email: 'duong.nguyen@example.com',
        soDienThoai: '0777888999',
        maSinhVien: 'NTD004',
        ngaySinh: '13/06/2002',
        khoa: 'Điện tử viễn thông',
        dateCreated: '13/06/2025',
      },
    ];
  }
};

const StudentTable = () => {
  const [students, setStudents] = useState(getInitialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handleSaveStudent = (studentData) => {
    if (currentStudent) {
      setStudents(students.map(student =>
        student.id === currentStudent.id ? { ...student, ...studentData } : student
      ));
    } else {
      const newStudent = {
        ...studentData,
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        dateCreated: new Date().toLocaleDateString('vi-VN'),
      };
      setStudents([...students, newStudent]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="student-management-container">
      <div className="table-actions">
        <button onClick={handleAddStudent} className="add-btn">
          + Thêm Sinh Viên
        </button>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Điện Thoại</th>
            <th>Mã Sinh Viên</th>
            <th>Ngày Sinh</th>
            <th>Khoa</th>
            <th>Ngày Tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.hoTen}</td>
              <td>{student.email}</td>
              <td>{student.soDienThoai}</td>
              <td>{student.maSinhVien}</td>
              <td>{student.ngaySinh}</td>
              <td>{student.khoa}</td>
              <td>{student.dateCreated}</td>
              <td className="action-cell">
                <button className="action-btn edit" onClick={() => handleEditStudent(student)}>Sửa</button>
                <button className="action-btn delete" onClick={() => handleDeleteStudent(student.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <StudentFormModal
          student={currentStudent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStudent}
        />
      )}
    </div>
  );
};

export default StudentTable;