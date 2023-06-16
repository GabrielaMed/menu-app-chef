import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { IToastType } from '../../utils/Interface/Toast';

interface IToastProps {
  showToast: boolean;
  setShowToast: (value: boolean) => void;
  toastMessageType: IToastType;
  toastMessage: string;
}

export function ToastMessage({
  setShowToast,
  showToast,
  toastMessageType,
  toastMessage,
}: IToastProps) {
  return (
    <ToastContainer
      className='p-3'
      position={'top-end'}
      style={{ zIndex: '5' }}
    >
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={6000}
        autohide
        bg={toastMessageType}
      >
        {/* <Toast.Header>
          <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
        </Toast.Header> */}
        <Toast.Body style={{ color: 'white' }}>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
