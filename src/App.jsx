import { ToastContainer } from 'react-toastify';
import './App.css';
import { AuthContext, AuthProvider } from "./contexts/authContext";
import { Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom'; // Cambiar useNavigation por useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from './Modules/shared/components/header/Header';
import { useContext, useEffect } from 'react';
import navigationService from './Modules/shared/services/navigationService';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigationService.setNavigate(navigate);
  }, [navigate]);

  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Header />}
      <ToastContainer />
      <Container className="mx-0 p-0 content">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
