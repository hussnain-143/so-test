import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, User, Briefcase, Wallet, RefreshCcw, Pause, Play, Ban, Edit2, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import './BookingDetail.css';

const BookingDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Financial State
  const [basePrice, setBasePrice] = useState(120);
  const [soloFeePercent, setSoloFeePercent] = useState(15);
  const stripeFee = 3.78; // Fixed for demo
  const [isEditingFees, setIsEditingFees] = useState(false);

  const soloFeeAmount = (basePrice * soloFeePercent) / 100;
  const netPayout = basePrice - soloFeeAmount - stripeFee;

  // Status State
  const [bookingStatus, setBookingStatus] = useState('Accepted');
  const [paymentStatus, setPaymentStatus] = useState('In Escrow');
  const [notes, setNotes] = useState('Customer prefers morning sessions.');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'warning' | 'danger'>('success');
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const openConfirmation = (title: string, desc: string, type: 'success' | 'warning' | 'danger', action: () => void) => {
    setModalTitle(title);
    setModalDescription(desc);
    setModalType(type);
    setPendingAction(() => action);
    setIsModalOpen(true);
  };

  const handleAction = (newPaymentStatus: string, title: string, desc: string, type: 'success' | 'warning' | 'danger') => {
    openConfirmation(title, desc, type, () => {
      setPaymentStatus(newPaymentStatus);
      setIsModalOpen(false);
    });
  };

  return (
    <div>
      <div className="detail-header">
        <div className="flex items-center gap-4">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
          </button>
          <span className="detail-title">Booking Detail</span>
        </div>
      </div>

      <div className="booking-detail-card">
        <div className="booking-header-row">
          <div>
            <div className="booking-id">#{id || 'BK1003'}</div>
            <div className="booking-service-title">Personal Training Session</div>
            <div className="booking-service-desc">High-intensity functional training</div>
          </div>
          <div className="flex gap-3">
            <span className={`booking-badge badge-${bookingStatus.toLowerCase().replace(' ', '-')}`}>{bookingStatus}</span>
            <span className={`payment-badge badge-${paymentStatus.toLowerCase().replace(' ', '-')}`}>
              <Wallet size={12} /> {paymentStatus}
            </span>
          </div>
        </div>

        <div className="booking-points-grid">
          <div className="point-item"><Calendar size={16} /> Date: <span>April 05</span></div>
          <div className="point-item"><Clock size={16} /> Time: <span>10:00 AM</span></div>
          <div className="point-item"><DollarSign size={16} /> Price: <span>€{basePrice.toFixed(2)}</span></div>
          <div className="point-item"><MapPin size={16} /> Location: <span>Customer Site</span></div>
        </div>

        <div className="divider-light" style={{ margin: '24px 0' }}></div>

        <div className="address-section">
          <div className="text-muted text-xs font-bold uppercase tracking-wider mb-2">Service Address</div>
          <div className="font-medium">123 Main St, Dublin, Ireland.</div>
        </div>
      </div>

      <div className="detail-two-col">
        <div className="detail-card main-col">
          <div className="card-title">Participants</div>
          <div className="participants-stack">
            <div className="person-row">
              <div className="person-avatar-box"><User size={20} /></div>
              <div className="person-info">
                <div className="text-muted text-xs font-bold">Customer</div>
                <div className="person-name">John Anderson</div>
                <div className="person-contact">john@email.com</div>
              </div>
            </div>
            <div className="notif-divider" style={{ margin: '16px 0' }}></div>
            <div className="person-row">
              <div className="person-avatar-box prof"><Briefcase size={20} /></div>
              <div className="person-info">
                <div className="text-muted text-xs font-bold">Professional</div>
                <div className="person-name">Sarah Mitchell</div>
                <div className="person-contact">sarah@email.com</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card side-col">
          <div className="flex justify-between items-center mb-5">
            <div className="card-title" style={{ marginBottom: 0 }}>Payment Breakdown</div>
            <button 
              className="text-primary flex items-center gap-1 text-xs font-bold"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsEditingFees(!isEditingFees)}
            >
              {isEditingFees ? <><Save size={14} /> Finish</> : <><Edit2 size={14} /> Edit Fees</>}
            </button>
          </div>
          
          <div className="payment-stack">
            <div className="payment-row">
              <span>Base Service Fee</span>
              {isEditingFees ? (
                <div className="edit-input-wrapper">
                  <span>€</span>
                  <input 
                    type="number" 
                    value={basePrice} 
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="small-edit-input"
                  />
                </div>
              ) : (
                <b>€{basePrice.toFixed(2)}</b>
              )}
            </div>
            <div className="payment-row highlight">
              <span>Solo Platform Fee ({soloFeePercent}%)</span>
              {isEditingFees ? (
                <div className="edit-input-wrapper">
                  <input 
                    type="number" 
                    value={soloFeePercent} 
                    onChange={(e) => setSoloFeePercent(Number(e.target.value))}
                    className="small-edit-input"
                  />
                  <span>%</span>
                </div>
              ) : (
                <span>-€{soloFeeAmount.toFixed(2)}</span>
              )}
            </div>
            <div className="payment-row highlight">
              <span>Payment Processing</span>
              <span>-€{stripeFee.toFixed(2)}</span>
            </div>
            <div className="notif-divider" style={{ margin: '12px 0 16px' }}></div>
            <div className="payment-row payout">
              <span>Professional Payout</span>
              <span className="payout-amount">€{netPayout.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-card full-width">
        <div className="card-title">Internal Admin Notes</div>
        <textarea 
          className="notes-textarea" 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" style={{ padding: '0 32px' }} onClick={() => openConfirmation('Save Notes', 'Administrative notes updated successfully.', 'success', () => setIsModalOpen(false))}>Save Notes</button>
        </div>
      </div>

      <div className="detail-card full-width admin-actions-section">
        <div className="management-section">
          <div>
            <span className="action-group-title">Booking Lifecycle Management</span>
            <div className="status-update-controls">
              <div className="dropdown-with-label">
                <label>Overall Status</label>
                <select className="form-input" value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)}>
                  <option>Requested</option>
                  <option>Accepted</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                  <option>Declined</option>
                  <option>In Dispute</option>
                  <option>No Show</option>
                </select>
              </div>
              <button className="btn btn-primary btn-lg" onClick={() => openConfirmation('Update Status', 'Record status updated.', 'success', () => setIsModalOpen(false))}>Update Status</button>
            </div>
          </div>

          <div className="divider-light" style={{ margin: '8px 0' }}></div>

          <div>
            <span className="action-group-title">Financial & Escrow Controls</span>
            <div className="payment-actions-grid">
              <button className="action-card-btn btn-refund" onClick={() => handleAction('Refunded', 'Initiate Refund', 'Processing customer refund...', 'danger')}>
                <RefreshCcw size={20} />
                <span>Initiate Refund</span>
              </button>
              <button className="action-card-btn btn-hold" onClick={() => handleAction('On Hold', 'Hold Payout', 'Payout placed on hold.', 'warning')}>
                <Pause size={20} />
                <span>Hold Payout</span>
              </button>
              <button className="action-card-btn btn-release" onClick={() => handleAction('Paid Out', 'Release Payout', 'Releasing funds to professional...', 'success')}>
                <Play size={20} />
                <span>Release Payout</span>
              </button>
              <button className="action-card-btn btn-stop" onClick={() => handleAction('In Escrow', 'Stop Refund', 'Refund process halted.', 'warning')}>
                <Ban size={20} />
                <span>Stop Refund</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={pendingAction || (() => {})}
        title={modalTitle}
        description={modalDescription}
        confirmText="Confirm"
        type={modalType}
      />
      <div style={{height: 60}}></div>
    </div>
  );
};

export default BookingDetail;
