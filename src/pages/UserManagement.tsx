import React, { useState } from 'react';
import { Search, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserManagement.css';

const initialUsers = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah.mitchell@email.com', phone: '+353 01 12345678', role: 'Professional', status: 'Active', joined: '1/15/2025', bookings: 12, avatar: 'https://i.pravatar.cc/150?u=sarah', verified: true },
  { id: 2, name: 'John Anderson', email: 'john.anderson@email.com', phone: '+353 01 12345678', role: 'Customer', status: 'Active', joined: '1/15/2025', bookings: 45, avatar: 'https://i.pravatar.cc/150?u=john', verified: true },
  { id: 3, name: 'Emma Wilson', email: 'emma.wilson@email.com', phone: '+353 01 12345678', role: 'Professional', status: 'Pending Verification', joined: '1/15/2025', bookings: 12, avatar: 'https://i.pravatar.cc/150?u=emma', verified: true },
  { id: 4, name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+353 01 12345678', role: 'Customer', status: 'Active', joined: '1/15/2025', bookings: 28, avatar: 'https://i.pravatar.cc/150?u=michael', verified: true },
  { id: 5, name: 'Lisa Rodriguez', email: 'lisa.rodriguez@email.com', phone: '+353 01 12345678', role: 'Professional', status: 'Inactive', joined: '1/15/2025', bookings: 67, avatar: 'https://i.pravatar.cc/150?u=lisa', verified: true },
  { id: 6, name: 'David Smith', email: 'david.smith@email.com', phone: '+353 01 87654321', role: 'Customer', status: 'Active', joined: '2/10/2025', bookings: 5, avatar: 'https://i.pravatar.cc/150?u=david', verified: false },
  { id: 7, name: 'Sophie Taylor', email: 'sophie.taylor@email.com', phone: '+353 01 55566677', role: 'Professional', status: 'Pending Verification', joined: '3/01/2025', bookings: 0, avatar: 'https://i.pravatar.cc/150?u=sophie', verified: false },
];

const UserManagement: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewAll = () => {
    console.log('Resetting all filters');
    setStatusFilter('All');
    setTypeFilter('All');
    setSearchQuery('');
  };

  const filteredUsers = initialUsers.filter(user => {
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    const matchesType = typeFilter === 'All' || 
                       (typeFilter === 'Customers' && user.role === 'Customer') ||
                       (typeFilter === 'Professionals' && user.role === 'Professional');
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.phone.includes(searchQuery);
    
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <div className="filters-row">
          <select 
            className="form-input" 
            style={{width: 180}}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending Verification">Pending Verification</option>
          </select>
          <select 
            className="form-input" 
            style={{width: 160}}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Users</option>
            <option value="Customers">Customers</option>
            <option value="Professionals">Professionals</option>
          </select>
          <div className="search-input-container">
            <input 
              type="text" 
              placeholder="Search by name, email, or phone" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="text-muted" />
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '8px'}}>7</div>
          <div className="text-muted" style={{fontSize: '0.9rem'}}>Total Users</div>
        </div>
        <div className="summary-card">
          <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '8px'}}>4</div>
          <div className="text-muted" style={{fontSize: '0.9rem'}}>Customers</div>
        </div>
        <div className="summary-card">
          <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '8px'}}>3</div>
          <div className="text-muted" style={{fontSize: '0.9rem'}}>Professionals</div>
        </div>
      </div>

      <div className="flex justify-between items-center" style={{marginBottom: 20}}>
        <div style={{fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500}}>
          Showing {filteredUsers.length} of {initialUsers.length} total members
        </div>
        <button 
          type="button"
          className="btn btn-outline"
          onClick={handleViewAll}
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          View All Members
        </button>
      </div>

      <div className="user-grid">
        {filteredUsers.map(user => (
          <Link to={user.role === 'Customer' ? `/customers/${user.id}` : `/users/${user.id}`} key={user.id} className="user-card">
            <div className="user-status">
              <span className={`badge ${user.status.toLowerCase().replace(' ', '-')}`}>{user.status}</span>
              {user.status === 'Pending Verification' && <span className="badge active">Active</span>}
            </div>
            <div className="user-card-header">
              <img src={user.avatar} className="user-avatar" alt={user.name} />
              <div className="user-info">
                <div className="user-name">
                  {user.name} 
                  {user.verified && <CheckCircle2 className="verified-icon" />}
                </div>
                <div className="user-email">{user.email}</div>
                <div className="user-phone" style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2}}>{user.phone}</div>
                <div className={`user-role role-${user.role.toLowerCase()}`} style={{marginTop: 8}}>{user.role}</div>
              </div>
            </div>
            <div className="user-card-footer">
              <div className="footer-item">
                <Calendar size={16} /> Joined {user.joined}
              </div>
              {user.role !== 'Customer' && (
                <div className="footer-item">
                  <Briefcase size={16} /> {user.bookings} bookings
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div style={{height: 40}}></div>
    </div>
  );
};

export default UserManagement;
