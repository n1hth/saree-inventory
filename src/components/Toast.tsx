import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 'var(--spacing-xl)',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-text-main)',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
      zIndex: 1000,
      animation: 'slideUpFade 3.5s ease-in-out forwards',
      border: '1px solid var(--color-border)'
    }}>
      <CheckCircle size={20} color="var(--color-success)" />
      <span style={{ fontWeight: 500 }}>{message}</span>
    </div>
  );
}
