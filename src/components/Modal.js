import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-filters" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        {children}
        
      </div>
    </div>
  );
};

export default Modal;