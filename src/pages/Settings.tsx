import React from 'react';
import { ArrowLeft, Shield, Clock, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <h1 className="page-title">System Settings</h1>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-outline" style={{padding: '10px 24px'}}>Reset</button>
          <button className="btn btn-primary" style={{padding: '10px 24px'}}>Save Changes</button>
        </div>
      </div>

      <div className="settings-grid-layout">
        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-icon-box" style={{background: '#f0fdf4'}}>
              <Shield size={22} />
            </div>
            <div className="settings-title-info">
              <h3>Commission & Fees</h3>
              <p>Configure platform revenue settings</p>
            </div>
          </div>

          <div className="settings-input-group">
            <label className="settings-label">Platform Commission (Professional side)</label>
            <input type="text" className="settings-input" defaultValue="10%" />
            <p className="settings-help">Current: 10% deducted from professional earnings</p>
          </div>

          <div className="toggle-row settings-input-group" style={{ opacity: 0.5, pointerEvents: 'none' }}>
            <div className="settings-label" style={{marginBottom: 0}}>Customer - Side Fee</div>
            <label className="switch">
              <input type="checkbox" disabled />
              <span className="slider"></span>
            </label>
          </div>
          <p className="text-muted text-xs" style={{marginTop: -16, marginBottom: 24, opacity: 0.5}}>Add an additional fee charged to customers</p>

          <div className="settings-input-group" style={{ opacity: 0.5 }}>
            <label className="settings-label">Payment Processing Fee (Stripe)</label>
            <input type="text" className="settings-input" defaultValue="2.9" disabled />
            <p className="settings-help">Fixed for standard accounts</p>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-icon-box" style={{background: '#fffbeb', color: '#ca8a04'}}>
              <Clock size={22} />
            </div>
            <div className="settings-title-info">
              <h3>Cancellation & Refund Policy</h3>
              <p>Set rules for booking cancellations</p>
            </div>
          </div>

          <div className="settings-input-group">
            <label className="settings-label">Fee Cancellation Window</label>
            <input type="text" className="settings-input" defaultValue="24 Hours" />
            <p className="settings-help">Threshold for no-fee cancellation</p>
          </div>

          <p className="text-muted text-sm mb-6">Policy for refunds requested within the cancellation window:</p>

          <div className="refund-options">
            <div className="option-card active">
              <div className="radio-circle"><div className="radio-inner"></div></div>
              <div className="option-info">
                <h4>Full Refund</h4>
                <p>100% refund of service amount</p>
              </div>
            </div>

            <div className="option-card disabled-option">
              <div className="radio-circle"><div className="radio-inner"></div></div>
              <div className="option-info">
                <h4>Partial Refund</h4>
                <p>50% refund within window</p>
              </div>
            </div>

            <div className="option-card disabled-option">
              <div className="radio-circle"><div className="radio-inner"></div></div>
              <div className="option-info">
                <h4>Custom / Manual Review</h4>
                <p>All refunds require admin approval</p>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-section-header">
            <div className="settings-icon-box" style={{background: '#f0f9ff', color: '#0369a1'}}>
              <Bell size={22} />
            </div>
            <div className="settings-title-info">
              <h3>Automated Notifications</h3>
              <p>Configure booking reminders</p>
            </div>
          </div>

          <div className="notification-flow">
            <div className="notif-item">
              <div className="notif-row">
                <div className="notif-text">
                  <div className="notif-title">Enable automated Reminders</div>
                  <div className="notif-desc">Send reminders to customers and professionals</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="notif-divider"></div>

            <div className="notif-item">
              <div className="notif-row">
                <div className="notif-text">
                  <div className="notif-title">24-Hour Reminder</div>
                  <div className="notif-desc">Send reminder 24 hours before service</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="notif-divider"></div>

            <div className="notif-item">
              <div className="notif-row">
                <div className="notif-text">
                  <div className="notif-title">1-Hour Reminder</div>
                  <div className="notif-desc">Send reminder 1 hour before service</div>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{height: 60}}></div>
    </div>
  );
};

export default Settings;
