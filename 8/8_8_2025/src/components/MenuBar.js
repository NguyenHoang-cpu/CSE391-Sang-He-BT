import React from 'react';

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <h1>Quản lý sinh viên</h1>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm theo tên..." />
      </div>
    </div>
  );
};

export default MenuBar;