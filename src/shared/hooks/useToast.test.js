import { describe, it, vi, expect } from 'vitest';
import { toast } from 'react-toastify';
import { useToast } from './useToast';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

describe('useToast hook', () => {
  it('calls toast.success when type is success', () => {
    const { showToast } = useToast();
    showToast('success', 'Success message');

    expect(toast.success).toHaveBeenCalledWith(
      'Success message',
      expect.any(Object)
    );
  });

  it('calls toast.error when type is error', () => {
    const { showToast } = useToast();
    showToast('error', 'Error message');

    expect(toast.error).toHaveBeenCalledWith(
      'Error message',
      expect.any(Object)
    );
  });

  it('calls toast.info when type is info', () => {
    const { showToast } = useToast();
    showToast('info', 'Info message');

    expect(toast.info).toHaveBeenCalledWith('Info message', expect.any(Object));
  });

  it('calls toast.warning when type is warning', () => {
    const { showToast } = useToast();
    showToast('warning', 'Warning message');

    expect(toast.warning).toHaveBeenCalledWith(
      'Warning message',
      expect.any(Object)
    );
  });
});
