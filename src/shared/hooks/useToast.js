import { toast } from 'react-toastify';

const DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const useToast = () => {
  const showToast = (type, message, options = {}) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (toast[type]) {
      toast[type](message, opts);
    } else {
      toast(message, opts);
    }
  };

  return { showToast };
};
