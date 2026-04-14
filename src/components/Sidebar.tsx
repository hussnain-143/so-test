import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, FileText, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, title: 'Dashboard', subtitle: 'View insights' },
  { path: '/users', icon: Users, title: 'User Management', subtitle: 'Manage all users' },
  { path: '/bookings', icon: Calendar, title: 'Booking Management', subtitle: 'Monitor all bookings' },
  { path: '/audit', icon: FileText, title: 'Audit Trail', subtitle: 'Manage all logs' },
  { path: '/settings', icon: Settings, title: 'Settings', subtitle: 'Manage system settings' }
];

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Solo" style={{ height: 40, width: 'auto' }} />
      </div>
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" />
            <div className="nav-text">
              <span className="nav-title">{item.title}</span>
              <span className="nav-subtitle">{item.subtitle}</span>
            </div>
          </NavLink>
        ))}
        
        <NavLink
          to="/login"
          className="nav-item"
          style={{ marginTop: 'auto', marginBottom: 0 }}
        >
          <LogOut className="nav-icon" />
          <div className="nav-text">
            <span className="nav-title">Logout</span>
            <span className="nav-subtitle">Exit application</span>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
