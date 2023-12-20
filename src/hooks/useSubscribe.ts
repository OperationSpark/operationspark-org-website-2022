import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type UseSubscribeReturn = [(email: string) => void, boolean, (status: boolean) => void];
const useSubscribe = (callback: () => void): UseSubscribeReturn => {
  const [isErr, setIsErr] = useState(false);

  type ToastOptions = {
    title?: string;
    description?: string;
    status?: 'success' | 'error' | 'info' | 'warning';
    duration?: number;
    email?: string;
  };
  const handleToast = (options: ToastOptions) => {
    const {
      title = 'An error occurred',
      description = `Please check email "${options.email || ''}" and try again`,
      status = 'error',
    } = options;
    toast[status]?.(
      `
      ${title}
      ${description}
    `,
      { position: 'bottom-center' },
    );
  };

  const subscribe = async (email: string) => {
    try {
      const { data } = await axios.post<ToastOptions>('/api/subscribe', { email });
      callback();

      handleToast(data);
    } catch (err) {
      setIsErr(true);
      const errData = (err as AxiosError)?.response?.data;

      const title = errData?.title ?? 'An error occurred';
      const description = errData.description ?? `Please check email "${email}" and try again`;

      handleToast({ title, description, email });
    }
  };

  return [subscribe, isErr, setIsErr];
};

export default useSubscribe;
