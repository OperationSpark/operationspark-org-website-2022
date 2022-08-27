import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

type UseSubscribeReturn = [(email: string) => void, boolean, (status: boolean) => void];
const useSubscribe = (callback: () => void): UseSubscribeReturn => {
  const toast = useToast();
  const [isErr, setIsErr] = useState(false);
  interface HandleToastArgs extends UseToastOptions {
    email?: string;
  }

  const handleToast = (options: HandleToastArgs = {}) => {
    const {
      title = 'An error occurred',
      description = `Please check email "${options.email || ''}" and try again`,
      status = 'error',
      duration = 3000,
    } = options;
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
    });
  };

  const subscribe = async (email: string) => {
    try {
      const { data } = await axios.post('/api/subscribe', { email });
      callback();
      handleToast(data);
    } catch (err) {
      setIsErr(true);
      handleToast(axios.isAxiosError(err) ? err.response?.data || { email } : { email });
    }
  };

  return [subscribe, isErr, setIsErr];
};

export default useSubscribe;
