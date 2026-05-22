import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/components/layout.scss';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="dashboard-layout">
      <Header toggleUserMenu={toggleUserMenu} isUserMenuOpen={isUserMenuOpen} />

      <div className="dashboard-body">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
