import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'styled-components';

const Notifications: React.FC = () => {
  const theme = useTheme();
  const themeMode = theme.isLightMode ? 'light' : 'dark';

  return <ToastContainer autoClose={3000} theme={themeMode} pauseOnFocusLoss={false} />;
};

export default Notifications;
