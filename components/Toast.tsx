// components/Toast.tsx
import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 bg-green-500 text-black px-4 py-2 rounded shadow-md transition-transform transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDuration: '300ms' }}
    >
      {message}
    </div>
  );
};

export default Toast;
