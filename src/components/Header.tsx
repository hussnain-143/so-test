import React from 'react';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <header className="header">
      <div className="header-title">
        {isDashboard ? 'Admin Dashboard' : ''}
      </div>
      <div className="header-actions">
        <Bell className="header-bell" size={20} />
        <div className="header-profile">
          <img src="https://i.pravatar.cc/150?u=mary" alt="Admin" />
          <span>Hi Mary</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
