import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const useNotifications = () => {
  const fire = (message: string, opt?: ToastOptions) =>
    toast(message, {
      ...opt,
      ...defaultOptions,
    });
  const firePromise = <T>(
    promise: Promise<T>,
    successMessage: string,
    opt?: ToastOptions
  ): Promise<T> =>
    toast.promise(
      promise,
      {
        pending: 'Cargando...',
        success: successMessage,
        error: {
          render: (error: any) =>
            error.data?.response?.data?.message ||
            error.message ||
            error.data?.message ||
            'Error desconocido',
        },
      },
      { ...opt, ...defaultOptions }
    );
  return { fire, firePromise };
};
