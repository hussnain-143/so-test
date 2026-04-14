import React from 'react';
import { CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  type?: 'success' | 'warning' | 'danger';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText,
  type = 'success'
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return <Trash2 size={32} />;
      case 'warning': return <AlertTriangle size={32} />;
      default: return <CheckCircle2 size={32} />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-icon-container">
          <div className={`modal-icon-circle ${type}`}>
            {getIcon()}
          </div>
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button 
            className={`btn ${type === 'danger' ? 'btn-outline-danger' : 'btn-primary'}`} 
            onClick={onConfirm}
            style={{ 
              background: type === 'danger' ? '#ef4444' : (type === 'warning' ? '#f59e0b' : 'var(--primary)'),
              color: 'white',
              border: 'none'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
