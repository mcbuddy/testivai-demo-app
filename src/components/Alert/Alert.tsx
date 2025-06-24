import React from 'react';
import './Alert.css';

export interface AlertProps {
  children: React.ReactNode;
  status: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ children, status }) => {
  const alertClass = `alert alert--${status}`;

  return (
    <div className={alertClass} role="alert">
      {children}
    </div>
  );
};

export default Alert;
