import toast from 'react-hot-toast';

/**
 * Show success toast notification
 */
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500'
    }
  });
};

/**
 * Show error toast notification
 */
export const showError = (message) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500'
    }
  });
};

/**
 * Show info toast notification
 */
export const showInfo = (message) => {
  toast(message, {
    icon: 'ℹ️',
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500'
    }
  });
};

/**
 * Show loading toast
 */
export const showLoading = (message = 'Loading...') => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6366f1',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500'
    }
  });
};

/**
 * Dismiss a specific toast
 */
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};
